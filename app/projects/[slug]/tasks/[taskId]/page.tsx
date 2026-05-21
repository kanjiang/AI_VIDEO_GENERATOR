import Link from "next/link";
import { notFound } from "next/navigation";

import { readTaskResultManifest } from "@/server/storage/task-results";
import { getProjectTask } from "@/server/tasks/task-queue";

type ProjectTaskResultPageProps = {
  params: Promise<{
    slug: string;
    taskId: string;
  }>;
};

export default async function ProjectTaskResultPage({ params }: ProjectTaskResultPageProps) {
  const { slug, taskId } = await params;
  const task = getProjectTask(slug, taskId);

  if (!task) {
    notFound();
  }

  const manifest = task.outputManifestPath ? await readTaskResultManifest(task.outputManifestPath).catch(() => null) : null;

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Task Result</p>
        <h1>{task.id}</h1>
        <p>查看单条任务的当前状态、本地 manifest、回传链接以及 provider 返回的原始结果载荷。</p>
        <div className="chip-row">
          <span className="chip">Shot {task.shotId}</span>
          <span className="chip">状态 {task.status}</span>
          <span className="chip">进度 {task.progress}%</span>
          <span className="chip">Provider {task.providerName}</span>
        </div>
        <p className="mono">
          <Link href={`/projects/${slug}`}>返回项目详情</Link>
        </p>
      </section>

      <section className="grid" style={{ marginTop: 24 }}>
        <article className="card stack">
          <h2>任务概览</h2>
          <p className="mono">远端任务 ID: {task.providerTaskId ?? "未绑定"}</p>
          <p className="mono">本地 manifest: {task.outputManifestPath ?? "尚未落盘"}</p>
          <p className="mono">结果链接数: {task.resultUrls.length}</p>
          <p className="mono">重试次数: {task.retryCount}</p>
          <p className="mono">最近错误: {task.lastError ?? "无"}</p>
        </article>

        <article className="card stack">
          <h2>结果链接</h2>
          {task.resultUrls.length > 0 ? (
            task.resultUrls.map((url) => (
              <a className="mono task-result-link" href={url} key={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            ))
          ) : (
            <p className="mono">当前还没有 provider 回传的结果链接。</p>
          )}
        </article>
      </section>

      <section className="grid" style={{ marginTop: 24 }}>
        <article className="card stack">
          <h2>Manifest 预览</h2>
          {manifest ? <pre className="prompt-preview">{JSON.stringify(manifest, null, 2)}</pre> : <p className="mono">当前没有可读取的本地 manifest。</p>}
        </article>

        <article className="card stack">
          <h2>Raw Payload</h2>
          {manifest ? <pre className="prompt-preview">{JSON.stringify(manifest.rawPayload, null, 2)}</pre> : <p className="mono">当前没有 provider 原始载荷。</p>}
        </article>
      </section>
    </main>
  );
}
