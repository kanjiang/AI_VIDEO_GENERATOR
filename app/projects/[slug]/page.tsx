import Link from "next/link";
import { notFound } from "next/navigation";

import { ProviderConfigPanel } from "@/components/provider-config-panel";
import { TaskQueuePanel } from "@/components/task-queue-panel";
import { importProjectFromWorkspace } from "@/server/importers/project";
import { assembleProjectPrompts } from "@/server/prompts/assembler";
import { listVideoProviders } from "@/server/providers/video/registry";
import { listProjectTasks } from "@/server/tasks/task-queue";

type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    try {
        const result = await importProjectFromWorkspace(process.cwd(), slug);
        const shotPreview = result.data.shots.slice(0, 6);
        const bindingPreview = result.data.bindings.slice(0, 6);
        const taskPreview = await listProjectTasks(process.cwd(), slug);
        const promptPreview = (await assembleProjectPrompts(process.cwd(), slug)).bundles.slice(0, 3);
        const allShotIds = Array.from(new Set(result.data.generationItems.map((item) => item.shotNo))).sort();
        const providers = listVideoProviders();

        return (
            <main>
                <section className="hero">
                    <p className="eyebrow">Project Detail</p>
                    <h1>{slug}</h1>
                    <p>{result.summary.message}</p>
                    <div className="chip-row">
                        <span className="chip">镜头 {result.summary.shots}</span>
                        <span className="chip">绑定 {result.summary.bindings}</span>
                        <span className="chip">生成项 {result.summary.generationItems}</span>
                    </div>
                    <p className="mono">
                        <Link href="/">返回首页</Link>
                    </p>
                </section>

                <section className="grid" style={{ marginTop: 24 }}>
                    <article className="card stack">
                        <h2>镜头预览</h2>
                        {shotPreview.map((shot) => (
                            <div className="endpoint" key={shot.shotNo}>
                                <strong>
                                    Shot {shot.shotNo} · {shot.sceneNo}
                                </strong>
                                <span>
                                    {shot.framing} / {shot.cameraMove} / {shot.duration}
                                </span>
                                <span>{shot.visualAction}</span>
                            </div>
                        ))}
                    </article>

                    <article className="card stack">
                        <h2>参考图绑定预览</h2>
                        {bindingPreview.map((binding) => (
                            <div className="endpoint" key={binding.shotNo}>
                                <strong>Shot {binding.shotNo}</strong>
                                <span>{binding.assets.join(" / ") || "无"}</span>
                            </div>
                        ))}
                    </article>
                </section>

                {result.warnings.length > 0 ? (
                    <section className="card stack" style={{ marginTop: 24 }}>
                        <h2>导入警告</h2>
                        {result.warnings.map((warning) => (
                            <div className="endpoint" key={`${warning.code}-${warning.sourcePath ?? "none"}`}>
                                <strong>{warning.code}</strong>
                                <span>{warning.message}</span>
                            </div>
                        ))}
                    </section>
                ) : null}

                <section className="card stack" style={{ marginTop: 24 }}>
                    <h2>Prompt 预览</h2>
                    {promptPreview.map((bundle) => (
                        <div className="endpoint" key={bundle.shotId}>
                            <strong>{bundle.title}</strong>
                            <span>{bundle.summary}</span>
                            <span>参考图：{bundle.imageBindings.join(" / ") || "无"}</span>
                            <pre className="prompt-preview">{bundle.promptText}</pre>
                        </div>
                    ))}
                    <p className="mono">
                        <Link href={`/projects/${slug}/prompts`}>打开 prompts 专用页面</Link>
                    </p>
                    <p className="mono">API: /api/projects/{slug}/prompts</p>
                </section>

                <TaskQueuePanel slug={slug} initialTasks={taskPreview} allShotIds={allShotIds} providers={providers} />

                <ProviderConfigPanel
                    title="Provider 配置状态"
                    description="任务面板可以直接切换 provider，这里显示每个 provider 当前是否真的可用，以及还缺哪些环境变量。"
                />
            </main>
        );
    } catch {
        notFound();
    }
}
