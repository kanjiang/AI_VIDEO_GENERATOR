export type ShotAssetMount = {
  alias: string;
  description: string;
};

export type ParsedShot = {
  id: string;
  title: string;
  timecode: string;
  assetMounts: ShotAssetMount[];
  sections: Record<string, string>;
  fullPromptText: string;
};

export type GlobalSection = {
  title: string;
  body: string;
};

export type ParsedVideoPrompts = {
  fileTitle: string;
  usageNote: string;
  globalAssets: ShotAssetMount[];
  globalStyle: string;
  globalPreamble: string;
  globalSections: GlobalSection[];
  shots: ParsedShot[];
};

const SHOT_HEADER_RE =
  /^#{1,2}\s+(?:Prompt|Shot|P|分镜|镜头)\s*[-_]?\s*(\d+[A-Za-z]?)\s*(?:[—–\-:：｜|]\s*(.+?))?$/i;

const TIMECODE_RE = /\((\d+:\d{2}[–\-]\d+:\d{2})\)/;

const ASSET_MOUNT_RE = /^@(.+?)=(.+?)(?:\s+[—–\-]\s+(.+))?$/;

const INLINE_MOUNT_RE = /`@(\w+)=(.+?)`/g;

const SECTION_HEADER_RE = /^【(.+?)】/;

function extractTimecode(line: string): string {
  const m = TIMECODE_RE.exec(line);
  return m ? m[1] : "";
}

function parseAssetMount(line: string): ShotAssetMount | null {
  const m = ASSET_MOUNT_RE.exec(line.trim());
  if (!m) return null;
  return {
    alias: m[1].trim(),
    description: m[3]?.trim() ?? "",
  };
}

export function parseVideoPrompts(markdown: string): ParsedVideoPrompts {
  const lines = markdown.split(/\r?\n/);

  let fileTitle = "";
  let usageNote = "";
  const globalAssets: ShotAssetMount[] = [];
  let globalStyle = "";
  const shots: ParsedShot[] = [];

  let currentShot: ParsedShot | null = null;
  let currentSection = "";
  let currentSectionLines: string[] = [];
  let inGlobalStyle = false;
  let globalStyleLines: string[] = [];
  let globalStyleStartedContent = false;
  let inCodeFence = false;
  let shotBodyLines: string[] = [];
  let headersParsed = false;
  let usageNoteLines: string[] = [];
  let inUsageNote = false;
  const preambleLines: string[] = [];
  let preambleStarted = false;

  function flushSection() {
    if (currentShot && currentSection) {
      currentShot.sections[currentSection] = currentSectionLines.join("\n").trim();
    }
    currentSection = "";
    currentSectionLines = [];
  }

  function flushShot() {
    flushSection();
    if (currentShot) {
      currentShot.fullPromptText = shotBodyLines.join("\n").trim();
      shots.push(currentShot);
    }
    currentShot = null;
    shotBodyLines = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```") && !fileTitle) {
      inCodeFence = !inCodeFence;
      if (inGlobalStyle) {
        if (!inCodeFence) {
          globalStyle = globalStyleLines.join("\n").trim();
          inGlobalStyle = false;
        }
        continue;
      }
      if (currentShot) shotBodyLines.push(line);
      continue;
    }

    if (inCodeFence && inGlobalStyle) {
      if (trimmed.startsWith("```")) {
        inCodeFence = false;
        globalStyle = globalStyleLines.join("\n").trim();
        inGlobalStyle = false;
      } else {
        globalStyleLines.push(line);
      }
      continue;
    }

    if (!fileTitle && /^#\s+/.test(trimmed)) {
      fileTitle = trimmed.replace(/^#\s+/, "").trim();
      preambleStarted = true;
      continue;
    }

    if (fileTitle && !headersParsed) {
      if (/^#{1,2}\s+使用说明/.test(trimmed)) {
        inUsageNote = true;
        continue;
      }

      if (inUsageNote) {
        if (/^#{1,2}\s+/.test(trimmed) || trimmed === "---") {
          inUsageNote = false;
          usageNote = usageNoteLines.join("\n").trim();
        } else {
          usageNoteLines.push(line);
          continue;
        }
      }

      if (/^#{1,2}\s+全局风格/.test(trimmed)) {
        inGlobalStyle = true;
        globalStyleLines = [];
        const nextLine = lines[i + 1]?.trim();
        if (nextLine === "```") {
          inCodeFence = true;
          i++;
        }
        continue;
      }

      if (inGlobalStyle && !inCodeFence) {
        if (trimmed.startsWith("```")) {
          inCodeFence = true;
          continue;
        }
        if (trimmed === "" && !globalStyleStartedContent) {
          continue;
        }
        if ((trimmed === "" || trimmed === "---") && globalStyleStartedContent) {
          globalStyle = globalStyleLines.join("\n").trim();
          inGlobalStyle = false;
        } else if (trimmed !== "") {
          globalStyleStartedContent = true;
          globalStyleLines.push(line);
        }
        continue;
      }

      const globalAsset = parseAssetMount(trimmed);
      if (globalAsset && !currentShot) {
        globalAssets.push(globalAsset);
        continue;
      }

      if (/^全局风格[：:]/.test(trimmed) || /^全局风格$/.test(trimmed)) {
        inGlobalStyle = true;
        globalStyleLines = [];
        continue;
      }
    }

    if (preambleStarted && !headersParsed && !inUsageNote) {
      preambleLines.push(line);
    }

    const shotMatch = SHOT_HEADER_RE.exec(trimmed);
    if (shotMatch) {
      headersParsed = true;
      if (inGlobalStyle) {
        globalStyle = globalStyleLines.join("\n").trim();
        inGlobalStyle = false;
      }
      flushShot();

      const rawTitle = shotMatch[2]?.trim() ?? "";
      const timecode = extractTimecode(rawTitle);
      const title = rawTitle.replace(TIMECODE_RE, "").trim();

      currentShot = {
        id: shotMatch[1],
        title,
        timecode,
        assetMounts: [],
        sections: {},
        fullPromptText: "",
      };
      shotBodyLines.push(line);
      continue;
    }

    if (currentShot) {
      shotBodyLines.push(line);

      const assetMount = parseAssetMount(trimmed);
      if (assetMount) {
        currentShot.assetMounts.push(assetMount);
        continue;
      }

      let inlineMatch;
      INLINE_MOUNT_RE.lastIndex = 0;
      while ((inlineMatch = INLINE_MOUNT_RE.exec(trimmed)) !== null) {
        const alias = inlineMatch[1].trim();
        const fileName = inlineMatch[2].trim().replace(/\.png$/i, "");
        if (!currentShot.assetMounts.some((m) => m.alias === alias)) {
          currentShot.assetMounts.push({ alias, description: fileName });
        }
      }

      const sectionMatch = SECTION_HEADER_RE.exec(trimmed);
      if (sectionMatch) {
        flushSection();
        currentSection = sectionMatch[1];
        const rest = trimmed.slice(sectionMatch[0].length).trim();
        if (rest) currentSectionLines.push(rest);
        continue;
      }

      if (currentSection) {
        currentSectionLines.push(line);
      }
    }
  }

  if (inGlobalStyle) {
    globalStyle = globalStyleLines.join("\n").trim();
  }
  flushShot();

  if (!usageNote) {
    usageNote = usageNoteLines.join("\n").trim();
  }

  const globalPreamble = preambleLines.join("\n").trim();
  const globalSections = splitPreambleIntoSections(globalPreamble);
  return { fileTitle, usageNote, globalAssets, globalStyle, globalPreamble, globalSections, shots };
}

function splitPreambleIntoSections(preamble: string): GlobalSection[] {
  if (!preamble) return [];
  const lines = preamble.split("\n");
  const sections: GlobalSection[] = [];
  let currentTitle = "";
  let currentLines: string[] = [];

  for (const line of lines) {
    const headerMatch = /^#{1,3}\s+(.+)/.exec(line.trim());
    if (headerMatch) {
      if (currentTitle || currentLines.length > 0) {
        const body = currentLines.join("\n").trim();
        if (body) {
          sections.push({ title: currentTitle || "前言", body });
        }
      }
      currentTitle = headerMatch[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentTitle || currentLines.length > 0) {
    const body = currentLines.join("\n").trim();
    if (body) {
      sections.push({ title: currentTitle || "前言", body });
    }
  }

  return sections;
}
