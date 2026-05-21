"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

type TaskItem = {
    id: string;
    shotId: string;
    providerName: string;
    providerTaskId: string | null;
    resultUrls: string[];
    outputManifestPath: string | null;
    status: "queued" | "running" | "succeeded" | "failed";
    progress: number;
    retryCount: number;
    lastError: string | null;
};

type TaskQueuePanelProps = {
    slug: string;
    initialTasks: TaskItem[];
    allShotIds: string[];
    providers: Array<{
        name: string;
        label: string;
        description: string;
        isAvailable: boolean;
    }>;
};

type TaskFilter = "all" | "active" | "failed" | "completed";

const STATUS_LABEL: Record<TaskItem["status"], string> = {
    queued: "待排队",
    running: "执行中",
    succeeded: "已完成",
    failed: "失败",
};

const STATUS_TONE: Record<TaskItem["status"], string> = {
    queued: "queued",
    running: "running",
    succeeded: "succeeded",
    failed: "failed",
};

async function parseJson(response: Response) {
    const payload = await response.json();

    if (!response.ok) {
        const message = payload?.error?.message ?? "请求失败";
        throw new Error(message);
    }

    return payload;
}

export function TaskQueuePanel({ slug, initialTasks, allShotIds, providers }: TaskQueuePanelProps) {
    const router = useRouter();
    const [tasks, setTasks] = useState(initialTasks);
    const [selectedShotIds, setSelectedShotIds] = useState<string[]>([]);
    const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");
    const [selectedProviderName, setSelectedProviderName] = useState(() => providers.find((provider) => provider.isAvailable)?.name ?? providers[0]?.name ?? "mock");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const providerLabelByName = useMemo(() => {
        return new Map(providers.map((provider) => [provider.name, provider.label]));
    }, [providers]);

    const selectedProvider = useMemo(() => {
        return providers.find((provider) => provider.name === selectedProviderName) ?? providers[0] ?? null;
    }, [providers, selectedProviderName]);

    const taskCountByShot = useMemo(() => {
        const countMap = new Map<string, number>();

        for (const task of tasks) {
            countMap.set(task.shotId, (countMap.get(task.shotId) ?? 0) + 1);
        }

        return countMap;
    }, [tasks]);

    const failedShotIds = useMemo(() => {
        return Array.from(new Set(tasks.filter((task) => task.status === "failed").map((task) => task.shotId))).sort();
    }, [tasks]);

    const submittedShotIds = useMemo(() => {
        return allShotIds.filter((shotId) => taskCountByShot.has(shotId));
    }, [allShotIds, taskCountByShot]);

    const unsubmittedShotIds = useMemo(() => {
        return allShotIds.filter((shotId) => !taskCountByShot.has(shotId));
    }, [allShotIds, taskCountByShot]);

    const summary = useMemo(
        () => ({
            total: tasks.length,
            totalShots: allShotIds.length,
            submittedShots: submittedShotIds.length,
            unsubmittedShots: unsubmittedShotIds.length,
            queued: tasks.filter((task) => task.status === "queued").length,
            running: tasks.filter((task) => task.status === "running").length,
            succeeded: tasks.filter((task) => task.status === "succeeded").length,
            failed: tasks.filter((task) => task.status === "failed").length,
        }),
        [allShotIds.length, submittedShotIds.length, tasks, unsubmittedShotIds.length],
    );

    const filteredTasks = useMemo(() => {
        if (taskFilter === "active") {
            return tasks.filter((task) => task.status === "queued" || task.status === "running");
        }

        if (taskFilter === "failed") {
            return tasks.filter((task) => task.status === "failed");
        }

        if (taskFilter === "completed") {
            return tasks.filter((task) => task.status === "succeeded");
        }

        return tasks;
    }, [taskFilter, tasks]);

    const syncableTasks = useMemo(() => {
        return tasks.filter((task) => task.providerTaskId && (task.status === "queued" || task.status === "running"));
    }, [tasks]);

    const refreshTasks = async () => {
        const payload = await parseJson(await fetch(`/api/projects/${slug}/tasks`, { cache: "no-store" }));
        setTasks(payload.items);
        router.refresh();
    };

    const requestTaskSync = async (taskId: string) => {
        const payload = await parseJson(
            await fetch(`/api/projects/${slug}/tasks/${taskId}/sync`, {
                method: "POST",
            }),
        );

        return payload.task as TaskItem;
    };

    const requestTaskResultFetch = async (taskId: string) => {
        const payload = await parseJson(
            await fetch(`/api/projects/${slug}/tasks/${taskId}/result`, {
                method: "POST",
            }),
        );

        return payload.task as TaskItem;
    };

    const toggleShot = (shotId: string) => {
        setSelectedShotIds((current) =>
            current.includes(shotId) ? current.filter((value) => value !== shotId) : [...current, shotId].sort(),
        );
    };

    const replaceSelection = (shotIds: string[]) => {
        setSelectedShotIds([...new Set(shotIds)].sort());
    };

    const submitTasks = () => {
        if (selectedShotIds.length === 0) {
            setFeedback("请先选择至少一个镜头再提交。 ");
            return;
        }

        startTransition(async () => {
            try {
                const payload = await parseJson(
                    await fetch(`/api/projects/${slug}/tasks/submit`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ shotIds: selectedShotIds, providerName: selectedProviderName }),
                    }),
                );

                setFeedback(`已通过 ${providerLabelByName.get(selectedProviderName) ?? selectedProviderName} 提交 ${payload.tasks.length} 条任务。`);
                setSelectedShotIds([]);
                await refreshTasks();
            } catch (error) {
                setFeedback(error instanceof Error ? error.message : "提交任务失败");
            }
        });
    };

    const updateTask = (taskId: string, input: { status: TaskItem["status"]; progress?: number; lastError?: string | null }) => {
        startTransition(async () => {
            try {
                const payload = await parseJson(
                    await fetch(`/api/projects/${slug}/tasks/${taskId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(input),
                    }),
                );

                setTasks((current) => current.map((task) => (task.id === payload.task.id ? payload.task : task)));
                setFeedback(`任务 ${taskId} 已更新为 ${payload.task.status}。`);
                router.refresh();
            } catch (error) {
                setFeedback(error instanceof Error ? error.message : "更新任务状态失败");
            }
        });
    };

    const retryTask = (taskId: string) => {
        startTransition(async () => {
            try {
                const payload = await parseJson(
                    await fetch(`/api/projects/${slug}/tasks/${taskId}/retry`, {
                        method: "POST",
                    }),
                );

                setTasks((current) => current.map((task) => (task.id === payload.task.id ? payload.task : task)));
                setFeedback(`任务 ${taskId} 已重试。`);
                router.refresh();
            } catch (error) {
                setFeedback(error instanceof Error ? error.message : "任务重试失败");
            }
        });
    };

    const syncRemoteTasks = () => {
        if (syncableTasks.length === 0) {
            setFeedback("当前没有可同步的远端任务。");
            return;
        }

        startTransition(async () => {
            const results = await Promise.allSettled(syncableTasks.map((task) => requestTaskSync(task.id)));
            const updatedTasks = new Map(results.filter((item): item is PromiseFulfilledResult<TaskItem> => item.status === "fulfilled").map((item) => [item.value.id, item.value]));
            const failureCount = results.length - updatedTasks.size;

            if (updatedTasks.size > 0) {
                setTasks((current) => current.map((task) => updatedTasks.get(task.id) ?? task));
                await refreshTasks();
            }

            if (failureCount > 0) {
                setFeedback(`已同步 ${updatedTasks.size} 条远端任务，${failureCount} 条同步失败。`);
                return;
            }

            setFeedback(`已同步 ${updatedTasks.size} 条远端任务。`);
        });
    };

    const fetchTaskResult = (taskId: string) => {
        startTransition(async () => {
            try {
                const task = await requestTaskResultFetch(taskId);
                setTasks((current) => current.map((item) => (item.id === task.id ? task : item)));
                setFeedback(`任务 ${taskId} 的结果已抓取并写入本地输出目录。`);
                router.refresh();
            } catch (error) {
                setFeedback(error instanceof Error ? error.message : "结果抓取失败");
            }
        });
    };

    return (
        <section className="card task-panel" style={{ marginTop: 24 }}>
            <div className="task-panel__header">
                <div className="stack" style={{ gap: 6 }}>
                    <h2>任务操作台</h2>
                    <p className="mono">把镜头提交、状态推进和失败重试收束到同一个工作区里。</p>
                </div>
                <div className="task-panel__toolbar">
                    <button type="button" className="action-button action-button--primary" onClick={submitTasks} disabled={isPending}>
                        提交所选镜头
                    </button>
                    <button type="button" className="action-button action-button--ghost" onClick={syncRemoteTasks} disabled={isPending || syncableTasks.length === 0}>
                        同步远端状态
                    </button>
                    <button
                        type="button"
                        className="action-button action-button--ghost"
                        onClick={() => {
                            startTransition(async () => {
                                try {
                                    await refreshTasks();
                                    setFeedback("任务列表已刷新。");
                                } catch (error) {
                                    setFeedback(error instanceof Error ? error.message : "刷新失败");
                                }
                            });
                        }}
                        disabled={isPending}
                    >
                        刷新任务
                    </button>
                </div>
            </div>

            <div className="task-summary-grid">
                <article className="task-summary-card">
                    <span className="task-summary-card__label">项目镜头</span>
                    <strong>{summary.totalShots}</strong>
                    <span className="task-summary-card__hint">从 generation list 读取到的全部可提交镜头</span>
                </article>
                <article className="task-summary-card">
                    <span className="task-summary-card__label">未提交镜头</span>
                    <strong>{summary.unsubmittedShots}</strong>
                    <span className="task-summary-card__hint">这些镜头还没有进入任务队列</span>
                </article>
                <article className="task-summary-card">
                    <span className="task-summary-card__label">已提交镜头</span>
                    <strong>{summary.submittedShots}</strong>
                    <span className="task-summary-card__hint">已经至少有一条任务记录的镜头</span>
                </article>
                <article className="task-summary-card">
                    <span className="task-summary-card__label">失败待处理</span>
                    <strong>{summary.failed}</strong>
                    <span className="task-summary-card__hint">优先处理失败镜头，再决定是否重试</span>
                </article>
            </div>

            <section className="task-selection-panel stack">
                <div className="task-selection-panel__meta">
                    <div>
                        <h3>批量提交工作台</h3>
                        <p className="mono">已选 {selectedShotIds.length} 个镜头。可以直接抓取未提交镜头，或把失败镜头重新纳入批量处理。</p>
                    </div>
                    <span className="task-selection-panel__badge">队列任务 {summary.total}</span>
                </div>

                <div className="provider-grid">
                    {providers.map((provider) => {
                        const selected = provider.name === selectedProviderName;
                        return (
                            <button
                                key={provider.name}
                                type="button"
                                className={selected ? "provider-card provider-card--selected" : "provider-card"}
                                onClick={() => provider.isAvailable && setSelectedProviderName(provider.name)}
                                disabled={!provider.isAvailable || isPending}
                                aria-pressed={selected}
                            >
                                <strong>{provider.label}</strong>
                                <span>{provider.description}</span>
                                <small>{provider.isAvailable ? "可直接提交" : "已注册，待启用"}</small>
                            </button>
                        );
                    })}
                </div>

                {selectedProvider ? <p className="mono">当前提交通道：{selectedProvider.label}</p> : null}

                <div className="task-batch-actions">
                    <button type="button" className="action-button action-button--ghost" onClick={() => replaceSelection(unsubmittedShotIds)} disabled={isPending}>
                        选择全部未提交
                    </button>
                    <button type="button" className="action-button action-button--ghost" onClick={() => replaceSelection(failedShotIds)} disabled={isPending}>
                        选择失败镜头
                    </button>
                    <button type="button" className="action-button action-button--ghost" onClick={() => replaceSelection(allShotIds)} disabled={isPending}>
                        选择全部镜头
                    </button>
                    <button type="button" className="action-button action-button--ghost" onClick={() => replaceSelection([])} disabled={isPending}>
                        清空选择
                    </button>
                </div>

                <div className="task-selection-groups">
                    <div className="stack" style={{ gap: 10 }}>
                        <div className="task-group-heading">
                            <h4>未提交</h4>
                            <span>{unsubmittedShotIds.length} 个镜头</span>
                        </div>
                        <div className="task-shot-grid">
                            {unsubmittedShotIds.map((shotId) => {
                                const selected = selectedShotIds.includes(shotId);
                                return (
                                    <button
                                        key={shotId}
                                        type="button"
                                        className={selected ? "task-shot-chip task-shot-chip--selected" : "task-shot-chip"}
                                        aria-pressed={selected}
                                        onClick={() => toggleShot(shotId)}
                                    >
                                        <span>Shot {shotId}</span>
                                        <small>{selected ? "准备提交" : "未进入队列"}</small>
                                    </button>
                                );
                            })}
                            {unsubmittedShotIds.length === 0 ? <p className="task-empty-state">当前所有镜头都至少有一条任务记录。</p> : null}
                        </div>
                    </div>

                    <div className="stack" style={{ gap: 10 }}>
                        <div className="task-group-heading">
                            <h4>已提交</h4>
                            <span>{submittedShotIds.length} 个镜头</span>
                        </div>
                        <div className="task-shot-grid">
                            {submittedShotIds.map((shotId) => {
                                const selected = selectedShotIds.includes(shotId);
                                const taskCount = taskCountByShot.get(shotId) ?? 0;
                                return (
                                    <button
                                        key={shotId}
                                        type="button"
                                        className={selected ? "task-shot-chip task-shot-chip--selected" : "task-shot-chip"}
                                        aria-pressed={selected}
                                        onClick={() => toggleShot(shotId)}
                                    >
                                        <span>Shot {shotId}</span>
                                        <small>{selected ? `已选中 · ${taskCount} 条任务` : `${taskCount} 条任务`}</small>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="task-list-toolbar">
                <div>
                    <h3>任务列表</h3>
                    <p className="mono">按状态快速筛选，优先处理运行中和失败项。</p>
                </div>
                <div className="task-filter-group">
                    <button
                        type="button"
                        className={taskFilter === "all" ? "task-filter-chip task-filter-chip--active" : "task-filter-chip"}
                        onClick={() => setTaskFilter("all")}
                    >
                        全部 {summary.total}
                    </button>
                    <button
                        type="button"
                        className={taskFilter === "active" ? "task-filter-chip task-filter-chip--active" : "task-filter-chip"}
                        onClick={() => setTaskFilter("active")}
                    >
                        活跃 {summary.queued + summary.running}
                    </button>
                    <button
                        type="button"
                        className={taskFilter === "failed" ? "task-filter-chip task-filter-chip--active" : "task-filter-chip"}
                        onClick={() => setTaskFilter("failed")}
                    >
                        失败 {summary.failed}
                    </button>
                    <button
                        type="button"
                        className={taskFilter === "completed" ? "task-filter-chip task-filter-chip--active" : "task-filter-chip"}
                        onClick={() => setTaskFilter("completed")}
                    >
                        完成 {summary.succeeded}
                    </button>
                </div>
            </section>

            {feedback ? <p className="task-feedback">{feedback}</p> : null}

            <div className="task-list">
                {filteredTasks.map((task) => (
                    <article className="task-card" key={task.id}>
                        <div className="task-card__topline">
                            <div className="stack" style={{ gap: 4 }}>
                                <strong className="task-card__title">Shot {task.shotId}</strong>
                                <span className="task-card__subline">{task.id}</span>
                            </div>
                            <span className={`task-status-badge task-status-badge--${STATUS_TONE[task.status]}`}>
                                {STATUS_LABEL[task.status]}
                            </span>
                        </div>

                        <div className="task-card__metrics">
                            <span>{providerLabelByName.get(task.providerName) ?? task.providerName}</span>
                            <span>进度 {task.progress}%</span>
                            <span>重试 {task.retryCount}</span>
                        </div>

                        {task.providerTaskId ? <p className="task-muted-note">远端任务: {task.providerTaskId}</p> : null}
                        {task.outputManifestPath ? <p className="task-muted-note">本地清单: {task.outputManifestPath}</p> : null}
                        {task.resultUrls.length > 0 ? <p className="task-muted-note">结果地址: {task.resultUrls.length} 条</p> : null}

                        <div className="task-progress">
                            <div className="task-progress__bar" style={{ width: `${task.progress}%` }} />
                        </div>

                        {task.lastError ? <p className="task-error-note">最近错误: {task.lastError}</p> : <p className="task-muted-note">当前没有最近错误记录。</p>}

                        <div className="task-card__actions">
                            <Link className="action-button action-button--ghost" href={`/projects/${slug}/tasks/${task.id}`}>
                                查看结果页
                            </Link>
                            <button
                                type="button"
                                className="action-button action-button--ghost"
                                onClick={() => updateTask(task.id, { status: "running", progress: Math.max(task.progress, 55), lastError: null })}
                                disabled={isPending}
                            >
                                标记运行中
                            </button>
                            <button
                                type="button"
                                className="action-button action-button--success"
                                onClick={() => updateTask(task.id, { status: "succeeded", progress: 100, lastError: null })}
                                disabled={isPending}
                            >
                                标记成功
                            </button>
                            <button
                                type="button"
                                className="action-button action-button--danger"
                                onClick={() => updateTask(task.id, { status: "failed", progress: task.progress, lastError: "mock_provider_timeout" })}
                                disabled={isPending}
                            >
                                模拟失败
                            </button>
                            <button
                                type="button"
                                className="action-button action-button--ghost"
                                onClick={() => retryTask(task.id)}
                                disabled={isPending}
                            >
                                重试
                            </button>
                            <button
                                type="button"
                                className="action-button action-button--ghost"
                                onClick={() => fetchTaskResult(task.id)}
                                disabled={isPending || task.status !== "succeeded" || !task.providerTaskId}
                            >
                                抓取结果
                            </button>
                        </div>
                    </article>
                ))}
                {filteredTasks.length === 0 ? <p className="task-empty-state">当前筛选条件下没有任务记录。</p> : null}
            </div>
        </section>
    );
}
