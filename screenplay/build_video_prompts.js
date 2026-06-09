const fs = require("fs");
const path = require("path");

const PROJECT_SLUG = "zhengci-zhiwai";

function sanitizeCell(cell) {
  return String(cell ?? "").replace(/`/g, "").replace(/\*\*/g, "").trim();
}

function isTableLine(line) {
  const value = String(line ?? "").trim();
  return value.startsWith("|") && value.endsWith("|");
}

function isDividerRow(line) {
  return /^\|(?:\s*:?[-]{3,}:?\s*\|)+$/.test(String(line ?? "").trim());
}

function splitRow(line) {
  return String(line ?? "")
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => sanitizeCell(cell));
}

function parseMarkdownTables(content) {
  const lines = String(content ?? "").split(/\r?\n/);
  const tables = [];

  for (let index = 0; index < lines.length; index += 1) {
    const current = lines[index] ?? "";
    const next = lines[index + 1] ?? "";

    if (!isTableLine(current) || !isDividerRow(next)) {
      continue;
    }

    const headers = splitRow(current);
    const rows = [];
    let cursor = index + 2;

    while (cursor < lines.length && isTableLine(lines[cursor] ?? "")) {
      rows.push(splitRow(lines[cursor] ?? ""));
      cursor += 1;
    }

    tables.push({ headers, rows });
    index = cursor - 1;
  }

  return tables;
}

function normalizeShotNo(value) {
  return String(value ?? "").trim().padStart(3, "0");
}

function findTable(tables, expectedHeaders) {
  return tables.find((table) => expectedHeaders.every((header, index) => table.headers[index] === header));
}

function extractAliases(text) {
  return [...String(text ?? "").matchAll(/\(([^)]+)\)/g)].map((match) => sanitizeCell(match[1] ?? ""));
}

function parseShotList(content) {
  const tables = parseMarkdownTables(content);
  const table = findTable(tables, ["镜号", "场次", "景别", "机位/运动", "画面内容", "台词/声音", "时长", "备注"]);

  if (!table) {
    throw new Error("无法识别 shot list 表格");
  }

  return table.rows.map((row) => ({
    shotNo: normalizeShotNo(row[0]),
    sceneNo: sanitizeCell(row[1]),
    framing: sanitizeCell(row[2]),
    cameraMove: sanitizeCell(row[3]),
    visualAction: sanitizeCell(row[4]),
    dialogueOrSound: sanitizeCell(row[5]),
    duration: sanitizeCell(row[6]),
    note: sanitizeCell(row[7]),
  }));
}

function parseReferenceMap(content) {
  const tables = parseMarkdownTables(content);
  const aliasTable = findTable(tables, ["Alias", "文件", "用途"]);
  const bindingTable = findTable(tables, ["Shot", "推荐写入的 @image"]);

  if (!aliasTable || !bindingTable) {
    throw new Error("无法识别 reference map 表格");
  }

  const aliases = new Map();
  aliasTable.rows.forEach((row) => {
    const alias = sanitizeCell(row[0]);
    if (!alias) {
      return;
    }
    aliases.set(alias, {
      alias,
      fileName: sanitizeCell(row[1]),
      usage: sanitizeCell(row[2]),
    });
  });

  const bindings = new Map();
  bindingTable.rows.forEach((row) => {
    bindings.set(normalizeShotNo(row[0]), extractAliases(row[1]));
  });

  return { aliases, bindings };
}

function parseGenerationList(content) {
  const tables = parseMarkdownTables(content);
  const table = findTable(tables, ["序号", "Shot", "时长", "场次", "镜头摘要", "生成目标", "参考资产", "备注"]);

  if (!table) {
    throw new Error("无法识别 generation list 表格");
  }

  const summaries = new Map();
  table.rows.forEach((row) => {
    summaries.set(normalizeShotNo(row[1]), {
      summary: sanitizeCell(row[4]),
      goal: sanitizeCell(row[5]),
      note: sanitizeCell(row[7]),
    });
  });

  return summaries;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeGeneratedText(text) {
  return String(text ?? "")
    .replaceAll("不再走消防楼梯", "路径固定为电梯")
    .replaceAll("消防楼梯", "电梯路径")
    .replaceAll("不再具象化“陈伯”", "终场身份保持匿名")
    .replaceAll("“陈伯”", "匿名执行者")
    .replaceAll("陈伯", "匿名执行者")
    .replaceAll("不再是监控绑椅终幕", "改为林晚被软禁的现实终幕")
    .replaceAll("绑椅", "软禁");
}

function stripSentenceEnding(text) {
  return normalizeGeneratedText(text).replace(/[。！？.!?]+$/u, "").trim();
}

function formatSentence(text) {
  const value = normalizeGeneratedText(text).trim();

  if (!value) {
    return "";
  }

  const trailing = value.match(/[。！？.!?]+$/u)?.[0] ?? "";
  const base = stripSentenceEnding(value);

  if (!trailing) {
    return `${base}。`;
  }
  if (trailing.includes("？") || trailing.includes("?")) {
    return `${base}？`;
  }
  if (trailing.includes("！") || trailing.includes("!")) {
    return `${base}！`;
  }
  return `${base}。`;
}

function formatImageLine(index, alias, aliasMeta) {
  const usage = normalizeGeneratedText(aliasMeta?.usage || aliasMeta?.fileName || alias);
  return `@image${index} (${alias}) — 参考${usage}。`;
}

function formatSound(dialogueOrSound) {
  const value = normalizeGeneratedText(dialogueOrSound);
  const cleanValue = stripSentenceEnding(dialogueOrSound);

  if (!value || value === "环境静音" || value === "室内静音") {
    return "以真实环境静音和极轻空间底噪压住画面，不额外加配乐或说明性音效。";
  }
  if (value.includes("对白") || value.includes("语音") || value.includes("系统机械音") || value.includes("回放")) {
    return `保留关键声音或对白：${formatSentence(dialogueOrSound)}`;
  }
  return `声音设计以 ${cleanValue} 为主，不额外堆砌无关音效。`;
}

function buildShotPrompt(shot) {
  const visualAction = stripSentenceEnding(shot.visualAction);
  const note = stripSentenceEnding(shot.note);

  return [
    `完全自包含重度版：21:9，约${shot.duration}，单镜头 one-shot，无剪辑。`,
    `摄影机按 ${shot.cameraMove} 执行，景别为${shot.framing}。`,
    `画面内容：${visualAction}。`,
    formatSound(shot.dialogueOrSound),
    `执行重点：${note}。整体维持超写实实拍质感、真实场景光和克制表演。`,
  ].join("");
}

function buildShotSection(shot, aliases, aliasMap) {
  const imageLines = aliases.map((alias, index) => formatImageLine(index + 1, alias, aliasMap.get(alias)));
  return [
    `## ${shot.shotNo} ${normalizeGeneratedText(shot.visualAction)}`,
    "",
    ...imageLines,
    "",
    buildShotPrompt(shot),
    "",
  ].join("\n");
}

function formatCameraLine(shot) {
  return `机位：${shot.framing}，${shot.cameraMove}。持续约${shot.duration}。`;
}

function buildMultiShotPrompt(group) {
  const goal = formatSentence(group.goal);
  const header = [
    `完全自包含重度版：${group.totalDuration}，21:9，multi-shot，严格只允许 ${group.shots.length} 个镜头，禁止额外镜头、禁止字幕、禁止音乐。`,
    `段落任务：${goal}`,
    "整体要求：超写实实拍、真实场景光、克制表演、镜头之间只保留必要叙事推进。",
  ].join("");

  const blocks = group.shots.map((shot, index) => {
    return [
      `【镜头${index + 1}】`,
      formatCameraLine(shot),
      `动作：${formatSentence(shot.visualAction)}`,
      `声音：${formatSentence(shot.dialogueOrSound)}`,
      `重点：${formatSentence(shot.note)}`,
      "",
    ].join("\n");
  });

  return [header, "", ...blocks].join("\n").trim();
}

function buildMultiShotSection(index, group, aliasMap) {
  const aliases = unique(group.shots.flatMap((shot) => group.bindingMap.get(shot.shotNo) ?? []));
  const imageLines = aliases.map((alias, imageIndex) => formatImageLine(imageIndex + 1, alias, aliasMap.get(alias)));

  return [
    `## Prompt ${String(index + 1).padStart(2, "0")} [Multi-shot · ${group.label}]`,
    "",
    ...imageLines,
    "",
    buildMultiShotPrompt(group),
    "",
  ].join("\n");
}

function buildStoryboardPromptBody(shot, summaryRecord) {
  const visualAction = stripSentenceEnding(shot.visualAction);
  const goal = stripSentenceEnding(summaryRecord?.goal || "");
  const note = stripSentenceEnding(summaryRecord?.note || shot.note);

  if (goal) {
    return `${visualAction}。重点是${goal}，执行时${note}。`;
  }

  return `${visualAction}。执行时${note}。`;
}

function buildStoryboardPromptFile(shots, summaryMap) {
  const sections = shots.map((shot) => {
    const summaryRecord = summaryMap.get(shot.shotNo);
    const title = normalizeGeneratedText(summaryRecord?.summary || shot.visualAction);
    const body = buildStoryboardPromptBody(shot, summaryRecord);

    return [
      `## ${shot.shotNo} ${title}`,
      body,
      "",
    ].join("\n");
  });

  return [
    "# 《证词之外》Storyboard Prompt 源（自动生成）",
    "",
    "说明：本文件由 screenplay/build_video_prompts.js 基于当前 shot list 与 generation list 自动生成，供 storyboard 页面与 JSON 清单读取。",
    "",
    ...sections,
  ].join("\n");
}

function buildShotByShotFile(actConfig, shots, bindingMap, aliasMap) {
  const sections = shots.map((shot) => buildShotSection(shot, bindingMap.get(shot.shotNo) ?? [], aliasMap));
  return [
    `# 《证词之外》${actConfig.title}逐镜视频提示词`,
    "",
    `范围：${actConfig.rangeLabel}`,
    "",
    `说明：本文件按当前 shot list 与 Seedance reference map 自动生成，逐镜覆盖 ${actConfig.rangeLabel}。复制到视频模型时，连同 @image 行一起使用；若后续剧本再变更，请重跑 screenplay/build_video_prompts.js。`,
    "",
    ...sections,
  ].join("\n");
}

function buildMultiShotFile(actConfig, shots, bindingMap, aliasMap) {
  const groups = actConfig.groups.map((group) => {
    const groupShots = shots.filter((shot) => shot.shotNo >= group.start && shot.shotNo <= group.end);
    const totalSeconds = groupShots.reduce((sum, shot) => sum + Number.parseInt(shot.duration, 10), 0);
    return {
      ...group,
      bindingMap,
      shots: groupShots,
      totalDuration: `${totalSeconds}秒`,
    };
  });

  const sections = groups.map((group, index) => buildMultiShotSection(index, group, aliasMap));

  return [
    `# 《证词之外》${actConfig.title}视频提示词`,
    "",
    `范围：${actConfig.rangeLabel}`,
    "",
    `说明：本文件是 ${actConfig.title} 的段落压缩版，按当前 shot list 聚合成 ${groups.length} 条 multi-shot prompts，用于 Seedance 快速测试整段节奏。单镜执行仍以逐镜版为准。`,
    "",
    ...sections,
  ].join("\n");
}

function writeFile(targetPath, content) {
  fs.writeFileSync(targetPath, `${content.trim()}\n`, "utf8");
}

function main() {
  const screenplayDir = __dirname;
  const shotListPath = path.join(screenplayDir, `${PROJECT_SLUG}-shot-list.md`);
  const referenceMapPath = path.join(screenplayDir, `${PROJECT_SLUG}-seedance-reference-map.md`);
  const generationListPath = path.join(screenplayDir, `${PROJECT_SLUG}-final-generation-list.md`);

  const shots = parseShotList(fs.readFileSync(shotListPath, "utf8"));
  const { aliases, bindings } = parseReferenceMap(fs.readFileSync(referenceMapPath, "utf8"));
  let summaryMap = parseGenerationList(fs.readFileSync(generationListPath, "utf8"));

  // Ignore stale generation-list summaries when the canonical shot count changes.
  if (summaryMap.size !== shots.length) {
    summaryMap = new Map();
  }

  const actConfigs = [
    {
      slug: "act1",
      title: "第一幕",
      rangeLabel: "001-014 镜头",
      start: "001",
      end: "014",
      groups: [
        { start: "001", end: "005", label: "书房来电与雨夜入局", goal: "先立住林深的普通人外壳，再把他压进307设局现场。" },
        { start: "006", end: "010", label: "307初见与监听前史", goal: "完成周妍和林深的陌生对接，并用闪回压实监听黑产前情。" },
        { start: "011", end: "014", label: "音箱权限与29楼转场", goal: "让权限机制、门外压迫和29楼线索在一段内连续成立。" },
      ],
    },
    {
      slug: "act2",
      title: "第二幕",
      rangeLabel: "015-024 镜头",
      start: "015",
      end: "024",
      groups: [
        { start: "015", end: "018", label: "电梯停层与29楼入口", goal: "把离开307、电梯卡层和29楼异常空间做成一次连续升级。" },
        { start: "019", end: "021", label: "设备间真相与伪求救", goal: "先让黑产证据落地，再被墙内求救声强行改写目标。" },
        { start: "022", end: "024", label: "露台诱饵与翻坠", goal: "用白色手机、危险地形和护栏崩裂把周妍逼到露台外。" },
      ],
    },
    {
      slug: "act3",
      title: "第三幕",
      rangeLabel: "025-032 镜头",
      start: "025",
      end: "032",
      groups: [
        { start: "025", end: "028", label: "高空摊牌与松手", goal: "在悬空状态里完成反派揭面、AI骗局回收和松手宣判。" },
        { start: "029", end: "030", label: "闪回回收布局", goal: "用闪回补齐商业动机、林晚处境和预谋布局。" },
        { start: "031", end: "032", label: "录音笔与匿名收尾", goal: "把全程假面重看一遍，并用录音笔和黑鞋留下最后证据窗口。" },
      ],
    },
  ];

  actConfigs.forEach((actConfig) => {
    const actShots = shots.filter((shot) => shot.shotNo >= actConfig.start && shot.shotNo <= actConfig.end);
    const shotByShotPath = path.join(screenplayDir, `${PROJECT_SLUG}-${actConfig.slug}-video-prompts-shot-by-shot.md`);
    const multiShotPath = path.join(screenplayDir, `${PROJECT_SLUG}-${actConfig.slug}-video-prompts.md`);

    writeFile(shotByShotPath, buildShotByShotFile(actConfig, actShots, bindings, aliases));
    writeFile(multiShotPath, buildMultiShotFile(actConfig, actShots, bindings, aliases));
  });

  writeFile(path.join(screenplayDir, `${PROJECT_SLUG}-storyboard-prompts.md`), buildStoryboardPromptFile(shots, summaryMap));

  console.log("Video prompt markdown files and storyboard prompt source regenerated from canonical sources.");
}

main();
