const fs = require("fs");
const path = require("path");

const PROJECT_SLUG = "zhengci-zhiwai";
let VOICE_BIBLE_REFERENCE_LINE = "";

const FIXED_CHARACTER_VOICE_RULE = "【固定角色声音总规则】全片必须为每个角色锁定唯一基础声纹，后续所有镜头沿用同一角色声音，不逐镜重新抽样、不更换年龄感、性别感、口音或基础音色。情绪、距离、电话听筒、耳机泄漏、手机外放、隔门、风雨或设备压缩只能改变音量、气息、混响、底噪、动态范围和清晰度，不能改变角色本人的声纹。林深固定为低沉、克制、少气口、尾音短收的男声；周妍固定为压低、警觉、偏锐利、尾音不上扬的女声；林晚固定为年轻女声，柔软但紧绷，残缺语音、手机留言、伪造求救或回放都必须保留同一声纹底色；保安A/保安B各自固定为隔门发闷、带走廊混响的中年男声，不互相混淆；智能音箱与系统机械音固定为中性电子合成声，平调、无情绪、非真人嗓音。旁白、画外音、听筒音、外放音与近场对白必须按同一角色声纹连续，只改变声源方向和空间质感，禁止把同一角色在不同镜头里生成成陌生声音。";

const VOICE_REFERENCE_AUDIO_LINE = "【参考声音MP3挂载规则】若已提供 `assets/zhengci-zhiwai/voice-references/` 下的角色参考 MP3，视频生成时必须以对应 MP3 作为该角色最高优先级声纹参考：LinShen.mp3 或 林深.mp3=林深，ZhouYan.mp3 或 周妍.mp3=周妍，LinWan.mp3 或 林晚.mp3=林晚，SecurityGuardA.mp3 或 保安A.mp3=保安A，SecurityGuardB.mp3 或 保安B.mp3=保安B，SmartSpeakerSystem.mp3 或 智能音箱系统音.mp3=智能音箱/系统机械音。文字提示只控制情绪、距离、设备压缩和空间混响，不得覆盖 MP3 的基础声纹。";

function resolveProjectDirectory(screenplayRoot, projectSlug) {
  const directMatch = [
    `${projectSlug}-shot-list.md`,
    `${projectSlug}-screenplay.md`,
    `${projectSlug}-storyboard.config.json`,
  ].some((fileName) => fs.existsSync(path.join(screenplayRoot, fileName)));

  if (directMatch) {
    return screenplayRoot;
  }

  const candidates = fs
    .readdirSync(screenplayRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(screenplayRoot, entry.name));

  return (
    candidates.find((candidateDir) =>
      fs.readdirSync(candidateDir).some((fileName) => fileName.startsWith(`${projectSlug}-`)),
    ) ?? screenplayRoot
  );
}

function toWorkspaceRelativePath(filePath) {
  return path.relative(path.dirname(__dirname), filePath).replace(/\\/g, "/");
}

function buildVoiceBibleReferenceLine(screenplayDir) {
  const voiceBiblePath = path.join(screenplayDir, `${PROJECT_SLUG}-character-voice-bible.md`);
  return `详细角色声线档案见 \`${toWorkspaceRelativePath(voiceBiblePath)}\`；复制单镜或段落提示词时，必须同时遵守本文件顶部总规则与声线档案。`;
}

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

function containsAny(text, keywords) {
  const value = normalizeGeneratedText(text);
  return keywords.some((keyword) => value.includes(keyword));
}

function countDialogueSegments(dialogueOrSound) {
  return stripSentenceEnding(dialogueOrSound)
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean).length;
}

function isDialogueDriven(shot) {
  const dialogue = normalizeGeneratedText(shot.dialogueOrSound);
  return dialogue.includes("：") || dialogue.includes("旁白") || countDialogueSegments(dialogue) >= 2;
}

function isActionDriven(shot) {
  return containsAny(`${shot.visualAction} ${shot.note}`, [
    "冲",
    "扑",
    "追逐",
    "追兵",
    "抓",
    "拽",
    "坠",
    "翻",
    "逼近",
    "崩裂",
    "悬",
    "松开",
    "推门",
    "闯",
    "快步",
    "急着",
  ]);
}

function isTransitionShot(shot) {
  return containsAny(`${shot.visualAction} ${shot.note}`, [
    "离开",
    "进入",
    "入内",
    "推门",
    "冲进",
    "抵达",
    "转场",
    "走",
    "门口",
    "电梯",
    "露台",
    "设备间",
  ]);
}

function isRevealShot(shot) {
  return containsAny(`${shot.visualAction} ${shot.note}`, ["发现", "亮起", "复述", "入画", "揭", "显", "真相", "线索"]);
}

function isFlashbackShot(shot) {
  return containsAny(`${shot.visualAction} ${shot.note} ${shot.dialogueOrSound}`, ["闪回", "回到现实", "旁白"]);
}

function buildCameraIntent(shot) {
  const move = normalizeGeneratedText(shot.cameraMove);
  const directions = [];

  if (move.includes("固定")) {
    directions.push("固定机位时让压迫来自人物调度、光线变化和画内节奏，不靠无意义甩镜。");
  }
  if (move.includes("推")) {
    directions.push(
      move.includes("快")
        ? "推进只在威胁或真相逼近时加速，推进终点必须落在当前戏眼。"
        : "推进保持克制，先稳住空间与人物，再把注意力缓慢压到戏眼。"
    );
  }
  if (move.includes("跟拍")) {
    directions.push("跟拍始终挂住领位人物，行进方向保持一致，避免来回找人。");
  }
  if (move.includes("俯拍")) {
    directions.push("俯拍先把地形、出口和危险点交代清楚，再压向关键入口或目标。");
  }
  if (move.includes("仰拍")) {
    directions.push("仰拍把权力关系建立在视角差上，不额外夸张透视和形变。");
  }
  if (move.includes("主观")) {
    directions.push("主观视角只提供角色此刻能看到的信息，画外事实不要提前泄露。");
  }
  if (move.includes("摇") || move.includes("横移")) {
    directions.push("摇移只服务于揭示同一空间内已经存在的目标，不做无因由扫视。");
  }

  if (!directions.length) {
    directions.push("镜头运动只服务当前冲突核心，目标明确，速度单一。");
  }

  directions.push("每段只保留一个主运镜意图，速度策略清楚，主体必须明确，禁止无主体漂移和无动机连续变速。");

  return `镜头意图：${unique(directions).join("")}`;
}

function buildPerformanceDirection(shot) {
  const text = `${shot.visualAction} ${shot.note} ${shot.dialogueOrSound}`;
  const directions = [];

  if (isDialogueDriven(shot)) {
    directions.push("对白以内收微表情、肩线变化和手部小动作承载情绪，避免喊台词式输出。");
  }
  if (containsAny(text, ["假镇定", "稳住", "克制"])) {
    directions.push("嘴角压住、呼吸变浅、手部动作尽量小，把真正压力留给眼神和停顿泄露。");
  }
  if (containsAny(text, ["不信任", "试探", "对峙"])) {
    directions.push("视线先检查门缝、出口或道具，再回到对方脸上，身体不要完全放松。");
  }
  if (containsAny(text, ["钩子", "关键字", "线索", "反转"])) {
    directions.push("前半段情绪压低，只在关键信息出现时给一次清晰视线停顿或下颌收紧。");
  }
  if (containsAny(text, ["高压", "倒计时", "逼近", "破门"])) {
    directions.push("呼吸变短，动作停顿更明显，目光在出口与风险源之间来回切换。");
  }
  if (containsAny(text, ["裂开", "骗局", "反派", "真相"])) {
    directions.push("去掉外显情绪，保留轻微嘴角回收、眼神变冷和稳定控制感。");
  }
  if (containsAny(text, ["悬", "坠", "翻", "抓住", "松开"])) {
    directions.push("危险动作先给求生意图和受力方向，让手腕、肩背和重心变化清楚可见，不拆机械步骤。");
  }

  if (!directions.length) {
    directions.push("表演保持克制真实，用一次清晰视线停顿或手部动作完成情绪落点。");
  }

  directions.push("按 Seedance 表演公式执行：嘴角状态、眼部状态、面部肌肉必须可见；手部动作、身体姿态、视线方向必须承载情绪。单镜最多一个主情绪和一个次级波动，强度保持轻微到中等。");

  return `表演控制：${unique(directions).join("")}`;
}

function buildSpatialDirection(shot) {
  const directions = [];

  if (isTransitionShot(shot)) {
    directions.push("前 2 到 3 秒先讲清入口、出口、人物相对位置和关键道具方位，再推进动作。");
  }
  if (isDialogueDriven(shot)) {
    directions.push("人物站位和视线轴线先稳定，再进入对白，不让角色无因跳位。");
  }
  if (isActionDriven(shot)) {
    directions.push("危险点、支撑点和落点都必须先被看见，动作只围绕镜内已出现的物件发生。");
  }
  if (isRevealShot(shot)) {
    directions.push("揭示信息按隐藏、看到、确认的顺序展开，不一次性把全部信息摊平。");
  }
  if (isFlashbackShot(shot)) {
    directions.push("闪回与现实的边界靠光线、动势或声音桥连接，不在同镜里混乱跳时空。");
  }

  if (!directions.length) {
    directions.push("先锁住人物、主光源和关键道具位置，整个镜头沿同一轴线完成信息递进。");
  }

  return `空间连续：${unique(directions).join("")}`;
}

function buildDialogueDirection(shot) {
  if (!isDialogueDriven(shot)) {
    return "";
  }

  const beatCount = countDialogueSegments(shot.dialogueOrSound);
  const rhythm = beatCount >= 4 ? "对白按压问、回应、停顿、反应四拍处理，把最后一句留作落点。" : "对白按发问、停顿、反应的顺序推进，让关键一句压住镜尾。";
  const delivery = "对白只放在声音层，口型和呼吸服务表演；中文停顿使用逗号、句号、省略号和破折号表达可演出的呼吸、迟疑、打断或硬停，不平均朗读。";
  return `对白节奏：${rhythm}${delivery}`;
}

function buildSeedanceGuardrail(shot) {
  const rules = [
    "同镜只稳定跟踪已入画的人物与关键道具，默认不超过三人",
    isDialogueDriven(shot) ? "对白停顿服从权力变化，不把每句台词平均念完" : "动作先给意图再给结果，不拆成机械关节运动",
    "不新增画外路人、无关监控视角、镜面反射、解释性字幕或品牌水印",
    "不做无因由光线跳变、空间重置、身份漂移和角色出画后同镜返场",
    "不使用抽象情绪词替代可见动作",
    "不做3D渲染感、游戏CG感、插画感或过度锐化科技广告感",
  ];

  return `Seedance 限制：${rules.join("；")}。`;
}

function buildReferenceLockLine() {
  return "参考图锁定：@image 只用于锁定角色身份、服装、空间结构、关键道具和界面状态；不得重新设计角色脸、发型、体态、场景布局或道具位置。";
}

function buildMountedResourceAudioLock(shot) {
  const rules = [
    "严格使用已挂载 @image 参考资源。",
    "角色、服装、空间、道具、界面状态只按参考图锁定，不重新设计。",
    "无字幕、无标题、无背景音乐，只保留环境音、动作声和真实语音混响。",
  ];

  if (isDialogueDriven(shot)) {
    rules.push("对白保持原文，不翻译、不改写。");
    rules.push("沿用对应角色参考 MP3 或声线档案，只生成当前情绪、距离、设备压缩和空间混响。");
  }

  return `【挂载资源与音频硬约束】${rules.join("")}`;
}

function buildShotStartFrameLine(shot) {
  const shotNo = normalizeShotNo(shot.shotNo);

  if (shotNo === "001") {
    return "【首帧衔接】本镜头是全片第一个视频，首帧从本镜头参考图建立，锁定主角、光源、空间方向和关键道具。";
  }

  const previousShotNo = normalizeShotNo(String(Number.parseInt(shotNo, 10) - 1));
  return `【首帧衔接】以上一视频（镜头 ${previousShotNo}）尾帧作为本视频首帧。第一帧必须延续上一尾帧的站位、视线轴、光源方向、焦点、构图、道具状态和环境明暗，再进入本镜动作。`;
}

function buildMultiShotStartFrameLine(group) {
  const startShotNo = normalizeShotNo(group.start);

  if (startShotNo === "001") {
    return "【首帧衔接】本段是全片第一个段落视频，从本段挂载参考图和当前场景设定建立首帧；段落内部每个镜头都必须承接前一个内部镜头尾帧。";
  }

  const previousShotNo = normalizeShotNo(String(Number.parseInt(startShotNo, 10) - 1));
  return `【首帧衔接】本段视频必须以上一个视频/上一段落的尾帧作为首帧，至少承接镜头 ${previousShotNo} 的尾帧状态。第一帧的角色站位、身体方向、视线轴线、主光源方向、焦点距离、构图比例、道具状态和环境明暗必须连续；段落内部每个镜头也必须以前一个内部镜头的尾帧作为下一镜头首帧，除非镜头文字明确要求闪回、硬切或蒙太奇。`;
}

function buildLightingDirection(shot) {
  const text = `${shot.visualAction} ${shot.note}`;
  const rules = [
    "光线与质感：只使用场景内真实光源，禁止画外补光、柔光箱、霓虹乱光和无来源高光。",
    "保持超写实实拍质感、浅景深、真实镜头呼吸和轻微胶片颗粒。",
  ];

  if (containsAny(text, ["书房", "电脑", "波形", "音频编辑", "隐藏编辑界面", "声纹编辑"])) {
    rules.push("书房与屏幕镜头以冷蓝屏幕光和少量台灯 practical light 为主，暗部包裹稳定，屏幕 UI 必须可信、可读、不过度赛博。");
  }
  if (containsAny(text, ["307 半搬空", "307 房间", "半搬空", "客厅", "音箱"])) {
    rules.push("307 空间以冷白门缝光、音箱指示灯和室内低照度为主，保持半搬空房间的停摆压迫感。");
  }
  if (containsAny(text, ["电梯", "15 层", "楼层"])) {
    rules.push("电梯镜头只使用轿厢顶灯、楼层面板和故障频闪，空间不能变成另一个电梯或走廊。");
  }
  if (containsAny(text, ["设备间", "机柜", "服务器", "采样文件", "声音工厂", "显示器", "亮屏", "工业软件"])) {
    rules.push("设备间以服务器指示灯、工业屏幕和门缝冷光为主，界面是工业软件感，不要霓虹赛博或普通办公文档。");
  }
    if (containsAny(text, ["露台", "护栏", "翻坠", "白色手机", "松开手指", "悬在楼外"])) {
    rules.push("露台只使用城市远景冷光、手机屏幕光和门内漏光，高空边缘、护栏连接点和退路必须清楚可读。");
  }

  return unique(rules).join("");
}

function buildAudioContinuityLine(shot) {
  if (!isDialogueDriven(shot)) {
    return "";
  }

  return "【音画同步】说话者离画时，声音继续按原节奏播放，不静音、不跳句；镜头切到合照、手机、道具、背影或另一人物反应时，保持同一空间混响和声源方向；切回说话者脸部时，口型、下颌、呼吸和当前音节必须同步。";
}

function buildQualityGateLine(shot) {
  const actionRule = isActionDriven(shot)
    ? "动作质量门槛：先明确受力点、支撑点、重心方向和落点，再发生危险动作；不要用模糊甩动掩盖空间关系。"
    : "镜头质量门槛：先明确主体、焦点、光源和运动方向，再推进信息；不要让背景随机变化或主体丢失。";
  return `${actionRule}最后 1 秒必须落在本镜头的叙事戏眼上。`;
}

function buildShotFormLine(shot) {
  const shotText = `${shot.cameraMove} ${shot.visualAction}`;

  if (containsAny(shotText, ["快切", "硬切", "蒙太奇", "闪回", "切回", "定格", "慢动作"])) {
    return `完全自包含重度版：21:9，约${shot.duration}，单条 prompt，镜内允许按当前描述完成明确的分段转场、快切、闪回或速度变化，但禁止扩展成额外镜头组。`;
  }

  return `完全自包含重度版：21:9，约${shot.duration}，单镜头 one-shot，无剪辑。`;
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

function buildCinematicShotDescription(shot) {
  const visualAction = stripSentenceEnding(shot.visualAction);
  const note = stripSentenceEnding(shot.note);
  const dialogueDirection = buildDialogueDirection(shot).replace(/^对白节奏：/, "");
  const lighting = buildLightingDirection(shot)
    .replace(/^光线与质感：/, "")
    .replaceAll("。保持超写实实拍质感、浅景深、真实镜头呼吸和轻微胶片颗粒。", "。");
  const cameraIntent = buildCameraIntent(shot).replace(/^镜头意图：/, "");
  const performance = buildPerformanceDirection(shot).replace(/^表演控制：/, "");
  const spatial = buildSpatialDirection(shot).replace(/^空间连续：/, "");
  const sound = formatSound(shot.dialogueOrSound)
    .replace(/^声音设计以 /, "声音以 ")
    .replace(/^保留关键声音或对白：/, "声音与对白：");
  const quality = buildQualityGateLine(shot)
    .replace(/^镜头质量门槛：/, "")
    .replace(/^动作质量门槛：/, "");

  return [
    `初始画面承接首帧衔接状态，摄影机按“${shot.cameraMove}”执行，景别为${shot.framing}。${cameraIntent}`,
    `画面核心是：${visualAction}。`,
    `${lighting}`,
    `${performance}`,
    `${spatial}`,
    dialogueDirection,
    `${sound}`,
    `${quality}`,
    `最后落点：${note}。`,
  ].filter(Boolean).join("");
}

function buildNegativeLine(shot) {
  const guardrail = buildSeedanceGuardrail(shot)
    .replace(/^Seedance 限制：/, "")
    .replace(/。$/u, "");
  return `【负面约束】${guardrail}；不要让硬约束覆盖本镜头的主要动作和情绪落点。`;
}

function buildShotPrompt(shot) {
  const audioContinuity = buildAudioContinuityLine(shot);

  return [
    buildMountedResourceAudioLock(shot),
    buildShotStartFrameLine(shot),
    `【规格】${buildShotFormLine(shot)}真人实拍电影质感，真实场景光，浅景深，轻微胶片颗粒。`,
    `【电影化动态描述】${buildCinematicShotDescription(shot)}`,
    audioContinuity,
    buildNegativeLine(shot),
  ].filter(Boolean).join("\n");
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
    `【挂载资源与音频硬约束】本视频必须严格使用已挂载的 @image 参考资源。角色外貌、服装、发型、体态、身份感、空间结构、关键道具和界面状态只参考挂载图，不重新设计、不重新描述静态设定。对白保持 shot list 原文语言与原句，不翻译、不改写。若说话者声音持续但镜头切到道具、空间、背影、合照或另一人物反应，声音必须继续不断线，保持同一空间混响、距离感和声源方向；重新切回说话者脸部时，口型、下颌开合、呼吸停顿和当前音节必须同步。无字幕、无文字标题、无解释性屏幕文字、无背景音乐，只保留环境音、动作音效和真实语音混响。`,
    FIXED_CHARACTER_VOICE_RULE,
    VOICE_REFERENCE_AUDIO_LINE,
    VOICE_BIBLE_REFERENCE_LINE,
    buildMultiShotStartFrameLine(group),
    `完全自包含重度版：${group.totalDuration}，21:9，multi-shot，严格只允许 ${group.shots.length} 个镜头，禁止额外镜头、禁止字幕、禁止音乐。`,
    buildReferenceLockLine(),
    `段落任务：${goal}`,
    "整体要求：超写实实拍、真实场景光、克制表演、镜头之间只保留必要叙事推进；只跟踪已入画人物与关键道具，保持空间和光线连续。每个镜头必须具备嘴角/眼部/面部肌肉、手部/姿态/视线、单一运镜意图、明确速度策略和负面约束。",
  ].join("");

  const blocks = group.shots.map((shot, index) => {
    return [
      `【镜头${index + 1}】`,
      `首帧承接上一内部镜头尾帧；${formatCameraLine(shot)}`,
      `电影化动态描述：${buildCinematicShotDescription(shot)}`,
      buildAudioContinuityLine(shot),
      buildNegativeLine(shot),
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
    FIXED_CHARACTER_VOICE_RULE,
    VOICE_REFERENCE_AUDIO_LINE,
    VOICE_BIBLE_REFERENCE_LINE,
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
    FIXED_CHARACTER_VOICE_RULE,
    VOICE_REFERENCE_AUDIO_LINE,
    VOICE_BIBLE_REFERENCE_LINE,
    "",
    ...sections,
  ].join("\n");
}

function writeFile(targetPath, content) {
  fs.writeFileSync(targetPath, `${content.trim()}\n`, "utf8");
}

function main() {
  const screenplayDir = resolveProjectDirectory(__dirname, PROJECT_SLUG);
  VOICE_BIBLE_REFERENCE_LINE = buildVoiceBibleReferenceLine(screenplayDir);
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
