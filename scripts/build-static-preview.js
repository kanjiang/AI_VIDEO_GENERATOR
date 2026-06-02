const fs = require("fs");
const path = require("path");

const DEFAULT_PROJECT_SLUG = "zhengci-zhiwai";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateTime(value) {
  if (!value) {
    return "未记录";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function slugToTitle(slug) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function stageClass(status) {
  if (status === "ready") return "chip chip--ok";
  if (status === "partial") return "chip chip--warn";
  return "chip chip--muted";
}

function taskStatusClass(status) {
  if (status === "succeeded") return "task-status-badge task-status-badge--succeeded";
  if (status === "failed") return "task-status-badge task-status-badge--failed";
  if (status === "running") return "task-status-badge task-status-badge--running";
  return "task-status-badge task-status-badge--queued";
}

function taskStatusLabel(status) {
  if (status === "queued") return "待排队";
  if (status === "running") return "执行中";
  if (status === "succeeded") return "已完成";
  return "失败";
}

function assetStateLabel(fileExists, referenceOnly) {
  if (referenceOnly) return "参考资产";
  if (fileExists) return "图片已就绪";
  return "缺少图片文件";
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function getDatabase(rootPath) {
  const dbPath = path.join(rootPath, ".app-data", "ai-video-generator.sqlite");
  if (!fs.existsSync(dbPath)) {
    return null;
  }

  try {
    const Database = require("better-sqlite3");
    return new Database(dbPath, { readonly: true });
  } catch {
    return null;
  }
}

function loadTasks(rootPath, slug) {
  const db = getDatabase(rootPath);
  if (!db) {
    return [];
  }

  try {
    const rows = db
      .prepare(
        `SELECT id, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at
         FROM task_queue
         WHERE project_slug = ?
         ORDER BY shot_id ASC, updated_at DESC`,
      )
      .all(slug);

    return rows.map((row) => ({
      id: row.id,
      shotId: row.shot_id,
      providerName: row.provider_name,
      providerTaskId: row.provider_task_id,
      resultUrls: row.result_urls ? JSON.parse(row.result_urls) : [],
      outputManifestPath: row.output_manifest_path,
      status: row.status,
      progress: row.progress,
      retryCount: row.retry_count,
      lastError: row.last_error,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  } finally {
    db.close();
  }
}

function listProviderStatuses() {
  const submitUrl = process.env.VIDEO_HTTP_GENERIC_SUBMIT_URL || "";

  return [
    {
      name: "mock",
      label: "Mock Provider",
      description: "本地占位引擎，用来验证任务提交流程、状态切换和失败重试。",
      isAvailable: true,
      requiredEnvVars: [],
      optionalEnvVars: [],
      missingEnvVars: [],
      endpointPreview: "本地内置 provider",
      notes: ["不依赖外部服务", "适合先走通镜头任务链路"],
    },
    {
      name: "http-generic",
      label: "Generic HTTP",
      description: "通用 HTTP 提交器。配置提交 URL 后即可把镜头任务 POST 到外部视频 API。",
      isAvailable: Boolean(submitUrl),
      requiredEnvVars: ["VIDEO_HTTP_GENERIC_SUBMIT_URL"],
      optionalEnvVars: ["VIDEO_HTTP_GENERIC_STATUS_URL", "VIDEO_HTTP_GENERIC_RESULT_URL", "VIDEO_HTTP_GENERIC_TOKEN"],
      missingEnvVars: submitUrl ? [] : ["VIDEO_HTTP_GENERIC_SUBMIT_URL"],
      endpointPreview: submitUrl || "未配置 Submit URL",
      notes: submitUrl ? ["已检测到提交地址", "可用于真实 provider 集成"] : ["当前未启用", "配置 Submit URL 后即可转为可用"],
    },
  ];
}

function flattenShots(storyboard) {
  return storyboard.scenes.flatMap((scene) => scene.shots);
}

function summarizeTasks(tasks) {
  return tasks.reduce(
    (summary, task) => {
      summary.total += 1;
      if (task.status === "queued") summary.queued += 1;
      if (task.status === "running") summary.running += 1;
      if (task.status === "succeeded") summary.succeeded += 1;
      if (task.status === "failed") summary.failed += 1;
      return summary;
    },
    { total: 0, queued: 0, running: 0, succeeded: 0, failed: 0 },
  );
}

function summarizeTasksByShot(tasks) {
  const byShot = new Map();

  for (const task of tasks) {
    const current = byShot.get(task.shotId);
    if (!current) {
      byShot.set(task.shotId, {
        latestTask: task,
        total: 1,
        succeeded: task.status === "succeeded" ? 1 : 0,
        failed: task.status === "failed" ? 1 : 0,
      });
      continue;
    }

    const latestTask = new Date(task.updatedAt).getTime() > new Date(current.latestTask.updatedAt).getTime() ? task : current.latestTask;
    byShot.set(task.shotId, {
      latestTask,
      total: current.total + 1,
      succeeded: current.succeeded + (task.status === "succeeded" ? 1 : 0),
      failed: current.failed + (task.status === "failed" ? 1 : 0),
    });
  }

  return byShot;
}

function buildRelativeAssetPath(slug, fileName) {
  if (!fileName) {
    return "";
  }

  return path.posix.join("..", "..", "..", "..", "assets", slug, fileName).replace(/\\/g, "/");
}

function baseStyles() {
  return `
    :root {
      color-scheme: light;
      --bg: #f4efe6;
      --surface: rgba(255, 252, 246, 0.86);
      --surface-strong: #fff8ee;
      --text: #1f1b16;
      --muted: #6e6253;
      --line: rgba(31, 27, 22, 0.12);
      --accent: #9c3d16;
      --accent-soft: #f1d7c7;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      min-height: 100%;
      background:
        radial-gradient(circle at top left, rgba(156, 61, 22, 0.14), transparent 28%),
        radial-gradient(circle at bottom right, rgba(57, 94, 73, 0.12), transparent 24%),
        var(--bg);
      color: var(--text);
      font-family: "Noto Serif SC", "Source Han Serif SC", Georgia, serif;
    }
    a { color: inherit; text-decoration: none; }
    main {
      width: min(1120px, calc(100% - 48px));
      margin: 0 auto;
      padding: 48px 0 72px;
    }
    .hero {
      display: grid;
      gap: 24px;
      padding: 32px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: linear-gradient(145deg, rgba(255, 248, 238, 0.96), rgba(255, 252, 246, 0.82));
      box-shadow: 0 24px 80px rgba(73, 54, 35, 0.08);
    }
    .hero--canvas { position: relative; overflow: hidden; }
    .hero--canvas::after {
      content: "";
      position: absolute;
      inset: auto -8% -32% auto;
      width: 320px;
      height: 320px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(156, 61, 22, 0.18), transparent 68%);
      pointer-events: none;
    }
    .eyebrow {
      margin: 0;
      color: var(--accent);
      font-size: 13px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    .hero h1 { margin: 0; font-size: clamp(40px, 7vw, 74px); line-height: 0.95; }
    .hero p { margin: 0; max-width: 780px; color: var(--muted); font-size: 18px; line-height: 1.7; }
    .stack { display: grid; gap: 12px; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 10px; }
    .chip {
      padding: 8px 12px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 14px;
    }
    .chip--warn { background: rgba(153, 45, 34, 0.12); color: #8d2a20; }
    .chip--ok { background: rgba(57, 94, 73, 0.12); color: #2b573f; }
    .chip--muted { background: rgba(31, 27, 22, 0.06); color: var(--muted); }
    .card {
      padding: 22px;
      border-radius: 22px;
      border: 1px solid var(--line);
      background: var(--surface);
      backdrop-filter: blur(10px);
    }
    .card h2, .card h3 { margin: 0 0 10px; font-size: 22px; }
    .mono {
      color: var(--muted);
      line-height: 1.65;
      font-family: "Cascadia Code", Consolas, monospace;
      font-size: 13px;
    }
    .endpoint {
      display: grid;
      gap: 4px;
      padding: 14px 16px;
      border-radius: 16px;
      background: var(--surface-strong);
      border: 1px solid var(--line);
    }
    .endpoint strong {
      font-family: "Cascadia Code", Consolas, monospace;
      font-size: 14px;
    }
    .prompt-preview {
      margin: 8px 0 0;
      padding: 14px 16px;
      white-space: pre-wrap;
      border-radius: 14px;
      background: rgba(31, 27, 22, 0.04);
      border: 1px solid rgba(31, 27, 22, 0.08);
      color: var(--text);
      font-family: "Cascadia Code", Consolas, monospace;
      font-size: 12px;
      line-height: 1.6;
    }
    .hero-canvas-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
    }
    .hero-canvas-meta__panel {
      display: grid;
      gap: 8px;
      padding: 16px 18px;
      border-radius: 18px;
      border: 1px solid rgba(31, 27, 22, 0.08);
      background: rgba(255, 252, 246, 0.74);
    }
    .hero-canvas-meta__panel strong { font-size: 22px; }
    .hero-canvas-meta__label {
      color: var(--accent);
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    .workflow-node__actions, .workflow-inspector__actions { display: flex; flex-wrap: wrap; gap: 10px; }
    .workflow-node__link {
      padding: 10px 14px;
      border-radius: 14px;
      border: 1px solid rgba(31, 27, 22, 0.1);
      background: rgba(255, 255, 255, 0.7);
      color: var(--text);
      font-size: 14px;
    }
    .workflow-node__link--primary {
      background: var(--accent);
      color: #fff8ee;
      border-color: transparent;
    }
    .project-studio {
      position: relative;
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 18px;
      margin-top: 24px;
      padding: 24px;
      border-radius: 30px;
      border: 1px solid var(--line);
      background: rgba(255, 250, 244, 0.72);
      overflow: hidden;
    }
    .project-studio__grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(31, 27, 22, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(31, 27, 22, 0.04) 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.6;
      pointer-events: none;
    }
    .project-studio__track {
      position: absolute;
      left: 8%;
      right: 10%;
      top: 124px;
      height: 2px;
      background: linear-gradient(90deg, rgba(156, 61, 22, 0.22), rgba(57, 94, 73, 0.2));
      pointer-events: none;
    }
    .project-studio__column {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 16px;
      align-content: start;
      padding: 20px;
      border-radius: 24px;
      border: 1px solid rgba(31, 27, 22, 0.09);
      background: rgba(255, 252, 246, 0.92);
      box-shadow: 0 18px 42px rgba(73, 54, 35, 0.07);
    }
    .project-studio__column--overview { grid-column: span 3; margin-top: 14px; }
    .project-studio__column--storyboard { grid-column: span 5; margin-top: 64px; }
    .project-studio__column--assets { grid-column: span 4; margin-top: 20px; }
    .project-kpi-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .project-kpi {
      display: grid;
      gap: 6px;
      padding: 14px;
      border-radius: 18px;
      border: 1px solid rgba(156, 61, 22, 0.12);
      background: linear-gradient(160deg, rgba(255, 248, 238, 0.94), rgba(245, 236, 222, 0.62));
    }
    .project-kpi span { color: var(--accent); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
    .project-kpi strong { font-size: 28px; line-height: 1; }
    .project-link-list, .project-mini-list, .storyboard-scene-list, .provider-config-meta { display: grid; gap: 10px; }
    .project-callout {
      padding: 16px;
      border-radius: 20px;
      border: 1px solid rgba(31, 27, 22, 0.08);
      background: rgba(255, 248, 238, 0.78);
    }
    .task-summary-grid, .provider-config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }
    .task-panel { display: grid; gap: 20px; overflow: hidden; }
    .task-panel__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }
    .task-panel__toolbar { display: flex; flex-wrap: wrap; gap: 10px; }
    .task-summary-card {
      display: grid;
      gap: 6px;
      padding: 18px;
      border: 1px solid rgba(156, 61, 22, 0.14);
      border-radius: 18px;
      background: linear-gradient(160deg, rgba(255, 248, 238, 0.96), rgba(245, 236, 222, 0.72));
    }
    .task-summary-card strong { font-size: 34px; line-height: 1; }
    .task-summary-card__label, .provider-config-meta__label {
      color: var(--accent);
      font-size: 13px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .task-summary-card__hint { color: var(--muted); font-size: 13px; }
    .task-selection-panel {
      padding: 18px;
      border-radius: 20px;
      background: rgba(255, 248, 238, 0.72);
      border: 1px solid var(--line);
    }
    .task-selection-panel__meta {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
    }
    .task-selection-panel__meta h3 { margin: 0 0 4px; }
    .task-selection-panel__meta p { margin: 0; }
    .task-selection-panel__badge {
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(156, 61, 22, 0.1);
      color: var(--accent);
      font-size: 13px;
      white-space: nowrap;
    }
    .provider-grid, .task-selection-groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }
    .provider-card {
      display: grid;
      gap: 8px;
      padding: 16px;
      border-radius: 18px;
      border: 1px solid rgba(31, 27, 22, 0.12);
      background: rgba(255, 252, 246, 0.92);
      color: var(--text);
      text-align: left;
    }
    .provider-card strong { font-size: 17px; }
    .provider-card span, .provider-card small { color: var(--muted); }
    .provider-card--selected {
      border-color: rgba(156, 61, 22, 0.52);
      background: linear-gradient(160deg, rgba(250, 229, 214, 0.96), rgba(255, 248, 238, 0.94));
      box-shadow: inset 0 0 0 1px rgba(156, 61, 22, 0.18);
    }
    .task-batch-actions, .task-filter-group, .task-card__actions { display: flex; flex-wrap: wrap; gap: 10px; }
    .task-group-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .task-group-heading h4 { margin: 0; font-size: 17px; }
    .task-group-heading span { color: var(--muted); font-size: 13px; }
    .task-shot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 10px;
    }
    .task-shot-chip {
      display: grid;
      gap: 4px;
      padding: 14px 16px;
      border: 1px solid rgba(31, 27, 22, 0.1);
      border-radius: 16px;
      background: rgba(255, 252, 246, 0.94);
      color: var(--text);
      text-align: left;
    }
    .task-shot-chip span {
      font-family: "Cascadia Code", Consolas, monospace;
      font-size: 14px;
    }
    .task-shot-chip small { color: var(--muted); font-size: 12px; }
    .task-shot-chip--selected {
      border-color: rgba(156, 61, 22, 0.52);
      background: linear-gradient(160deg, rgba(250, 229, 214, 0.96), rgba(255, 248, 238, 0.94));
      box-shadow: inset 0 0 0 1px rgba(156, 61, 22, 0.18);
    }
    .task-empty-state {
      margin: 0;
      padding: 14px 16px;
      border-radius: 16px;
      border: 1px dashed rgba(31, 27, 22, 0.16);
      color: var(--muted);
      background: rgba(255, 252, 246, 0.72);
    }
    .task-list-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
    }
    .task-list-toolbar h3, .task-list-toolbar p { margin: 0; }
    .task-filter-chip {
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid rgba(31, 27, 22, 0.12);
      background: rgba(255, 248, 238, 0.88);
      color: var(--text);
      font: inherit;
    }
    .task-filter-chip--active {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff8ee;
    }
    .task-list { display: grid; gap: 14px; }
    .task-card {
      display: grid;
      gap: 14px;
      padding: 18px;
      border-radius: 20px;
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(255, 252, 246, 0.96), rgba(251, 246, 239, 0.88));
    }
    .task-card__topline {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
    }
    .task-card__title { font-size: 20px; line-height: 1.1; }
    .task-card__subline {
      color: var(--muted);
      font-family: "Cascadia Code", Consolas, monospace;
      font-size: 12px;
      word-break: break-all;
    }
    .task-card__metrics {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 14px;
      color: var(--muted);
      font-size: 14px;
    }
    .task-progress {
      height: 10px;
      border-radius: 999px;
      background: rgba(31, 27, 22, 0.08);
      overflow: hidden;
    }
    .task-progress__bar {
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #9c3d16, #d2744e);
    }
    .task-status-badge {
      padding: 8px 10px;
      border-radius: 999px;
      font-size: 12px;
      white-space: nowrap;
    }
    .task-status-badge--queued { background: rgba(157, 126, 45, 0.12); color: #7e5d12; }
    .task-status-badge--running { background: rgba(44, 101, 124, 0.12); color: #1f6177; }
    .task-status-badge--succeeded { background: rgba(57, 94, 73, 0.12); color: #2b573f; }
    .task-status-badge--failed { background: rgba(153, 45, 34, 0.12); color: #8d2a20; }
    .task-error-note, .task-muted-note { margin: 0; font-size: 14px; }
    .task-error-note { color: #8d2a20; }
    .task-muted-note { color: var(--muted); }
    .action-button {
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid transparent;
      font: inherit;
    }
    .action-button--primary { background: var(--accent); color: #fff8ee; }
    .action-button--ghost { background: rgba(255, 248, 238, 0.82); border-color: rgba(31, 27, 22, 0.12); color: var(--text); }
    .action-button--success { background: rgba(57, 94, 73, 0.12); border-color: rgba(57, 94, 73, 0.2); color: #2b573f; }
    .action-button--danger { background: rgba(153, 45, 34, 0.12); border-color: rgba(153, 45, 34, 0.2); color: #8d2a20; }
    .provider-config-card {
      display: grid;
      gap: 14px;
      padding: 18px;
      border-radius: 20px;
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(255, 252, 246, 0.96), rgba(251, 246, 239, 0.88));
    }
    .provider-config-card__header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
    }
    .provider-config-card__header span, .provider-config-card p { color: var(--muted); }
    .provider-config-badge {
      padding: 8px 10px;
      border-radius: 999px;
      font-size: 12px;
      white-space: nowrap;
    }
    .provider-config-badge--ready { background: rgba(57, 94, 73, 0.12); color: #2b573f; }
    .provider-config-badge--pending { background: rgba(157, 126, 45, 0.12); color: #7e5d12; }
    .prompt-workspace { display: grid; gap: 16px; }
    .storyboard-shot-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
    .prompt-card {
      display: grid;
      gap: 12px;
      padding: 18px;
      border-radius: 18px;
      border: 1px solid rgba(31, 27, 22, 0.08);
      background: rgba(255, 250, 244, 0.86);
    }
    .prompt-card__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .storyboard-asset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 10px;
    }
    .storyboard-asset-thumb {
      display: grid;
      gap: 8px;
      overflow: hidden;
      padding: 10px;
      border-radius: 16px;
      border: 1px solid rgba(31, 27, 22, 0.08);
      background: rgba(255, 252, 246, 0.96);
    }
    .storyboard-asset-thumb__image {
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: cover;
      border-radius: 12px;
      background: rgba(31, 27, 22, 0.05);
    }
    .storyboard-asset-thumb__label, .storyboard-asset-thumb strong, .storyboard-asset-thumb span {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.5;
    }
    .storyboard-asset-thumb strong { color: var(--text); }
    .storyboard-asset-thumb--missing, .storyboard-asset-thumb--empty {
      align-content: center;
      min-height: 120px;
      background: rgba(31, 27, 22, 0.04);
    }
    .storyboard-asset-meta-list { display: grid; gap: 10px; }
    .storyboard-asset-meta-item {
      display: grid;
      gap: 8px;
      padding: 12px 14px;
      border-radius: 16px;
      border: 1px solid rgba(31, 27, 22, 0.08);
      background: rgba(255, 252, 246, 0.72);
    }
    .storyboard-asset-meta-item__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .storyboard-asset-meta-item__header strong { font-size: 15px; }
    .preview-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 24px;
    }
    .preview-nav__link {
      padding: 12px 16px;
      border-radius: 16px;
      border: 1px solid rgba(31, 27, 22, 0.1);
      background: rgba(255, 252, 246, 0.9);
    }
    .index-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
      margin-top: 24px;
    }
    .index-card {
      display: grid;
      gap: 14px;
      padding: 22px;
      border-radius: 22px;
      border: 1px solid var(--line);
      background: var(--surface);
      box-shadow: 0 24px 80px rgba(73, 54, 35, 0.08);
    }
    .index-card h2 { margin: 0; font-size: 28px; }
    .source-list { display: grid; gap: 8px; }
    .source-list a { color: var(--accent); }
    @media (max-width: 720px) {
      main { width: min(100% - 28px, 1120px); padding-top: 28px; }
      .hero { padding: 24px; border-radius: 24px; }
      .hero p { font-size: 16px; }
      .project-studio { grid-template-columns: 1fr; padding: 18px; }
      .project-studio__track, .project-studio__grid { display: none; }
      .project-studio__column--overview, .project-studio__column--storyboard, .project-studio__column--assets {
        grid-column: auto;
        margin-top: 0;
      }
      .project-kpi-grid { grid-template-columns: 1fr 1fr; }
      .prompt-card__header, .task-card__topline, .provider-config-card__header, .task-panel__header, .task-selection-panel__meta, .task-group-heading, .task-list-toolbar {
        flex-direction: column;
        align-items: flex-start;
      }
      .storyboard-shot-grid { grid-template-columns: 1fr; }
    }
  `;
}

function renderTaskPanelSnapshot({ tasks, allShotIds, providers }) {
  const taskSummary = summarizeTasks(tasks);
  const taskCountByShot = new Map();
  for (const task of tasks) {
    taskCountByShot.set(task.shotId, (taskCountByShot.get(task.shotId) || 0) + 1);
  }

  const submittedShotIds = allShotIds.filter((shotId) => taskCountByShot.has(shotId));
  const unsubmittedShotIds = allShotIds.filter((shotId) => !taskCountByShot.has(shotId));
  const failedShotIds = Array.from(new Set(tasks.filter((task) => task.status === "failed").map((task) => task.shotId))).sort();
  const activeTasks = tasks.filter((task) => task.status === "queued" || task.status === "running").length;

  return `
    <section class="card task-panel" style="margin-top: 24px;">
      <div class="task-panel__header">
        <div class="stack" style="gap: 6px;">
          <h2>任务操作台</h2>
          <p class="mono">把镜头提交、状态推进和失败重试收束到同一个工作区里。静态预览保留结构，不提供交互。</p>
        </div>
        <div class="task-panel__toolbar">
          <span class="action-button action-button--primary">提交所选镜头</span>
          <span class="action-button action-button--ghost">同步远端状态</span>
          <span class="action-button action-button--ghost">刷新任务</span>
        </div>
      </div>

      <div class="task-summary-grid">
        <article class="task-summary-card"><span class="task-summary-card__label">项目镜头</span><strong>${escapeHtml(allShotIds.length)}</strong><span class="task-summary-card__hint">从 generation list 读取到的全部可提交镜头</span></article>
        <article class="task-summary-card"><span class="task-summary-card__label">未提交镜头</span><strong>${escapeHtml(unsubmittedShotIds.length)}</strong><span class="task-summary-card__hint">这些镜头还没有进入任务队列</span></article>
        <article class="task-summary-card"><span class="task-summary-card__label">已提交镜头</span><strong>${escapeHtml(submittedShotIds.length)}</strong><span class="task-summary-card__hint">已经至少有一条任务记录的镜头</span></article>
        <article class="task-summary-card"><span class="task-summary-card__label">失败待处理</span><strong>${escapeHtml(taskSummary.failed)}</strong><span class="task-summary-card__hint">优先处理失败镜头，再决定是否重试</span></article>
      </div>

      <section class="task-selection-panel stack">
        <div class="task-selection-panel__meta">
          <div>
            <h3>批量提交工作台</h3>
            <p class="mono">静态预览模拟已选 ${escapeHtml(Math.min(unsubmittedShotIds.length, 3))} 个未提交镜头，只用于确认结构和信息密度。</p>
          </div>
          <span class="task-selection-panel__badge">队列任务 ${escapeHtml(taskSummary.total)}</span>
        </div>

        <div class="provider-grid">
          ${providers.map((provider, index) => `
            <div class="${index === 0 ? "provider-card provider-card--selected" : "provider-card"}">
              <strong>${escapeHtml(provider.label)}</strong>
              <span>${escapeHtml(provider.description)}</span>
              <small>${escapeHtml(provider.isAvailable ? "可直接提交" : "已注册，待启用")}</small>
            </div>
          `).join("")}
        </div>

        <p class="mono">当前提交通道：${escapeHtml((providers.find((provider) => provider.isAvailable) || providers[0]).label)}</p>

        <div class="task-batch-actions">
          <span class="action-button action-button--ghost">选择全部未提交</span>
          <span class="action-button action-button--ghost">选择失败镜头</span>
          <span class="action-button action-button--ghost">选择全部镜头</span>
          <span class="action-button action-button--ghost">清空选择</span>
        </div>

        <div class="task-selection-groups">
          <div class="stack" style="gap: 10px;">
            <div class="task-group-heading">
              <h4>未提交</h4>
              <span>${escapeHtml(unsubmittedShotIds.length)} 个镜头</span>
            </div>
            <div class="task-shot-grid">
              ${unsubmittedShotIds.slice(0, 12).map((shotId, index) => `
                <div class="${index < 3 ? "task-shot-chip task-shot-chip--selected" : "task-shot-chip"}">
                  <span>Shot ${escapeHtml(shotId)}</span>
                  <small>${index < 3 ? "准备提交" : "未进入队列"}</small>
                </div>
              `).join("") || '<p class="task-empty-state">当前所有镜头都至少有一条任务记录。</p>'}
            </div>
          </div>

          <div class="stack" style="gap: 10px;">
            <div class="task-group-heading">
              <h4>已提交</h4>
              <span>${escapeHtml(submittedShotIds.length)} 个镜头</span>
            </div>
            <div class="task-shot-grid">
              ${submittedShotIds.slice(0, 12).map((shotId) => `
                <div class="task-shot-chip">
                  <span>Shot ${escapeHtml(shotId)}</span>
                  <small>${escapeHtml(taskCountByShot.get(shotId) || 0)} 条任务</small>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="task-list-toolbar">
        <div>
          <h3>任务列表</h3>
          <p class="mono">按状态快速筛选，优先处理运行中和失败项。</p>
        </div>
        <div class="task-filter-group">
          <span class="task-filter-chip task-filter-chip--active">全部 ${escapeHtml(taskSummary.total)}</span>
          <span class="task-filter-chip">活跃 ${escapeHtml(activeTasks)}</span>
          <span class="task-filter-chip">失败 ${escapeHtml(taskSummary.failed)}</span>
          <span class="task-filter-chip">完成 ${escapeHtml(taskSummary.succeeded)}</span>
        </div>
      </section>

      ${failedShotIds.length ? `<p class="task-error-note">失败镜头示例：${escapeHtml(failedShotIds.slice(0, 6).join(", "))}</p>` : '<p class="task-muted-note">当前没有失败镜头。</p>'}

      <div class="task-list">${renderTaskList(tasks)}</div>
    </section>
  `;
}

function renderTaskList(tasks) {
  if (!tasks.length) {
    return '<p class="task-muted-note">当前未找到任务记录，预览页将只展示项目和分镜内容。</p>';
  }

  return tasks
    .slice(0, 8)
    .map((task) => `
      <article class="task-card">
        <div class="task-card__topline">
          <div class="stack" style="gap: 6px;">
            <strong class="task-card__title">Shot ${escapeHtml(task.shotId)}</strong>
            <span class="task-card__subline">${escapeHtml(task.id)}</span>
          </div>
          <span class="${taskStatusClass(task.status)}">${taskStatusLabel(task.status)}</span>
        </div>
        <div class="task-card__metrics">
          <span>Provider: ${escapeHtml(task.providerName)}</span>
          <span>进度 ${escapeHtml(task.progress)}%</span>
          <span>更新时间 ${escapeHtml(formatDateTime(task.updatedAt))}</span>
        </div>
        <div class="task-progress"><div class="task-progress__bar" style="width: ${Math.max(0, Math.min(100, Number(task.progress) || 0))}%;"></div></div>
        ${task.lastError ? `<p class="task-error-note">${escapeHtml(task.lastError)}</p>` : '<p class="task-muted-note">当前没有错误信息。</p>'}
      </article>
    `)
    .join("");
}

function renderProviderCards(providers) {
  return providers
    .map((provider) => `
      <article class="provider-config-card">
        <div class="provider-config-card__header">
          <div class="stack" style="gap: 4px;">
            <strong>${escapeHtml(provider.label)}</strong>
            <span>${escapeHtml(provider.description)}</span>
          </div>
          <span class="${provider.isAvailable ? "provider-config-badge provider-config-badge--ready" : "provider-config-badge provider-config-badge--pending"}">
            ${provider.isAvailable ? "已就绪" : "待配置"}
          </span>
        </div>
        <p class="mono">Submit URL: ${escapeHtml(provider.endpointPreview)}</p>
        <div class="provider-config-meta">
          <div class="stack" style="gap: 8px;">
            <span class="provider-config-meta__label">必填环境变量</span>
            <div class="chip-row">${(provider.requiredEnvVars.length ? provider.requiredEnvVars : ["无"]).map((envVar) => `<span class="chip">${escapeHtml(envVar)}</span>`).join("")}</div>
          </div>
          <div class="stack" style="gap: 8px;">
            <span class="provider-config-meta__label">当前缺失</span>
            <div class="chip-row">${(provider.missingEnvVars.length ? provider.missingEnvVars : ["无"]).map((envVar) => `<span class="${provider.missingEnvVars.length ? "chip chip--warn" : "chip chip--ok"}">${escapeHtml(envVar)}</span>`).join("")}</div>
          </div>
          <div class="stack" style="gap: 8px;">
            <span class="provider-config-meta__label">可选环境变量</span>
            <div class="chip-row">${(provider.optionalEnvVars.length ? provider.optionalEnvVars : ["无"]).map((envVar) => `<span class="${provider.optionalEnvVars.length ? "chip chip--muted" : "chip"}">${escapeHtml(envVar)}</span>`).join("")}</div>
          </div>
        </div>
        <div class="stack" style="gap: 8px;">
          <span class="provider-config-meta__label">说明</span>
          ${provider.notes.map((note) => `<p class="mono">${escapeHtml(note)}</p>`).join("")}
        </div>
      </article>
    `)
    .join("");
}

function renderProjectHtml({ slug, storyboard, tasks, providers }) {
  const shots = flattenShots(storyboard);
  const shotPreview = shots.slice(0, 6);
  const promptPreview = shots.filter((shot) => shot.promptText).slice(0, 3);
  const bindingPreview = shots.filter((shot) => shot.assets.length > 0).slice(0, 6);
  const taskSummary = summarizeTasks(tasks);
  const resultTask = tasks.find((task) => task.outputManifestPath) || tasks.find((task) => task.status === "succeeded") || tasks[0] || null;
  const allShotIds = Array.from(new Set(shots.map((shot) => shot.shotNo))).sort();

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(slug)} 项目静态预览</title>
  <style>${baseStyles()}</style>
</head>
<body>
  <main>
    <section class="hero hero--canvas">
      <p class="eyebrow">Project Detail Preview</p>
      <h1>${escapeHtml(slug)}</h1>
      <p>这是绕开 Next dev/build 的静态页面，用当前 storyboard JSON、任务库和 provider 状态拼出和项目详情页相同的阅读结构，方便直接做视觉确认。</p>
      <div class="chip-row">
        <span class="chip">镜头 ${escapeHtml(storyboard.summary.totalShots)}</span>
        <span class="chip">绑定 ${escapeHtml(storyboard.summary.shotsWithBindings)}</span>
        <span class="chip">Prompt ${escapeHtml(storyboard.summary.shotsWithPrompts)}</span>
        <span class="chip">任务 ${escapeHtml(taskSummary.total)}</span>
      </div>
      <div class="hero-canvas-meta">
        <div class="hero-canvas-meta__panel">
          <span class="hero-canvas-meta__label">当前工作流</span>
          <strong>剧本 → 分镜 → 资产 → 视频</strong>
          <p class="mono">项目概览、分镜预览、资产状态和任务摘要都落在同一页里，便于快速看版式和信息密度。</p>
        </div>
        <div class="hero-canvas-meta__panel">
          <span class="hero-canvas-meta__label">快速入口</span>
          <strong>进入静态预览</strong>
          <div class="workflow-node__actions">
            <a class="workflow-node__link workflow-node__link--primary" href="./storyboard.html">打开 storyboard</a>
            <a class="workflow-node__link" href="./index.html">返回预览入口</a>
            <a class="workflow-node__link" href="../storyboard/${escapeHtml(slug)}.storyboard.html">打开原 storyboard HTML</a>
          </div>
        </div>
      </div>
      <p class="mono">生成时间：${escapeHtml(formatDateTime(storyboard.generatedAt))}</p>
    </section>

    <section class="project-studio" aria-label="项目制作画布">
      <div class="project-studio__grid"></div>
      <div class="project-studio__track"></div>

      <article class="project-studio__column project-studio__column--overview stack">
        <div class="stack" style="gap: 8px;">
          <p class="eyebrow">故事输入</p>
          <h2>项目总览</h2>
          <p>这里对应项目详情页左列，集中展示项目规模、导入状态与入口导航。</p>
        </div>

        <div class="project-kpi-grid">
          <div class="project-kpi"><span>镜头</span><strong>${escapeHtml(storyboard.summary.totalShots)}</strong></div>
          <div class="project-kpi"><span>绑定</span><strong>${escapeHtml(storyboard.summary.shotsWithBindings)}</strong></div>
          <div class="project-kpi"><span>进行中</span><strong>${escapeHtml(taskSummary.running)}</strong></div>
          <div class="project-kpi"><span>失败</span><strong>${escapeHtml(taskSummary.failed)}</strong></div>
        </div>

        <div class="stack" style="gap: 10px;">
          <p class="eyebrow">工作流跳转</p>
          <div class="project-link-list">
            <a class="workflow-node__link workflow-node__link--primary" href="./storyboard.html">进入分镜台</a>
            <a class="workflow-node__link" href="../storyboard/${escapeHtml(slug)}.storyboard.json">打开 storyboard JSON</a>
            ${resultTask ? `<span class="workflow-node__link">最新结果任务 ${escapeHtml(resultTask.id)}</span>` : ""}
          </div>
        </div>

        <div class="project-callout stack">
          <p class="eyebrow">导入状态</p>
          <div class="endpoint">
            <strong>READY</strong>
            <span>shots ${escapeHtml(storyboard.summary.totalShots)} / bindings ${escapeHtml(storyboard.summary.shotsWithBindings)} / prompts ${escapeHtml(storyboard.summary.shotsWithPrompts)} / assets ${escapeHtml(storyboard.summary.visualAssetsGenerated)}/${escapeHtml(storyboard.summary.visualAssetsTotal)}</span>
          </div>
        </div>
      </article>

      <article class="project-studio__column project-studio__column--storyboard stack">
        <div class="stack" style="gap: 8px;">
          <p class="eyebrow">分镜中枢</p>
          <h2>镜头与 Prompt</h2>
          <p>这里对应项目详情页中列，先给出前 6 个镜头，再展示前 3 个逐镜 prompt。</p>
        </div>

        <div class="project-mini-list">
          ${shotPreview.map((shot) => `
            <div class="endpoint">
              <strong>Shot ${escapeHtml(shot.shotNo)} · ${escapeHtml(shot.sceneNo)}</strong>
              <span>${escapeHtml(shot.framing)} / ${escapeHtml(shot.cameraMove)} / ${escapeHtml(shot.duration)}</span>
              <span>${escapeHtml(shot.visualAction)}</span>
            </div>
          `).join("")}
        </div>

        <div class="stack" style="gap: 10px;">
          <p class="eyebrow">Prompt 预览</p>
          ${promptPreview.map((shot) => `
            <div class="endpoint">
              <strong>${escapeHtml(shot.promptTitle || `Shot ${shot.shotNo}`)}</strong>
              <span>${escapeHtml(shot.visualAction)}</span>
              <span>参考图：${escapeHtml(shot.assets.map((asset) => asset.alias).join(" / ") || "无")}</span>
              <pre class="prompt-preview">${escapeHtml(shot.promptText)}</pre>
            </div>
          `).join("")}
        </div>
      </article>

      <article class="project-studio__column project-studio__column--assets stack">
        <div class="stack" style="gap: 8px;">
          <p class="eyebrow">资产与输出</p>
          <h2>参考图与任务状态</h2>
          <p>这里对应项目详情页右列，把资产别名、任务状态和结果走向放在同一块。</p>
        </div>

        <div class="project-mini-list">
          ${bindingPreview.map((shot) => `
            <div class="endpoint">
              <strong>Shot ${escapeHtml(shot.shotNo)}</strong>
              <span>${escapeHtml(shot.assets.map((asset) => asset.alias).join(" / ") || "无")}</span>
            </div>
          `).join("")}
        </div>

        <div class="project-kpi-grid">
          <div class="project-kpi"><span>待排队</span><strong>${escapeHtml(taskSummary.queued)}</strong></div>
          <div class="project-kpi"><span>执行中</span><strong>${escapeHtml(taskSummary.running)}</strong></div>
          <div class="project-kpi"><span>完成</span><strong>${escapeHtml(taskSummary.succeeded)}</strong></div>
          <div class="project-kpi"><span>失败</span><strong>${escapeHtml(taskSummary.failed)}</strong></div>
        </div>

        <div class="project-link-list">
          <a class="workflow-node__link" href="./storyboard.html">打开 storyboard 页面</a>
          <span class="workflow-node__link">可提交镜头 ${escapeHtml(allShotIds.length)}</span>
          ${resultTask ? `<span class="workflow-node__link workflow-node__link--primary">最新任务 ${escapeHtml(resultTask.id)}</span>` : ""}
        </div>
      </article>
    </section>

    ${renderTaskPanelSnapshot({ tasks, allShotIds, providers })}

    <section class="card stack" style="margin-top: 24px;">
      <div class="stack" style="gap: 6px;">
        <h2>Provider 配置状态</h2>
        <p class="mono">这里沿用项目页下方的 provider 配置区域，方便一起看信息层次是否合理。</p>
      </div>
      <div class="provider-config-grid">${renderProviderCards(providers)}</div>
      <p class="mono">根目录可放置 .env.local；示例变量已写入项目根目录的 .env.example。</p>
    </section>

    <div class="preview-nav">
      <a class="preview-nav__link" href="./index.html">返回预览入口</a>
      <a class="preview-nav__link" href="./storyboard.html">打开静态 storyboard</a>
      <a class="preview-nav__link" href="../storyboard/${escapeHtml(slug)}.storyboard.html">打开原 storyboard HTML</a>
    </div>
  </main>
</body>
</html>`;
}

function renderStoryboardShot(slug, shot, taskSummary) {
  const visualAssets = shot.assets.filter((asset) => !asset.referenceOnly).slice(0, 4);

  return `
    <article class="prompt-card">
      <div class="prompt-card__header">
        <div class="stack" style="gap: 6px;">
          <strong>Shot ${escapeHtml(shot.shotNo)} · ${escapeHtml(shot.promptTitle || shot.visualAction)}</strong>
          <span>${escapeHtml(shot.framing)} / ${escapeHtml(shot.cameraMove)} / ${escapeHtml(shot.duration)}</span>
        </div>
        <span class="chip chip--muted">${escapeHtml(shot.sceneNo)}</span>
      </div>

      <p>${escapeHtml(shot.visualAction)}</p>
      <p class="mono">声音：${escapeHtml(shot.dialogueOrSound || "无")}</p>

      <div class="chip-row">
        ${taskSummary
          ? `
            <span class="${taskStatusClass(taskSummary.latestTask.status)}">任务 ${escapeHtml(taskStatusLabel(taskSummary.latestTask.status))} ${escapeHtml(taskSummary.latestTask.progress)}%</span>
            <span class="chip chip--muted">共 ${escapeHtml(taskSummary.total)} 条</span>
            ${taskSummary.failed > 0 ? `<span class="chip chip--warn">失败 ${escapeHtml(taskSummary.failed)}</span>` : ""}
            ${taskSummary.succeeded > 0 ? `<span class="chip chip--ok">完成 ${escapeHtml(taskSummary.succeeded)}</span>` : ""}
          `
          : '<span class="chip chip--muted">未提交任务</span>'}
      </div>

      <div class="chip-row">
        <span class="${stageClass(shot.stages.storyboard)}">分镜 ${escapeHtml(shot.stages.storyboard)}</span>
        <span class="${stageClass(shot.stages.assets)}">资产 ${escapeHtml(shot.stages.assets)}</span>
        <span class="${stageClass(shot.stages.prompt)}">提示词 ${escapeHtml(shot.stages.prompt)}</span>
        <span class="${stageClass(shot.stages.video)}">视频 ${escapeHtml(shot.stages.video)}</span>
        <span class="${stageClass(shot.stages.edit)}">剪辑 ${escapeHtml(shot.stages.edit)}</span>
      </div>

      <div class="storyboard-asset-grid">
        ${visualAssets.length
          ? visualAssets
              .map((asset) => {
                const assetPath = buildRelativeAssetPath(slug, asset.fileName);
                if (asset.fileExists && assetPath) {
                  return `
                    <a class="storyboard-asset-thumb" href="${escapeHtml(assetPath)}" target="_blank" rel="noreferrer">
                      <img alt="${escapeHtml(asset.alias)}" class="storyboard-asset-thumb__image" src="${escapeHtml(assetPath)}" />
                      <span class="storyboard-asset-thumb__label">${escapeHtml(asset.alias)}</span>
                    </a>
                  `;
                }

                return `
                  <div class="storyboard-asset-thumb storyboard-asset-thumb--missing">
                    <strong>${escapeHtml(asset.alias)}</strong>
                    <span>${escapeHtml(asset.fileName || "未定义文件")}</span>
                  </div>
                `;
              })
              .join("")
          : '<div class="storyboard-asset-thumb storyboard-asset-thumb--empty">暂无图像资产</div>'}
      </div>

      <div class="chip-row">
        ${shot.assets.length
          ? shot.assets
              .map((asset) => `<span class="${asset.referenceOnly ? "chip chip--muted" : asset.fileExists ? "chip chip--ok" : "chip chip--warn"}">${escapeHtml(asset.alias)}</span>`)
              .join("")
          : '<span class="chip chip--muted">未绑定资产</span>'}
      </div>

      <div class="storyboard-asset-meta-list">
        ${shot.assets.length
          ? shot.assets
              .map(
                (asset) => `
                  <article class="storyboard-asset-meta-item">
                    <div class="storyboard-asset-meta-item__header">
                      <strong>${escapeHtml(asset.alias)}</strong>
                      <span class="${asset.referenceOnly ? "chip chip--muted" : asset.fileExists ? "chip chip--ok" : "chip chip--warn"}">
                        ${escapeHtml(assetStateLabel(asset.fileExists, asset.referenceOnly))}
                      </span>
                    </div>
                    <p class="mono">文件：${escapeHtml(asset.fileName || "未定义")}</p>
                    <p class="mono">说明：${escapeHtml(asset.description || "无")}</p>
                    <p class="mono">来源别名：${escapeHtml((asset.sourceAliases || [asset.alias]).join(" / "))}</p>
                  </article>
                `,
              )
              .join("")
          : '<p class="mono">当前镜头未绑定任何资产。</p>'}
      </div>

      <pre class="prompt-preview">${escapeHtml(shot.promptText || "当前未找到逐镜 prompt。")}</pre>
    </article>
  `;
}

function renderStoryboardHtml({ slug, storyboard, tasks }) {
  const taskSummaryByShot = summarizeTasksByShot(tasks);
  const taskRollup = Array.from(taskSummaryByShot.values()).reduce(
    (summary, entry) => {
      summary.shotsWithTasks += 1;
      if (entry.latestTask.status === "queued") summary.queued += 1;
      else if (entry.latestTask.status === "running") summary.running += 1;
      else if (entry.latestTask.status === "succeeded") summary.succeeded += 1;
      else summary.failed += 1;
      return summary;
    },
    { shotsWithTasks: 0, queued: 0, running: 0, succeeded: 0, failed: 0 },
  );
  const providers = listProviderStatuses();
  const allShotIds = flattenShots(storyboard).map((shot) => shot.shotNo).sort();

  const warningParts = [];
  if (storyboard.warnings.unresolvedAliases.length) warningParts.push(`<p>未解析别名：${escapeHtml(storyboard.warnings.unresolvedAliases.join(" / "))}</p>`);
  if (storyboard.warnings.shotsWithoutBindings.length) warningParts.push(`<p>未绑定资产镜头：${escapeHtml(storyboard.warnings.shotsWithoutBindings.join(", "))}</p>`);
  if (storyboard.warnings.shotsWithoutPrompts.length) warningParts.push(`<p>未匹配逐镜 prompt：${escapeHtml(storyboard.warnings.shotsWithoutPrompts.join(", "))}</p>`);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(slug)} storyboard 静态预览</title>
  <style>${baseStyles()}</style>
</head>
<body>
  <main>
    <section class="hero">
      <p class="eyebrow">Storyboard Preview</p>
      <h1>${escapeHtml(slug)} storyboard</h1>
      <p>这里直接根据 storyboard JSON 渲染静态页面，结构尽量贴近当前 Next storyboard 页，方便看信息堆叠、卡片密度和资产缩略图占比。</p>
      <div class="chip-row">
        <span class="chip">镜头 ${escapeHtml(storyboard.summary.totalShots)}</span>
        <span class="chip">场次 ${escapeHtml(storyboard.summary.totalScenes)}</span>
        <span class="chip">绑定 ${escapeHtml(storyboard.summary.shotsWithBindings)}</span>
        <span class="chip">Prompt ${escapeHtml(storyboard.summary.shotsWithPrompts)}</span>
        <span class="chip">图像资产 ${escapeHtml(storyboard.summary.visualAssetsGenerated)}/${escapeHtml(storyboard.summary.visualAssetsTotal)}</span>
        <span class="chip">任务镜头 ${escapeHtml(taskRollup.shotsWithTasks)}</span>
        <span class="chip">执行中 ${escapeHtml(taskRollup.running)}</span>
        <span class="chip">失败 ${escapeHtml(taskRollup.failed)}</span>
      </div>
      <p class="mono">生成时间：${escapeHtml(formatDateTime(storyboard.generatedAt))}</p>
    </section>

    ${warningParts.length ? `<section class="card stack" style="margin-top: 24px;"><h2>当前告警</h2>${warningParts.join("")}</section>` : ""}

    ${renderTaskPanelSnapshot({ tasks, allShotIds, providers })}

    <section class="storyboard-scene-list" style="margin-top: 24px;">
      ${storyboard.scenes
        .map(
          (scene) => `
            <article class="card stack">
              <div style="display: flex; justify-content: space-between; gap: 12px; align-items: center;">
                <h2 style="margin-bottom: 0;">${escapeHtml(scene.sceneNo)}</h2>
                <span class="chip chip--muted">${escapeHtml(scene.shots.length)} shots</span>
              </div>
              <div class="prompt-workspace storyboard-shot-grid">
                ${scene.shots.map((shot) => renderStoryboardShot(slug, shot, taskSummaryByShot.get(shot.shotNo))).join("")}
              </div>
            </article>
          `,
        )
        .join("")}
    </section>

    <div class="preview-nav">
      <a class="preview-nav__link" href="./index.html">返回预览入口</a>
      <a class="preview-nav__link" href="./project.html">打开项目详情预览</a>
      <a class="preview-nav__link" href="../storyboard/${escapeHtml(slug)}.storyboard.html">打开原 storyboard HTML</a>
    </div>
  </main>
</body>
</html>`;
}

function renderIndexHtml({ slug, storyboard, tasks }) {
  const taskSummary = summarizeTasks(tasks);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(slug)} 静态预览入口</title>
  <style>${baseStyles()}</style>
</head>
<body>
  <main>
    <section class="hero hero--canvas">
      <p class="eyebrow">Static Preview Entry</p>
      <h1>${escapeHtml(slugToTitle(slug))}</h1>
      <p>这套静态预览专门用于绕过当前 Windows 上 Next 启动挂起的问题，直接确认项目详情页和 storyboard 页的版式、信息顺序与内容完整度。</p>
      <div class="chip-row">
        <span class="chip">镜头 ${escapeHtml(storyboard.summary.totalShots)}</span>
        <span class="chip">场次 ${escapeHtml(storyboard.summary.totalScenes)}</span>
        <span class="chip">Prompt ${escapeHtml(storyboard.summary.shotsWithPrompts)}</span>
        <span class="chip">任务 ${escapeHtml(taskSummary.total)}</span>
      </div>
    </section>

    <section class="index-grid">
      <article class="index-card">
        <p class="eyebrow">Project</p>
        <h2>项目详情预览</h2>
        <p>对应 Next 项目页的三栏制作台布局，包含总览、镜头与 prompt 预览、资产与任务摘要。</p>
        <div class="chip-row">
          <span class="chip chip--ok">镜头 ${escapeHtml(storyboard.summary.totalShots)}</span>
          <span class="chip chip--muted">任务 ${escapeHtml(taskSummary.total)}</span>
        </div>
        <div class="workflow-node__actions">
          <a class="workflow-node__link workflow-node__link--primary" href="./project.html">打开项目详情</a>
        </div>
      </article>

      <article class="index-card">
        <p class="eyebrow">Storyboard</p>
        <h2>分镜页预览</h2>
        <p>对应 Next storyboard 页的场次卡片与逐镜资产卡片，保留图像缩略图、任务摘要和 prompt 预览。</p>
        <div class="chip-row">
          <span class="chip chip--ok">场次 ${escapeHtml(storyboard.summary.totalScenes)}</span>
          <span class="chip chip--muted">图像资产 ${escapeHtml(storyboard.summary.visualAssetsGenerated)}/${escapeHtml(storyboard.summary.visualAssetsTotal)}</span>
        </div>
        <div class="workflow-node__actions">
          <a class="workflow-node__link workflow-node__link--primary" href="./storyboard.html">打开 storyboard</a>
          <a class="workflow-node__link" href="../storyboard/${escapeHtml(slug)}.storyboard.html">打开原 storyboard HTML</a>
        </div>
      </article>

      <article class="index-card">
        <p class="eyebrow">Sources</p>
        <h2>数据来源</h2>
        <p>预览页直接读取现有 storyboard 产物与任务库，不依赖 Next 运行时。</p>
        <div class="source-list mono">
          <a href="../storyboard/${escapeHtml(slug)}.storyboard.json">storyboard JSON</a>
          <a href="../storyboard/${escapeHtml(slug)}.storyboard.html">原 storyboard HTML</a>
          <span>tasks from .app-data/ai-video-generator.sqlite</span>
        </div>
      </article>
    </section>
  </main>
</body>
</html>`;
}

function buildStaticPreview(projectSlug) {
  const rootPath = process.cwd();
  const storyboardPath = path.join(rootPath, "outputs", "projects", projectSlug, "storyboard", `${projectSlug}.storyboard.json`);
  if (!fs.existsSync(storyboardPath)) {
    throw new Error(`缺少 storyboard JSON: ${path.relative(rootPath, storyboardPath)}`);
  }

  const storyboard = readJson(storyboardPath);
  const tasks = loadTasks(rootPath, projectSlug);
  const providers = listProviderStatuses();
  const previewDir = path.join(rootPath, "outputs", "projects", projectSlug, "preview");

  ensureDir(previewDir);

  fs.writeFileSync(path.join(previewDir, "index.html"), renderIndexHtml({ slug: projectSlug, storyboard, tasks }), "utf8");
  fs.writeFileSync(path.join(previewDir, "project.html"), renderProjectHtml({ slug: projectSlug, storyboard, tasks, providers }), "utf8");
  fs.writeFileSync(path.join(previewDir, "storyboard.html"), renderStoryboardHtml({ slug: projectSlug, storyboard, tasks }), "utf8");

  return previewDir;
}

const projectSlug = process.argv[2] || DEFAULT_PROJECT_SLUG;
const previewDir = buildStaticPreview(projectSlug);

console.log(`Static preview generated at ${path.relative(process.cwd(), previewDir)}`);
