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
        const taskSummary = {
            total: taskPreview.length,
            queued: taskPreview.filter((task) => task.status === "queued").length,
            running: taskPreview.filter((task) => task.status === "running").length,
            succeeded: taskPreview.filter((task) => task.status === "succeeded").length,
            failed: taskPreview.filter((task) => task.status === "failed").length,
        };
        const resultTask =
            taskPreview.find((task) => task.outputManifestPath) ??
            taskPreview.find((task) => task.status === "succeeded") ??
            taskPreview[0] ??
            null;

        return (
            <main>
                <section className="hero hero--canvas">
                    <p className="eyebrow">Project Detail</p>
                    <h1>{slug}</h1>
                    <p>{result.summary.message}</p>
                    <div className="chip-row">
                        <span className="chip">镜头 {result.summary.shots}</span>
                        <span className="chip">绑定 {result.summary.bindings}</span>
                        <span className="chip">生成项 {result.summary.generationItems}</span>
                        <span className="chip">任务 {taskSummary.total}</span>
                    </div>
                    <div className="hero-canvas-meta">
                        <div className="hero-canvas-meta__panel">
                            <span className="hero-canvas-meta__label">当前工作流</span>
                            <strong>剧本 → 分镜 → 资产 → 视频</strong>
                            <p className="mono">这个项目页现在应该是制作台，左侧看剧本意图，中部看分镜与 prompt，右侧看资产与输出。</p>
                        </div>
                        <div className="hero-canvas-meta__panel">
                            <span className="hero-canvas-meta__label">快速入口</span>
                            <strong>进入制作画布</strong>
                            <div className="workflow-node__actions">
                                <Link className="workflow-node__link workflow-node__link--primary" href={`/projects/${slug}/storyboard`}>
                                    打开 storyboard
                                </Link>
                                <Link className="workflow-node__link" href={`/projects/${slug}/prompts`}>
                                    打开 prompts
                                </Link>
                                {resultTask ? (
                                    <Link className="workflow-node__link" href={`/projects/${slug}/tasks/${resultTask.id}`}>
                                        打开结果页
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <p className="mono">
                        <Link href="/">返回首页</Link>
                    </p>
                </section>

                <section className="project-studio" aria-label="项目制作画布">
                    <div className="project-studio__grid" />
                    <div className="project-studio__track" />

                    <article className="project-studio__column project-studio__column--overview stack">
                        <div className="stack" style={{ gap: 8 }}>
                            <p className="eyebrow">故事输入</p>
                            <h2>项目总览</h2>
                            <p>这里承接剧本输入后的项目层信息：当前镜头规模、告警、以及进入分镜画布前的总体状态。</p>
                        </div>

                        <div className="project-kpi-grid">
                            <div className="project-kpi">
                                <span>镜头</span>
                                <strong>{result.summary.shots}</strong>
                            </div>
                            <div className="project-kpi">
                                <span>绑定</span>
                                <strong>{result.summary.bindings}</strong>
                            </div>
                            <div className="project-kpi">
                                <span>进行中</span>
                                <strong>{taskSummary.running}</strong>
                            </div>
                            <div className="project-kpi">
                                <span>失败</span>
                                <strong>{taskSummary.failed}</strong>
                            </div>
                        </div>

                        <div className="stack" style={{ gap: 10 }}>
                            <p className="eyebrow">工作流跳转</p>
                            <div className="project-link-list">
                                <Link className="workflow-node__link workflow-node__link--primary" href={`/projects/${slug}/storyboard`}>
                                    进入分镜台
                                </Link>
                                <Link className="workflow-node__link" href={`/projects/${slug}/prompts`}>
                                    进入 prompt 台
                                </Link>
                                {resultTask ? (
                                    <Link className="workflow-node__link" href={`/projects/${slug}/tasks/${resultTask.id}`}>
                                        查看当前结果页
                                    </Link>
                                ) : null}
                            </div>
                        </div>

                        {result.warnings.length > 0 ? (
                            <div className="project-callout stack">
                                <p className="eyebrow">导入警告</p>
                                {result.warnings.map((warning) => (
                                    <div className="endpoint" key={`${warning.code}-${warning.sourcePath ?? "none"}`}>
                                        <strong>{warning.code}</strong>
                                        <span>{warning.message}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="project-callout stack">
                                <p className="eyebrow">导入状态</p>
                                <div className="endpoint">
                                    <strong>READY</strong>
                                    <span>当前项目没有导入告警，可以直接往分镜、资产和视频任务继续推进。</span>
                                </div>
                            </div>
                        )}
                    </article>

                    <article className="project-studio__column project-studio__column--storyboard stack">
                        <div className="stack" style={{ gap: 8 }}>
                            <p className="eyebrow">分镜中枢</p>
                            <h2>镜头与 Prompt</h2>
                            <p>这里应该是制作画布的中心区域，先看镜头拆解，再看每个镜头如何被组装成 prompt。</p>
                        </div>

                        <div className="project-mini-list">
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
                        </div>

                        <div className="stack" style={{ gap: 10 }}>
                            <p className="eyebrow">Prompt 预览</p>
                            {promptPreview.map((bundle) => (
                                <div className="endpoint" key={bundle.shotId}>
                                    <strong>{bundle.title}</strong>
                                    <span>{bundle.summary}</span>
                                    <span>参考图：{bundle.imageBindings.join(" / ") || "无"}</span>
                                    <pre className="prompt-preview">{bundle.promptText}</pre>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="project-studio__column project-studio__column--assets stack">
                        <div className="stack" style={{ gap: 8 }}>
                            <p className="eyebrow">资产与输出</p>
                            <h2>参考图与任务状态</h2>
                            <p>右侧收束资产绑定、任务状态和结果入口，这样从分镜过渡到视频输出是连续的。</p>
                        </div>

                        <div className="project-mini-list">
                            {bindingPreview.map((binding) => (
                                <div className="endpoint" key={binding.shotNo}>
                                    <strong>Shot {binding.shotNo}</strong>
                                    <span>{binding.assets.join(" / ") || "无"}</span>
                                </div>
                            ))}
                        </div>

                        <div className="project-kpi-grid">
                            <div className="project-kpi">
                                <span>待排队</span>
                                <strong>{taskSummary.queued}</strong>
                            </div>
                            <div className="project-kpi">
                                <span>执行中</span>
                                <strong>{taskSummary.running}</strong>
                            </div>
                            <div className="project-kpi">
                                <span>完成</span>
                                <strong>{taskSummary.succeeded}</strong>
                            </div>
                            <div className="project-kpi">
                                <span>失败</span>
                                <strong>{taskSummary.failed}</strong>
                            </div>
                        </div>

                        <div className="project-link-list">
                            <Link className="workflow-node__link" href={`/projects/${slug}/storyboard`}>
                                打开 storyboard 页面
                            </Link>
                            <Link className="workflow-node__link" href={`/projects/${slug}/prompts`}>
                                打开 prompts 页面
                            </Link>
                            {resultTask ? (
                                <Link className="workflow-node__link workflow-node__link--primary" href={`/projects/${slug}/tasks/${resultTask.id}`}>
                                    进入结果验收页
                                </Link>
                            ) : null}
                        </div>
                    </article>
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
