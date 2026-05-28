import Link from "next/link";

import { TaskQueuePanel } from "@/components/task-queue-panel";
import { listVideoProviders } from "@/server/providers/video/registry";
import { loadProjectStoryboard } from "@/server/storyboard/loader";
import { listProjectTasks } from "@/server/tasks/task-queue";

type StoryboardPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function buildAssetImageUrl(slug: string, fileName: string) {
  return `/api/projects/${slug}/assets/${encodeURIComponent(fileName)}`;
}

function statusClass(status: string) {
  if (status === "ready") return "chip chip--ok";
  if (status === "partial") return "chip chip--warn";
  return "chip chip--muted";
}

function taskStatusClass(status: "queued" | "running" | "succeeded" | "failed") {
  if (status === "succeeded") return "chip chip--ok";
  if (status === "failed") return "chip chip--warn";
  if (status === "running") return "chip chip--warn";
  return "chip chip--muted";
}

function taskStatusLabel(status: "queued" | "running" | "succeeded" | "failed") {
  if (status === "queued") return "待排队";
  if (status === "running") return "执行中";
  if (status === "succeeded") return "已完成";
  return "失败";
}

function assetStateLabel(fileExists: boolean, referenceOnly: boolean) {
  if (referenceOnly) return "参考资产";
  if (fileExists) return "图片已就绪";
  return "缺少图片文件";
}

export default async function ProjectStoryboardPage({ params }: StoryboardPageProps) {
  const { slug } = await params;
  const storyboard = await loadProjectStoryboard(process.cwd(), slug);
  const tasks = await listProjectTasks(process.cwd(), slug).catch(() => []);
  const providers = listVideoProviders();

  const taskSummaryByShot = new Map(
    tasks.reduce((entries, task) => {
      const current = entries.get(task.shotId);

      if (!current) {
        entries.set(task.shotId, {
          latestTask: task,
          total: 1,
          succeeded: task.status === "succeeded" ? 1 : 0,
          failed: task.status === "failed" ? 1 : 0,
        });
        return entries;
      }

      const latestTask = task.updatedAt > current.latestTask.updatedAt ? task : current.latestTask;
      entries.set(task.shotId, {
        latestTask,
        total: current.total + 1,
        succeeded: current.succeeded + (task.status === "succeeded" ? 1 : 0),
        failed: current.failed + (task.status === "failed" ? 1 : 0),
      });

      return entries;
    }, new Map<string, { latestTask: (typeof tasks)[number]; total: number; succeeded: number; failed: number }>())
  );

  const taskRollup = Array.from(taskSummaryByShot.values()).reduce(
    (summary, entry) => {
      summary.shotsWithTasks += 1;

      if (entry.latestTask.status === "queued") {
        summary.queued += 1;
      } else if (entry.latestTask.status === "running") {
        summary.running += 1;
      } else if (entry.latestTask.status === "succeeded") {
        summary.succeeded += 1;
      } else {
        summary.failed += 1;
      }

      return summary;
    },
    { shotsWithTasks: 0, queued: 0, running: 0, succeeded: 0, failed: 0 },
  );
  const allShotIds = storyboard?.scenes.flatMap((scene) => scene.shots.map((shot) => shot.shotNo)).sort() ?? [];

  if (!storyboard) {
    return (
      <main>
        <section className="hero">
          <p className="eyebrow">Storyboard</p>
          <h1>{slug} storyboard</h1>
          <p>当前还没有可供页面读取的故事板结果。先运行 CLI 生成器，再回到这个页面查看。</p>
          <div className="chip-row">
            <span className="chip">npm run build:storyboard</span>
            <span className="chip">node screenplay/build_storyboard.js {slug}</span>
          </div>
          <p className="mono">
            <Link href={`/projects/${slug}`}>返回项目详情</Link>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Storyboard</p>
        <h1>{slug} storyboard</h1>
        <p>这里把剧本分镜、资产绑定、逐镜视频提示词和后续视频/剪辑骨架收在同一个工作页里。当前页面直接读取 CLI 生成的 storyboard JSON。</p>
        <div className="chip-row">
          <span className="chip">镜头 {storyboard.summary.totalShots}</span>
          <span className="chip">场次 {storyboard.summary.totalScenes}</span>
          <span className="chip">绑定 {storyboard.summary.shotsWithBindings}</span>
          <span className="chip">Prompt {storyboard.summary.shotsWithPrompts}</span>
          <span className="chip">图像资产 {storyboard.summary.visualAssetsGenerated}/{storyboard.summary.visualAssetsTotal}</span>
          <span className="chip">任务镜头 {taskRollup.shotsWithTasks}</span>
          <span className="chip">执行中 {taskRollup.running}</span>
          <span className="chip">失败 {taskRollup.failed}</span>
        </div>
        <p className="mono">
          <Link href={`/projects/${slug}`}>返回项目详情</Link>
          {" · "}
          <Link href={`/api/projects/${slug}/tasks`}>打开 tasks API</Link>
          {" · "}
          <Link href={`/api/projects/${slug}/storyboard`}>打开 storyboard API</Link>
        </p>
      </section>

      {storyboard.warnings.unresolvedAliases.length > 0 || storyboard.warnings.shotsWithoutBindings.length > 0 || storyboard.warnings.shotsWithoutPrompts.length > 0 ? (
        <section className="card stack" style={{ marginTop: 24 }}>
          <h2>当前告警</h2>
          {storyboard.warnings.unresolvedAliases.length > 0 ? <p>未解析别名：{storyboard.warnings.unresolvedAliases.join(" / ")}</p> : null}
          {storyboard.warnings.shotsWithoutBindings.length > 0 ? <p>未绑定资产镜头：{storyboard.warnings.shotsWithoutBindings.join(", ")}</p> : null}
          {storyboard.warnings.shotsWithoutPrompts.length > 0 ? <p>未匹配逐镜 prompt：{storyboard.warnings.shotsWithoutPrompts.join(", ")}</p> : null}
        </section>
      ) : null}

      <TaskQueuePanel slug={slug} initialTasks={tasks} allShotIds={allShotIds} providers={providers} />

      <section className="storyboard-scene-list" style={{ marginTop: 24 }}>
        {storyboard.scenes.map((scene) => (
          <article className="card stack" key={scene.sceneNo}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <h2 style={{ marginBottom: 0 }}>{scene.sceneNo}</h2>
              <span className="chip chip--muted">{scene.shots.length} shots</span>
            </div>
            <div className="prompt-workspace storyboard-shot-grid">
              {scene.shots.map((shot) => {
                const taskSummary = taskSummaryByShot.get(shot.shotNo);
                const visualAssets = shot.assets.filter((asset) => !asset.referenceOnly).slice(0, 4);

                return (
                  <article className="prompt-card" key={shot.shotNo}>
                    <div className="prompt-card__header">
                      <div className="stack" style={{ gap: 6 }}>
                        <strong>
                          Shot {shot.shotNo} · {shot.promptTitle || shot.visualAction}
                        </strong>
                        <span>
                          {shot.framing} / {shot.cameraMove} / {shot.duration}
                        </span>
                      </div>
                      <span className="chip chip--muted">{shot.sceneNo}</span>
                    </div>

                    <p>{shot.visualAction}</p>
                    <p className="mono">声音：{shot.dialogueOrSound || "无"}</p>

                    <div className="chip-row">
                      {taskSummary ? (
                        <>
                          <span className={taskStatusClass(taskSummary.latestTask.status)}>
                            任务 {taskStatusLabel(taskSummary.latestTask.status)} {taskSummary.latestTask.progress}%
                          </span>
                          <span className="chip chip--muted">共 {taskSummary.total} 条</span>
                          {taskSummary.failed > 0 ? <span className="chip chip--warn">失败 {taskSummary.failed}</span> : null}
                          {taskSummary.succeeded > 0 ? <span className="chip chip--ok">完成 {taskSummary.succeeded}</span> : null}
                        </>
                      ) : (
                        <span className="chip chip--muted">未提交任务</span>
                      )}
                    </div>

                    {taskSummary ? (
                      <p className="mono">
                        <Link href={`/projects/${slug}/tasks/${taskSummary.latestTask.id}`}>打开最新任务</Link>
                        {taskSummary.latestTask.providerTaskId ? ` · provider ${taskSummary.latestTask.providerTaskId}` : " · 尚未绑定 providerTaskId"}
                      </p>
                    ) : null}

                    <div className="chip-row">
                      <span className={statusClass(shot.stages.storyboard)}>分镜 {shot.stages.storyboard}</span>
                      <span className={statusClass(shot.stages.assets)}>资产 {shot.stages.assets}</span>
                      <span className={statusClass(shot.stages.prompt)}>提示词 {shot.stages.prompt}</span>
                      <span className={statusClass(shot.stages.video)}>视频 {shot.stages.video}</span>
                      <span className={statusClass(shot.stages.edit)}>剪辑 {shot.stages.edit}</span>
                    </div>

                    <div className="storyboard-asset-grid">
                      {visualAssets.length > 0 ? (
                        visualAssets.map((asset) => (
                          asset.fileExists ? (
                            <a
                              className="storyboard-asset-thumb"
                              href={buildAssetImageUrl(slug, asset.fileName)}
                              key={`${shot.shotNo}-${asset.alias}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img alt={asset.alias} className="storyboard-asset-thumb__image" src={buildAssetImageUrl(slug, asset.fileName)} />
                              <span className="storyboard-asset-thumb__label">{asset.alias}</span>
                            </a>
                          ) : (
                            <div className="storyboard-asset-thumb storyboard-asset-thumb--missing" key={`${shot.shotNo}-${asset.alias}`}>
                              <strong>{asset.alias}</strong>
                              <span>{asset.fileName || "未定义文件"}</span>
                            </div>
                          )
                        ))
                      ) : (
                        <div className="storyboard-asset-thumb storyboard-asset-thumb--empty">暂无图像资产</div>
                      )}
                    </div>

                    <div className="chip-row">
                      {shot.assets.length > 0 ? (
                        shot.assets.map((asset) => (
                          <span className={asset.referenceOnly ? "chip chip--muted" : asset.fileExists ? "chip chip--ok" : "chip chip--warn"} key={`${shot.shotNo}-${asset.alias}`}>
                            {asset.alias}
                          </span>
                        ))
                      ) : (
                        <span className="chip chip--muted">未绑定资产</span>
                      )}
                    </div>

                    {shot.assets.length > 0 ? (
                      <div className="storyboard-asset-meta-list">
                        {shot.assets.map((asset) => (
                          <article className="storyboard-asset-meta-item" key={`${shot.shotNo}-${asset.alias}-meta`}>
                            <div className="storyboard-asset-meta-item__header">
                              <strong>{asset.alias}</strong>
                              <span className={asset.referenceOnly ? "chip chip--muted" : asset.fileExists ? "chip chip--ok" : "chip chip--warn"}>
                                {assetStateLabel(asset.fileExists, asset.referenceOnly)}
                              </span>
                            </div>
                            <p className="mono">文件：{asset.fileName || "未定义"}</p>
                            <p className="mono">说明：{asset.description || "无"}</p>
                            <p className="mono">来源别名：{asset.sourceAliases?.join(" / ") || asset.alias}</p>
                          </article>
                        ))}
                      </div>
                    ) : null}

                    <details>
                      <summary>查看完整 prompt</summary>
                      <p className="mono" style={{ marginTop: 10 }}>来源：{shot.promptSourcePath || "未匹配到逐镜 prompt 文件"}</p>
                      <pre className="prompt-preview">{shot.promptText || "当前未找到逐镜 prompt。"}</pre>
                    </details>
                  </article>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
