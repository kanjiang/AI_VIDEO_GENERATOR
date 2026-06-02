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

function formatImageLine(index, alias, aliasMeta) {
  const usage = normalizeGeneratedText(aliasMeta?.usage || aliasMeta?.fileName || alias);
  return `@image${index} (${alias}) — 参考${usage}。`;
}

function formatSound(dialogueOrSound) {
  const value = normalizeGeneratedText(dialogueOrSound);

  if (!value || value === "环境静音" || value === "室内静音") {
    return "以真实环境静音和极轻空间底噪压住画面，不额外加配乐或说明性音效。";
  }
  if (value.includes("对白") || value.includes("语音") || value.includes("系统机械音") || value.includes("回放")) {
    return `保留关键声音或对白：${value}。`;
  }
  return `声音设计以 ${value} 为主，不额外堆砌无关音效。`;
}

function buildShotPrompt(shot) {
  const visualAction = normalizeGeneratedText(shot.visualAction);
  const note = normalizeGeneratedText(shot.note);

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
  const header = [
    `完全自包含重度版：${group.totalDuration}，21:9，multi-shot，严格只允许 ${group.shots.length} 个镜头，禁止额外镜头、禁止字幕、禁止音乐。`,
    `段落任务：${group.goal}。`,
    "整体要求：超写实实拍、真实场景光、克制表演、镜头之间只保留必要叙事推进。",
  ].join("");

  const blocks = group.shots.map((shot, index) => {
    return [
      `【镜头${index + 1}】`,
      formatCameraLine(shot),
      `动作：${normalizeGeneratedText(shot.visualAction)}。`,
      `声音：${normalizeGeneratedText(shot.dialogueOrSound)}。`,
      `重点：${normalizeGeneratedText(shot.note)}。`,
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
  const visualAction = normalizeGeneratedText(shot.visualAction);
  const goal = normalizeGeneratedText(summaryRecord?.goal || "");
  const note = normalizeGeneratedText(summaryRecord?.note || shot.note);

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
  const summaryMap = parseGenerationList(fs.readFileSync(generationListPath, "utf8"));

  const actConfigs = [
    {
      slug: "act1",
      title: "第一幕",
      rangeLabel: "001-030 镜头",
      start: "001",
      end: "030",
      groups: [
        { start: "001", end: "005", label: "书房冷开场", goal: "先建立林深的正常人假象与未知来电打断。" },
        { start: "006", end: "010", label: "电话卷入与赶往307", goal: "把林深被突然卷入的外层姿态立住，并切向307。" },
        { start: "011", end: "015", label: "307停摆空间与死者语音", goal: "建立307生活中断感，并让周妍听见林晚留下的第一层线索。" },
        { start: "016", end: "020", label: "权限人物到齐", goal: "通过手机壳导线、音箱待机和人物入场，把权限关系压实。" },
        { start: "021", end: "025", label: "音箱输入与口令加载", goal: "把林深继续伪装协助者、走向音箱并输入口令的链条连起来。" },
        { start: "026", end: "030", label: "门外压迫与29楼转场", goal: "在外部压迫下完成音箱解锁，并把行动目标推向29楼设备间。" },
      ],
    },
    {
      slug: "act2",
      title: "第二幕",
      rangeLabel: "031-052 镜头",
      start: "031",
      end: "052",
      groups: [
        { start: "031", end: "035", label: "离开307与电梯上行", goal: "从307切入纵向移动，并明确路径已经改为电梯。" },
        { start: "036", end: "040", label: "十五层停顿", goal: "把电梯卡层与门外威胁做成一次密闭惊吓。" },
        { start: "041", end: "044", label: "29楼入口与设备间建立", goal: "先交代29楼走廊，再把设备间作为声音工厂核心中枢立起来。" },
        { start: "045", end: "048", label: "非法采样与墙内求救", goal: "让周妍先完成取证，再被伪造求救声强行拖向露台。" },
        { start: "049", end: "052", label: "追向露台诱饵", goal: "把设备间和露台动线打通，并由白色手机完成最终牵引。" },
      ],
    },
    {
      slug: "act3",
      title: "第三幕",
      rangeLabel: "053-072 镜头",
      start: "053",
      end: "072",
      groups: [
        { start: "053", end: "056", label: "露台定场与退路锁死", goal: "把高空露台的危险结构立住，并保持林深表面的伪保护。" },
        { start: "057", end: "060", label: "越线与翻坠", goal: "让周妍主动越线，随后完成带救人假象的瞬间翻坠。" },
        { start: "061", end: "064", label: "好人脸褪净", goal: "在坠落与松手之间完成黑化揭底，并把画面推入闪回通道。" },
        { start: "065", end: "068", label: "利益与陷阱闭环", goal: "用闪回补齐商业动机、林晚处境和物理布局。" },
        { start: "069", end: "072", label: "假面拆穿与录音笔收尾", goal: "把全程表演重看一遍，并让录音笔留下最后的物证窗口。" },
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
