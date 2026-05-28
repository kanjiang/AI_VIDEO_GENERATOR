const fs = require("fs");
const path = require("path");

const DEFAULT_SLUG = "zhengci-zhiwai";

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

    tables.push({ headers, rows, startLine: index + 1 });
    index = cursor - 1;
  }

  return tables;
}

function normalizeShotNo(value) {
  return String(value ?? "").trim().padStart(3, "0");
}

function extractAliases(text) {
  return [...String(text ?? "").matchAll(/\(([^)]+)\)/g)].map((match) => sanitizeCell(match[1] ?? ""));
}

function readFileIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}

function readJsonIfExists(filePath) {
  const content = readFileIfExists(filePath);
  if (!content) {
    return null;
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    const message = error instanceof Error ? error.message : "JSON 解析失败";
    throw new Error(`storyboard 配置文件解析失败: ${path.relative(process.cwd(), filePath)} (${message})`);
  }
}

function discoverPromptFiles(screenplayDir, projectSlug) {
  return fs
    .readdirSync(screenplayDir)
    .filter((fileName) => fileName.startsWith(`${projectSlug}-`) && fileName.endsWith("-video-prompts-shot-by-shot.md"))
    .sort((left, right) => left.localeCompare(right, "zh-CN"))
    .map((fileName) => path.join(screenplayDir, fileName));
}

function resolveScreenplayPath(screenplayDir, fileName, defaultFileName) {
  return path.join(screenplayDir, fileName || defaultFileName);
}

function loadProjectConfig(screenplayDir, projectSlug) {
  const configPath = path.join(screenplayDir, `${projectSlug}-storyboard.config.json`);
  const rawConfig = readJsonIfExists(configPath) ?? {};
  const promptFiles = Array.isArray(rawConfig.promptFiles) && rawConfig.promptFiles.length > 0 ? rawConfig.promptFiles : null;

  return {
    configPath: fs.existsSync(configPath) ? path.relative(process.cwd(), configPath) : null,
    shotListPath: resolveScreenplayPath(screenplayDir, rawConfig.shotListFile, `${projectSlug}-shot-list.md`),
    referenceMapPath: resolveScreenplayPath(screenplayDir, rawConfig.referenceMapFile, `${projectSlug}-seedance-reference-map.md`),
    generationListPath: resolveScreenplayPath(screenplayDir, rawConfig.generationListFile, `${projectSlug}-final-generation-list.md`),
    promptPaths: (promptFiles ?? discoverPromptFiles(screenplayDir, projectSlug)).map((fileName) =>
      path.isAbsolute(fileName) ? fileName : path.join(screenplayDir, fileName),
    ),
    fallbackAssets: rawConfig.fallbackAssets && typeof rawConfig.fallbackAssets === "object" ? rawConfig.fallbackAssets : {},
  };
}

function findTable(tables, expectedHeaders) {
  return tables.find((table) => expectedHeaders.every((header, index) => table.headers[index] === header));
}

function parseShotList(content) {
  const tables = parseMarkdownTables(content);
  const table = findTable(tables, ["镜号", "场次", "景别", "机位/运动", "画面内容", "台词/声音", "时长", "备注"]);

  if (!table) {
    throw new Error("shot list 表头无法识别");
  }

  return table.rows.map((row) => ({
    shotNo: normalizeShotNo(row[0]),
    sceneNo: sanitizeCell(row[1]),
    framing: sanitizeCell(row[2]),
    cameraMove: sanitizeCell(row[3]),
    visualAction: sanitizeCell(row[4]),
    dialogueOrSound: sanitizeCell(row[5]),
    duration: sanitizeCell(row[6]),
    notes: sanitizeCell(row[7]),
  }));
}

function parseReferenceMap(content) {
  const tables = parseMarkdownTables(content);
  const aliasTable = findTable(tables, ["Alias", "文件", "用途"]);
  const bindingTables = tables.filter(
    (table) => table.headers[0] === "Shot" && table.headers[1] === "推荐写入的 @image",
  );

  const assets = new Map();
  if (aliasTable) {
    aliasTable.rows.forEach((row) => {
      const alias = sanitizeCell(row[0]);
      if (!alias) {
        return;
      }
      assets.set(alias, {
        alias,
        fileName: sanitizeCell(row[1]),
        description: sanitizeCell(row[2]),
      });
    });
  }

  const bindings = new Map();
  bindingTables.forEach((table) => {
    table.rows.forEach((row) => {
      const shotNo = normalizeShotNo(row[0]);
      bindings.set(shotNo, extractAliases(row[1]));
    });
  });

  return { assets, bindings };
}

function buildAssetRegistry(aliasMap, fallbackAssets) {
  const registry = new Map(aliasMap);
  Object.entries(fallbackAssets).forEach(([alias, asset]) => {
    if (!registry.has(alias)) {
      registry.set(alias, asset);
    }
  });
  return registry;
}

function parsePromptSections(content, sourcePath) {
  const lines = String(content ?? "").split(/\r?\n/);
  const sections = new Map();
  let current = null;

  function flushCurrent() {
    if (!current) {
      return;
    }

    const bodyLines = current.lines.filter((line) => line.trim().length > 0);
    const imageLines = bodyLines.filter((line) => /^@image\d+/.test(line.trim()));
    const promptLines = bodyLines.filter((line) => !/^@image\d+/.test(line.trim()));

    sections.set(current.shotNo, {
      shotNo: current.shotNo,
      title: current.title,
      imageLines,
      aliases: imageLines.flatMap((line) => extractAliases(line)),
      promptText: promptLines.join("\n\n").trim(),
      sourcePath,
    });
  }

  lines.forEach((line) => {
    const match = line.match(/^##\s+(\d{3})\s+(.+)$/);
    if (match) {
      flushCurrent();
      current = {
        shotNo: normalizeShotNo(match[1]),
        title: sanitizeCell(match[2]),
        lines: [],
      };
      return;
    }

    if (current) {
      current.lines.push(line);
    }
  });

  flushCurrent();
  return sections;
}

function loadPromptMap(files) {
  const promptMap = new Map();

  files.forEach((filePath) => {
    const content = readFileIfExists(filePath);
    if (!content) {
      return;
    }

    const sections = parsePromptSections(content, path.relative(process.cwd(), filePath));
    sections.forEach((value, key) => {
      promptMap.set(key, value);
    });
  });

  return promptMap;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stageLabel(status) {
  if (status === "ready") return "已就绪";
  if (status === "partial") return "部分就绪";
  if (status === "unassigned") return "未绑定";
  return "待处理";
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function buildData(projectSlug) {
  const rootDir = process.cwd();
  const screenplayDir = path.join(rootDir, "screenplay");
  const projectConfig = loadProjectConfig(screenplayDir, projectSlug);
  const outputDir = path.join(rootDir, "outputs", "projects", projectSlug, "storyboard");
  const assetsDir = path.join(rootDir, "assets", projectSlug);

  const { shotListPath, referenceMapPath, generationListPath, promptPaths } = projectConfig;

  const shotListContent = readFileIfExists(shotListPath);
  if (!shotListContent) {
    throw new Error(`缺少核心文件: ${path.relative(rootDir, shotListPath)}`);
  }

  const referenceMapContent = readFileIfExists(referenceMapPath) ?? "";
  const generationListContent = readFileIfExists(generationListPath) ?? "";

  const shots = parseShotList(shotListContent);
  const { assets: aliasMap, bindings } = parseReferenceMap(referenceMapContent);
  const assetRegistry = buildAssetRegistry(aliasMap, projectConfig.fallbackAssets);
  const promptMap = loadPromptMap(promptPaths);

  const unresolvedAliases = new Set();
  const shotRecords = shots.map((shot) => {
    const bindingAliases = bindings.get(shot.shotNo) ?? [];
    const prompt = promptMap.get(shot.shotNo) ?? null;
    const promptAliases = prompt?.aliases ?? [];
    const aliases = unique([...bindingAliases, ...promptAliases]);

    const assetRefs = [];
    const seenAssets = new Map();

    aliases.forEach((alias) => {
      const asset = assetRegistry.get(alias);
      const canonicalAlias = asset?.canonicalAlias ?? alias;
      const fileName = asset?.fileName ?? "";
      const referenceOnly = !fileName || !/\.(png|jpg|jpeg|webp)$/i.test(fileName);
      const fileExists = fileName ? fs.existsSync(path.join(assetsDir, fileName)) : false;

      if (!asset) {
        unresolvedAliases.add(alias);
      }

      if (seenAssets.has(canonicalAlias)) {
        seenAssets.get(canonicalAlias).sourceAliases.push(alias);
        return;
      }

      const record = {
        alias: canonicalAlias,
        canonicalAlias,
        sourceAliases: [alias],
        fileName,
        description: asset?.description ?? "未在 reference map 别名表中定义",
        fileExists,
        referenceOnly,
        imageRelativePath: fileName ? path.posix.join("..", "..", "..", "..", "assets", projectSlug, fileName).replace(/\\/g, "/") : "",
      };

      seenAssets.set(canonicalAlias, record);
      assetRefs.push(record);
    });

    const visualAssets = assetRefs.filter((asset) => !asset.referenceOnly);
    const existingVisualAssets = visualAssets.filter((asset) => asset.fileExists);

    return {
      ...shot,
      promptTitle: prompt?.title ?? "",
      promptText: prompt?.promptText ?? "",
      promptSourcePath: prompt?.sourcePath ?? "",
      bindingAliases,
      promptAliases,
      assets: assetRefs,
      stages: {
        storyboard: "ready",
        assets: assetRefs.length === 0 ? "unassigned" : existingVisualAssets.length === visualAssets.length ? "ready" : existingVisualAssets.length > 0 ? "partial" : "missing",
        prompt: prompt ? "ready" : "missing",
        video: "missing",
        edit: "missing",
      },
    };
  });

  const scenes = [];
  const sceneMap = new Map();
  shotRecords.forEach((shot) => {
    if (!sceneMap.has(shot.sceneNo)) {
      const scene = { sceneNo: shot.sceneNo, shots: [] };
      sceneMap.set(shot.sceneNo, scene);
      scenes.push(scene);
    }
    sceneMap.get(shot.sceneNo).shots.push(shot);
  });

  const allAssets = [...assetRegistry.values()].reduce((list, asset) => {
    const canonicalAlias = asset.canonicalAlias ?? asset.alias;
    if (list.some((item) => item.canonicalAlias === canonicalAlias)) {
      return list;
    }
    const referenceOnly = !asset.fileName || !/\.(png|jpg|jpeg|webp)$/i.test(asset.fileName);
    const fileExists = asset.fileName ? fs.existsSync(path.join(assetsDir, asset.fileName)) : false;
    list.push({
      ...asset,
      canonicalAlias,
      referenceOnly,
      fileExists,
    });
    return list;
  }, []);

  return {
    projectSlug,
    generatedAt: new Date().toISOString(),
    sourceFiles: {
      shotList: path.relative(rootDir, shotListPath),
      referenceMap: path.relative(rootDir, referenceMapPath),
      generationList: path.relative(rootDir, generationListPath),
      prompts: promptPaths.map((filePath) => path.relative(rootDir, filePath)),
      config: projectConfig.configPath,
    },
    summary: {
      totalShots: shotRecords.length,
      totalScenes: scenes.length,
      shotsWithBindings: shotRecords.filter((shot) => shot.assets.length > 0).length,
      shotsWithPrompts: shotRecords.filter((shot) => shot.promptText).length,
      assetsDefined: allAssets.length,
      visualAssetsGenerated: allAssets.filter((asset) => !asset.referenceOnly && asset.fileExists).length,
      visualAssetsTotal: allAssets.filter((asset) => !asset.referenceOnly).length,
    },
    warnings: {
      unresolvedAliases: [...unresolvedAliases].sort(),
      shotsWithoutBindings: shotRecords.filter((shot) => shot.assets.length === 0).map((shot) => shot.shotNo),
      shotsWithoutPrompts: shotRecords.filter((shot) => !shot.promptText).map((shot) => shot.shotNo),
    },
    scenes,
    shots: shotRecords,
    assets: allAssets,
    outputDir,
    generationListContent,
  };
}

function renderAssetPills(assets) {
  if (!assets.length) {
    return '<div class="pill pill-empty">未绑定资产</div>';
  }

  return assets
    .map((asset) => {
      const statusClass = asset.referenceOnly ? "ref" : asset.fileExists ? "ok" : "missing";
      const statusLabel = asset.referenceOnly ? "声音参考" : asset.fileExists ? "已存在" : "缺图";
      return `<div class="pill ${statusClass}"><span>${escapeHtml(asset.alias)}</span><small>${escapeHtml(statusLabel)}</small></div>`;
    })
    .join("");
}

function renderAssetThumbs(assets) {
  const visualAssets = assets.filter((asset) => !asset.referenceOnly).slice(0, 4);
  if (!visualAssets.length) {
    return '<div class="thumb empty">暂无图像资产</div>';
  }

  return visualAssets
    .map((asset) => {
      if (asset.fileExists) {
        return `<div class="thumb"><img src="${escapeHtml(asset.imageRelativePath)}" alt="${escapeHtml(asset.alias)}" /><span>${escapeHtml(asset.alias)}</span></div>`;
      }
      return `<div class="thumb empty"><strong>${escapeHtml(asset.alias)}</strong><span>${escapeHtml(asset.fileName || "未定义文件")}</span></div>`;
    })
    .join("");
}

function renderStage(stageName, status) {
  return `<span class="stage ${escapeHtml(status)}">${escapeHtml(stageName)} · ${escapeHtml(stageLabel(status))}</span>`;
}

function renderScene(scene) {
  const cards = scene.shots
    .map((shot) => {
      const promptPreview = shot.promptText
        ? shot.promptText.slice(0, 220) + (shot.promptText.length > 220 ? "..." : "")
        : "当前未找到逐镜 prompt。";

      return `
        <article class="shot-card" id="shot-${escapeHtml(shot.shotNo)}">
          <div class="shot-head">
            <div>
              <div class="shot-no">Shot ${escapeHtml(shot.shotNo)}</div>
              <h3>${escapeHtml(shot.promptTitle || shot.visualAction)}</h3>
            </div>
            <div class="shot-meta-top">${escapeHtml(shot.sceneNo)} · ${escapeHtml(shot.duration)}</div>
          </div>
          <div class="shot-meta-grid">
            <div><strong>景别</strong><span>${escapeHtml(shot.framing)}</span></div>
            <div><strong>机位</strong><span>${escapeHtml(shot.cameraMove)}</span></div>
            <div><strong>动作</strong><span>${escapeHtml(shot.visualAction)}</span></div>
            <div><strong>声音</strong><span>${escapeHtml(shot.dialogueOrSound)}</span></div>
          </div>
          <div class="stages">
            ${renderStage("分镜", shot.stages.storyboard)}
            ${renderStage("资产", shot.stages.assets)}
            ${renderStage("提示词", shot.stages.prompt)}
            ${renderStage("视频", shot.stages.video)}
            ${renderStage("剪辑", shot.stages.edit)}
          </div>
          <div class="thumb-grid">${renderAssetThumbs(shot.assets)}</div>
          <div class="pill-row">${renderAssetPills(shot.assets)}</div>
          <details class="prompt-panel">
            <summary>查看 prompt 与来源</summary>
            <div class="prompt-source">${escapeHtml(shot.promptSourcePath || "未匹配到逐镜 prompt 文件")}</div>
            <pre>${escapeHtml(shot.promptText || promptPreview)}</pre>
          </details>
        </article>
      `;
    })
    .join("");

  return `
    <section class="scene-block" id="scene-${escapeHtml(scene.sceneNo)}">
      <div class="scene-head">
        <h2>${escapeHtml(scene.sceneNo)}</h2>
        <span>${scene.shots.length} shots</span>
      </div>
      <div class="shot-grid">${cards}</div>
    </section>
  `;
}

function renderHtml(data) {
  const warningHtml = [
    data.warnings.unresolvedAliases.length
      ? `<li>未解析别名：${escapeHtml(data.warnings.unresolvedAliases.join(", "))}</li>`
      : "",
    data.warnings.shotsWithoutBindings.length
      ? `<li>未绑定资产的镜头：${escapeHtml(data.warnings.shotsWithoutBindings.join(", "))}</li>`
      : "",
    data.warnings.shotsWithoutPrompts.length
      ? `<li>未匹配逐镜 prompt 的镜头：${escapeHtml(data.warnings.shotsWithoutPrompts.join(", "))}</li>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const sceneLinks = data.scenes
    .map((scene) => `<a href="#scene-${escapeHtml(scene.sceneNo)}">${escapeHtml(scene.sceneNo)}</a>`)
    .join("");

  const sections = data.scenes.map((scene) => renderScene(scene)).join("");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(data.projectSlug)} Storyboard</title>
  <style>
    :root {
      --bg: #0f1115;
      --panel: #171b22;
      --line: #2a3240;
      --text: #e8edf5;
      --muted: #9aa5b5;
      --accent: #68b3ff;
      --ok: #4ade80;
      --warn: #f59e0b;
      --missing: #6b7280;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: linear-gradient(180deg, #0f1115 0%, #141922 100%);
      color: var(--text);
      font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .wrap {
      max-width: 1500px;
      margin: 0 auto;
      padding: 28px;
    }
    .hero {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 18px;
      margin-bottom: 24px;
    }
    .panel {
      background: rgba(23, 27, 34, 0.92);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 20px;
    }
    h1, h2, h3, p { margin: 0; }
    .hero h1 {
      font-size: 30px;
      margin-bottom: 8px;
    }
    .hero p {
      color: var(--muted);
      line-height: 1.6;
    }
    .meta {
      margin-top: 12px;
      font-size: 12px;
      color: var(--muted);
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    .stat {
      background: #11161d;
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 14px;
    }
    .stat strong {
      display: block;
      font-size: 22px;
      margin-bottom: 4px;
    }
    .stat span {
      color: var(--muted);
      font-size: 12px;
    }
    .scene-nav {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .scene-nav a {
      color: var(--text);
      text-decoration: none;
      border: 1px solid var(--line);
      background: #121821;
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
    }
    .scene-block { margin-bottom: 28px; }
    .scene-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .scene-head span { color: var(--muted); }
    .shot-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .shot-card {
      background: rgba(23, 27, 34, 0.92);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 16px;
    }
    .shot-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .shot-no {
      color: var(--accent);
      font-size: 12px;
      margin-bottom: 6px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .shot-head h3 {
      font-size: 18px;
      line-height: 1.35;
    }
    .shot-meta-top {
      color: var(--muted);
      white-space: nowrap;
      font-size: 12px;
    }
    .shot-meta-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 12px;
    }
    .shot-meta-grid div {
      background: #11161d;
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 10px;
    }
    .shot-meta-grid strong {
      display: block;
      color: var(--muted);
      font-size: 11px;
      margin-bottom: 4px;
    }
    .stages, .pill-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .stage, .pill {
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 11px;
      border: 1px solid var(--line);
      background: #11161d;
    }
    .stage.ready, .pill.ok { border-color: rgba(74, 222, 128, 0.35); color: #b7f7c8; }
    .stage.partial { border-color: rgba(245, 158, 11, 0.35); color: #ffd28c; }
    .stage.missing, .pill.missing, .pill-empty { color: var(--muted); }
    .pill.ref, .stage.unassigned { border-color: rgba(104, 179, 255, 0.35); color: #b9dcff; }
    .pill small { margin-left: 6px; color: inherit; opacity: 0.8; }
    .thumb-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }
    .thumb {
      min-height: 118px;
      background: #11161d;
      border: 1px solid var(--line);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .thumb img {
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      display: block;
    }
    .thumb span, .thumb strong {
      padding: 8px 10px;
      font-size: 11px;
    }
    .thumb.empty {
      justify-content: center;
      align-items: center;
      color: var(--muted);
      text-align: center;
      padding: 12px;
    }
    details.prompt-panel {
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #11161d;
      padding: 12px;
    }
    details summary {
      cursor: pointer;
      color: #dce7f7;
    }
    .prompt-source {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      color: var(--muted);
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
      font-family: inherit;
      line-height: 1.6;
      color: #d8e1ee;
    }
    .warning-list {
      margin: 10px 0 0;
      padding-left: 18px;
      color: #ffd28c;
    }
    .footer {
      margin-top: 28px;
      color: var(--muted);
      font-size: 12px;
    }
    @media (max-width: 1100px) {
      .hero, .shot-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 720px) {
      .wrap { padding: 16px; }
      .stats, .shot-meta-grid, .thumb-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div class="panel">
        <h1>${escapeHtml(data.projectSlug)} Storyboard Workflow</h1>
        <p>这个故事板把当前项目的剧本分镜链路折成一个可浏览面板：shot list 负责镜头骨架，reference map 负责资产绑定，逐镜 prompt 负责视频提示词，视频生成与剪辑先保留为工作流骨架状态。</p>
        <div class="meta">生成时间：${escapeHtml(data.generatedAt)}<br />来源：${escapeHtml(data.sourceFiles.shotList)} · ${escapeHtml(data.sourceFiles.referenceMap)} · ${escapeHtml(data.sourceFiles.generationList)}</div>
        ${warningHtml ? `<ul class="warning-list">${warningHtml}</ul>` : ""}
      </div>
      <div class="panel">
        <div class="stats">
          <div class="stat"><strong>${data.summary.totalShots}</strong><span>总镜头</span></div>
          <div class="stat"><strong>${data.summary.totalScenes}</strong><span>场次分组</span></div>
          <div class="stat"><strong>${data.summary.shotsWithBindings}</strong><span>已绑定资产镜头</span></div>
          <div class="stat"><strong>${data.summary.shotsWithPrompts}</strong><span>已匹配逐镜 prompt</span></div>
          <div class="stat"><strong>${data.summary.visualAssetsGenerated}/${data.summary.visualAssetsTotal}</strong><span>现有图像资产</span></div>
          <div class="stat"><strong>${data.warnings.unresolvedAliases.length}</strong><span>待清理别名漂移</span></div>
        </div>
      </div>
    </section>
    <nav class="scene-nav">${sceneLinks}</nav>
    ${sections}
    <div class="footer">输出目录：${escapeHtml(path.relative(process.cwd(), data.outputDir))}</div>
  </div>
</body>
</html>`;
}

function writeOutputs(data) {
  fs.mkdirSync(data.outputDir, { recursive: true });
  const htmlPath = path.join(data.outputDir, `${data.projectSlug}.storyboard.html`);
  const jsonPath = path.join(data.outputDir, `${data.projectSlug}.storyboard.json`);

  fs.writeFileSync(htmlPath, renderHtml(data), "utf8");
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        projectSlug: data.projectSlug,
        generatedAt: data.generatedAt,
        sourceFiles: data.sourceFiles,
        summary: data.summary,
        warnings: data.warnings,
        scenes: data.scenes,
      },
      null,
      2,
    ),
    "utf8",
  );

  return { htmlPath, jsonPath };
}

function printUsage() {
  console.log("用法: node screenplay/build_storyboard.js [project-slug]");
  console.log(`默认 slug: ${DEFAULT_SLUG}`);
  console.log("默认命名规则:");
  console.log("  screenplay/<slug>-shot-list.md");
  console.log("  screenplay/<slug>-seedance-reference-map.md");
  console.log("  screenplay/<slug>-final-generation-list.md");
  console.log("  screenplay/<slug>-*-video-prompts-shot-by-shot.md");
  console.log("可选配置:");
  console.log("  screenplay/<slug>-storyboard.config.json");
}

function main() {
  const arg = process.argv[2];
  if (arg === "--help" || arg === "-h") {
    printUsage();
    return;
  }

  const projectSlug = arg || DEFAULT_SLUG;
  const data = buildData(projectSlug);
  const outputs = writeOutputs(data);

  console.log(`Storyboard 已生成: ${path.relative(process.cwd(), outputs.htmlPath)}`);
  console.log(`JSON 清单已生成: ${path.relative(process.cwd(), outputs.jsonPath)}`);
  console.log(`镜头数: ${data.summary.totalShots}`);
  console.log(`已匹配逐镜 prompt: ${data.summary.shotsWithPrompts}`);
  console.log(`图像资产现状: ${data.summary.visualAssetsGenerated}/${data.summary.visualAssetsTotal}`);
  if (data.warnings.unresolvedAliases.length > 0) {
    console.log(`未解析别名: ${data.warnings.unresolvedAliases.join(", ")}`);
  }
}

main();
