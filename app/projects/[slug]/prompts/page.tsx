import Link from "next/link";
import { notFound } from "next/navigation";

import { previewHttpGenericSubmitBody } from "@/server/providers/video/http-generic";
import { assembleProjectPrompts } from "@/server/prompts/assembler";
import { buildProjectSubmitPayloadPreviews } from "@/server/tasks/task-queue";

type ProjectPromptsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPromptsPage({ params }: ProjectPromptsPageProps) {
  const { slug } = await params;

  try {
    const prompts = await assembleProjectPrompts(process.cwd(), slug);
    const submitPayloadPreviews = await buildProjectSubmitPayloadPreviews(
      process.cwd(),
      slug,
      prompts.bundles.map((bundle) => bundle.shotId),
    );
    const previewByShotId = new Map(
      submitPayloadPreviews.map((item) => [
        item.shotId,
        {
          taskId: item.taskId,
          rawPayload: item.payload,
          mappedPreview: previewHttpGenericSubmitBody({
            taskId: item.taskId,
            projectSlug: slug,
            shotId: item.shotId,
            payload: item.payload,
          }),
        },
      ]),
    );
    const firstPreview = submitPayloadPreviews[0]
      ? previewHttpGenericSubmitBody({
          taskId: submitPayloadPreviews[0].taskId,
          projectSlug: slug,
          shotId: submitPayloadPreviews[0].shotId,
          payload: submitPayloadPreviews[0].payload,
        })
      : null;

    return (
      <main>
        <section className="hero">
          <p className="eyebrow">Prompt Workspace</p>
          <h1>{slug} prompts</h1>
          <p>这里展示当前项目所有已组装的 shot 级 prompt，可直接用于检查、复制和后续映射到具体 provider 请求体。</p>
          <div className="chip-row">
            <span className="chip">Prompt 数 {prompts.bundles.length}</span>
            <span className="chip">风格 {prompts.providerStyle}</span>
            {firstPreview ? <span className="chip">映射模式 {firstPreview.mode}</span> : null}
            {firstPreview?.templateConfigured ? <span className="chip">模板已配置</span> : <span className="chip chip--muted">模板未配置</span>}
          </div>
          <p className="mono">
            <Link href={`/projects/${slug}`}>返回项目详情</Link>
          </p>
        </section>

        <section className="grid" style={{ marginTop: 24 }}>
          <article className="card stack">
            <h2>HTTP Generic 映射状态</h2>
            <p className="mono">提交地址：{firstPreview?.submitUrl ?? "未配置 VIDEO_HTTP_GENERIC_SUBMIT_URL"}</p>
            <p className="mono">当前模式：{firstPreview?.mode ?? "raw"}</p>
            <p className="mono">模板配置：{firstPreview?.templateConfigured ? "已配置 VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE" : "未配置"}</p>
          </article>
          <article className="card stack">
            <h2>验收说明</h2>
            <p className="mono">每个 Shot 卡片里都带了可折叠的 provider 请求预览。</p>
            <p className="mono">Raw payload = 当前系统内部提交结构；Mapped body = 按当前 http-generic 环境变量映射后的真实外发请求体。</p>
          </article>
        </section>

        <section className="card stack" style={{ marginTop: 24 }}>
          <h2>全部 Shot Prompts</h2>
          <div className="prompt-workspace">
            {prompts.bundles.map((bundle) => (
              <article className="prompt-card" key={bundle.shotId}>
                <div className="prompt-card__header">
                  <div className="stack" style={{ gap: 6 }}>
                    <strong>{bundle.title}</strong>
                    <span>
                      {bundle.summary} · {bundle.duration}
                    </span>
                  </div>
                  <span className="chip">{bundle.sceneNo}</span>
                </div>
                <p className="mono">参考图：{bundle.imageBindings.join(" / ") || "无"}</p>
                <pre className="prompt-preview">{bundle.promptText}</pre>
                {previewByShotId.get(bundle.shotId) ? (
                  <details className="preview-details">
                    <summary className="preview-details__summary">查看 provider 请求预览</summary>
                    <div className="preview-grid">
                      <div className="stack" style={{ gap: 8 }}>
                        <strong>Raw payload</strong>
                        <p className="mono">任务 ID：{previewByShotId.get(bundle.shotId)?.taskId}</p>
                        <pre className="prompt-preview">{JSON.stringify(previewByShotId.get(bundle.shotId)?.rawPayload, null, 2)}</pre>
                      </div>
                      <div className="stack" style={{ gap: 8 }}>
                        <strong>Mapped body</strong>
                        {previewByShotId.get(bundle.shotId)?.mappedPreview.error ? (
                          <p className="task-error-note">{previewByShotId.get(bundle.shotId)?.mappedPreview.error}</p>
                        ) : (
                          <pre className="prompt-preview">{JSON.stringify(previewByShotId.get(bundle.shotId)?.mappedPreview.requestBody, null, 2)}</pre>
                        )}
                      </div>
                    </div>
                  </details>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
