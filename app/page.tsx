import Link from "next/link";

import { ProviderConfigPanel } from "@/components/provider-config-panel";
import { ScreenplayInputWorkbench } from "@/components/screenplay-input-workbench";
import { loadProjectStoryboard, type ProjectStoryboard, type StoryboardAsset } from "@/server/storyboard/loader";

const ACCEPTANCE_PROJECT_SLUG = "zhengci-zhiwai";
const HOME_STORYBOARD_SCENE_LIMIT = 6;
const HOME_STORYBOARD_SHOT_LIMIT = 4;

type HomeProjectAsset = {
    alias: string;
    canonicalAlias: string;
    fileName: string;
    description: string;
    fileExists: boolean;
    referenceOnly: boolean;
    projectSlug: string;
    kind: "characters" | "locations" | "props";
    matchTokens: string[];
};

type HomeStoryboardPreviewShot = {
    shotId: string;
    framing: string;
    purpose: string;
    sourceLine: string;
    location: string;
    characters: string[];
    props: string[];
};

type HomeStoryboardPreviewScene = {
    sceneId: string;
    heading: string;
    summary: string;
    shots: HomeStoryboardPreviewShot[];
};

type HomeAssetPreviewItem = {
    assetKey: string;
    label: string;
    usageCount: number;
    shotIds: string[];
    source: string;
};

type HomeAssetPreview = {
    characters: HomeAssetPreviewItem[];
    locations: HomeAssetPreviewItem[];
    props: HomeAssetPreviewItem[];
};

function tokenizeAssetValue(value: string) {
    return value
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .toLowerCase()
        .split(/[^a-z0-9\u4e00-\u9fa5]+/)
        .filter(Boolean);
}

function classifyHomeProjectAsset(asset: StoryboardAsset): HomeProjectAsset["kind"] {
    const fingerprint = [asset.alias, asset.canonicalAlias, asset.fileName, asset.description].join(" ").toLowerCase();

    if (/(lin[_\s-]?shen|zhou[_\s-]?yan|chen[_\s-]?bo|lin[_\s-]?wan)/.test(fingerprint) && !/(hand|phone|case)/.test(fingerprint)) {
        return "characters";
    }

    if (/(room|corridor|study|entry|reverse|desk|hall|door)/.test(fingerprint)) {
        return "locations";
    }

    return "props";
}

function buildHomeProjectAssets(assets: StoryboardAsset[], projectSlug: string): HomeProjectAsset[] {
    return assets.map((asset) => ({
        alias: asset.alias,
        canonicalAlias: asset.canonicalAlias,
        fileName: asset.fileName,
        description: asset.description,
        fileExists: asset.fileExists,
        referenceOnly: asset.referenceOnly,
        projectSlug,
        kind: classifyHomeProjectAsset(asset),
        matchTokens: Array.from(
            new Set(tokenizeAssetValue([asset.alias, asset.canonicalAlias, asset.fileName, asset.description].join(" "))),
        ),
    }));
}

function collectStoryboardAssets(storyboard: ProjectStoryboard): StoryboardAsset[] {
    const assetMap = new Map<string, StoryboardAsset>();

    for (const asset of storyboard.assets ?? []) {
        assetMap.set(asset.canonicalAlias, asset);
    }

    for (const scene of storyboard.scenes) {
        for (const shot of scene.shots) {
            for (const asset of shot.assets) {
                if (!assetMap.has(asset.canonicalAlias)) {
                    assetMap.set(asset.canonicalAlias, asset);
                }
            }
        }
    }

    return [...assetMap.values()];
}

function toAssetDisplayLabel(asset: StoryboardAsset) {
    const label = asset.description?.trim();
    return label && label.length > 0 ? label : asset.alias;
}

function buildHomeStoryboardPreview(
    storyboard: ProjectStoryboard,
    options?: { sceneLimit?: number; shotLimit?: number },
): HomeStoryboardPreviewScene[] {
    const sceneLimit = options?.sceneLimit ?? HOME_STORYBOARD_SCENE_LIMIT;
    const shotLimit = options?.shotLimit ?? HOME_STORYBOARD_SHOT_LIMIT;

    return storyboard.scenes.slice(0, sceneLimit).map((scene, sceneIndex) => {
        const shots = scene.shots.slice(0, shotLimit).map((shot, shotIndex) => {
            const locationAsset = shot.assets.find((asset) => classifyHomeProjectAsset(asset) === "locations");
            const characterAssets = shot.assets
                .filter((asset) => classifyHomeProjectAsset(asset) === "characters")
                .map((asset) => toAssetDisplayLabel(asset));
            const propAssets = shot.assets
                .filter((asset) => classifyHomeProjectAsset(asset) === "props")
                .map((asset) => toAssetDisplayLabel(asset));
            const sourceLine = shot.visualAction?.trim() || shot.dialogueOrSound?.trim() || shot.promptTitle;
            const purpose = shot.dialogueOrSound?.includes("：") || shot.dialogueOrSound?.includes(":") ? "对白推进" : shotIndex === 0 ? "空间建立" : "动作推进";

            return {
                shotId: `${scene.sceneNo}-${shot.shotNo}`,
                framing: shot.framing,
                purpose,
                sourceLine,
                location: locationAsset ? toAssetDisplayLabel(locationAsset) : scene.sceneNo,
                characters: characterAssets,
                props: propAssets,
            };
        });

        const summarySource = shots[0]?.sourceLine || "等待补充场次内容";

        return {
            sceneId: `scene-${sceneIndex + 1}`,
            heading: scene.sceneNo,
            summary: summarySource,
            shots,
        };
    });
}

function toHomeAssetKey(label: string) {
    return label.toLowerCase().replace(/\s+/g, "-");
}

function registerHomeAssetDemand(
    map: Map<string, HomeAssetPreviewItem>,
    label: string,
    shotId: string,
    source: string,
) {
    const assetKey = toHomeAssetKey(label);
    const existing = map.get(assetKey);

    if (existing) {
        if (!existing.shotIds.includes(shotId)) {
            existing.shotIds.push(shotId);
            existing.usageCount = existing.shotIds.length;
        }

        return;
    }

    map.set(assetKey, {
        assetKey,
        label,
        usageCount: 1,
        shotIds: [shotId],
        source,
    });
}

function sortHomeAssetDemand(items: Map<string, HomeAssetPreviewItem>, limit: number) {
    return [...items.values()]
        .sort((left, right) => {
            if (right.usageCount !== left.usageCount) {
                return right.usageCount - left.usageCount;
            }

            return left.label.localeCompare(right.label, "zh-CN");
        })
        .slice(0, limit);
}

function buildHomeAssetDemandPreview(storyboard: ProjectStoryboard): HomeAssetPreview {
    const characters = new Map<string, HomeAssetPreviewItem>();
    const locations = new Map<string, HomeAssetPreviewItem>();
    const props = new Map<string, HomeAssetPreviewItem>();

    for (const scene of storyboard.scenes) {
        for (const shot of scene.shots) {
            const shotId = `${scene.sceneNo}-${shot.shotNo}`;
            const source = shot.promptTitle || shot.visualAction || shot.dialogueOrSound || scene.sceneNo;

            for (const asset of shot.assets) {
                const kind = classifyHomeProjectAsset(asset);
                const label = toAssetDisplayLabel(asset);

                if (kind === "characters") {
                    registerHomeAssetDemand(characters, label, shotId, source);
                    continue;
                }

                if (kind === "locations") {
                    registerHomeAssetDemand(locations, label, shotId, source);
                    continue;
                }

                registerHomeAssetDemand(props, label, shotId, source);
            }
        }
    }

    return {
        characters: sortHomeAssetDemand(characters, 6),
        locations: sortHomeAssetDemand(locations, 6),
        props: sortHomeAssetDemand(props, 8),
    };
}

const workflowNodes = [
    {
        step: "01",
        title: "输入剧本",
        desc: "从一句话梗概开始，或直接导入现有 screenplay。这里应该是整个项目的起点，而不是零散接口列表。",
        status: "入口",
        actions: [
            { label: "打开项目详情", href: "/projects/zhengci-zhiwai" },
            { label: "导入 API", href: "/api/projects/import" },
        ],
    },
    {
        step: "02",
        title: "得到分镜",
        desc: "把剧本拆成 storyboard、shot list 和 prompt bundles。分镜不是附属页，而是画布中央的主工作区。",
        status: "处理中枢",
        actions: [
            { label: "查看 storyboard", href: "/projects/zhengci-zhiwai/storyboard" },
            { label: "查看 prompts", href: "/projects/zhengci-zhiwai/prompts" },
        ],
    },
    {
        step: "03",
        title: "生成资产",
        desc: "围绕角色、场景、道具做图参和资产检查，确保每个镜头能绑定正确资产再进入视频生成。",
        status: "资产层",
        actions: [
            { label: "查看项目概览", href: "/projects/zhengci-zhiwai" },
            { label: "查看 provider 配置", href: "#provider-config" },
        ],
    },
    {
        step: "04",
        title: "生成视频",
        desc: "把镜头任务提交给 video provider，轮询状态、抓取结果，并回看 manifest 与产物链接。",
        status: "输出层",
        actions: [
            { label: "打开任务结果页", href: "/projects/zhengci-zhiwai/tasks/task_submit_zhengci-zhiwai_003_mock" },
            { label: "打开任务台", href: "/projects/zhengci-zhiwai" },
        ],
    },
];

const canvasNotes = [
    "界面主轴应是流程画布，而不是 API 清单。",
    "剧本、分镜、资产、视频四层应该同时可见，能一眼看出上下游。",
    "当前仓库已能支撑项目页、storyboard、prompts、任务结果页的串联验收。",
];

export default async function HomePage() {
    const acceptanceStoryboard = await loadProjectStoryboard(process.cwd(), ACCEPTANCE_PROJECT_SLUG);
    const projectAssetLibrary = acceptanceStoryboard
        ? {
              projectSlug: ACCEPTANCE_PROJECT_SLUG,
                            assets: buildHomeProjectAssets(collectStoryboardAssets(acceptanceStoryboard), ACCEPTANCE_PROJECT_SLUG),
          }
        : null;
    const projectStoryboardPreview = acceptanceStoryboard
        ? buildHomeStoryboardPreview(acceptanceStoryboard, {
              sceneLimit: HOME_STORYBOARD_SCENE_LIMIT,
              shotLimit: HOME_STORYBOARD_SHOT_LIMIT,
          })
        : null;
    const projectAssetDemandPreview = acceptanceStoryboard ? buildHomeAssetDemandPreview(acceptanceStoryboard) : null;

    return (
        <main>
            <section className="hero hero--canvas">
                <p className="eyebrow">AI Video Workflow</p>
                <h1>从剧本到视频的画布式工作台</h1>
                <p>
                    你的界面主体验不该是“点很多页面”，而该是像制作画布一样，把剧本输入、分镜拆解、资产准备和视频生成放在同一块工作面里。
                </p>
                <div className="chip-row">
                    <span className="chip">剧本输入</span>
                    <span className="chip">分镜画布</span>
                    <span className="chip">资产绑定</span>
                    <span className="chip">视频任务</span>
                </div>
                <div className="hero-canvas-meta">
                    <div className="hero-canvas-meta__panel">
                        <span className="hero-canvas-meta__label">当前验收项目</span>
                        <strong>证词之外</strong>
                        <p className="mono">现有样例已经覆盖：项目详情、storyboard、prompts、任务结果页。</p>
                    </div>
                    <div className="hero-canvas-meta__panel">
                        <span className="hero-canvas-meta__label">建议主视图</span>
                        <strong>流程画布</strong>
                        <p className="mono">左侧输入剧本，中部拆分分镜和资产，右侧提交视频并验收结果。</p>
                    </div>
                </div>
            </section>

            <ScreenplayInputWorkbench
                initialText=""
                projectAssetLibrary={projectAssetLibrary}
                projectStoryboardPreview={projectStoryboardPreview}
                projectAssetDemandPreview={projectAssetDemandPreview}
            />

            <section className="workflow-canvas" aria-label="从剧本到视频的流程画布">
                <div className="workflow-canvas__grid" />
                <div className="workflow-canvas__track" />
                {workflowNodes.map((node, index) => (
                    <article className="workflow-node" key={node.step} style={{ animationDelay: `${index * 80}ms` }}>
                        <div className="workflow-node__topline">
                            <span className="workflow-node__step">{node.step}</span>
                            <span className="workflow-node__status">{node.status}</span>
                        </div>
                        <div className="stack" style={{ gap: 8 }}>
                            <h2>{node.title}</h2>
                            <p>{node.desc}</p>
                        </div>
                        <div className="workflow-node__actions">
                            {node.actions.map((action) => (
                                <Link className="workflow-node__link" href={action.href} key={action.label}>
                                    {action.label}
                                </Link>
                            ))}
                        </div>
                    </article>
                ))}
                <aside className="workflow-inspector">
                    <p className="eyebrow">Canvas Note</p>
                    <h2>这应该像制作台，不像后台列表</h2>
                    <div className="stack">
                        {canvasNotes.map((note) => (
                            <div className="endpoint" key={note}>
                                <span>{note}</span>
                            </div>
                        ))}
                    </div>
                    <div className="workflow-inspector__actions">
                        <Link className="workflow-node__link workflow-node__link--primary" href="/projects/zhengci-zhiwai">
                            进入项目工作台
                        </Link>
                        <Link className="workflow-node__link" href="/projects/zhengci-zhiwai/prompts">
                            进入 prompts 画布
                        </Link>
                    </div>
                </aside>
            </section>

            <section className="card stack" style={{ marginTop: 24 }}>
                <h3>当前可验收的工作面</h3>
                <div className="grid">
                    <div className="endpoint">
                        <strong>/projects/zhengci-zhiwai</strong>
                        <span>项目总览、任务台、provider 配置。</span>
                    </div>
                    <div className="endpoint">
                        <strong>/projects/zhengci-zhiwai/storyboard</strong>
                        <span>分镜与资产关系页，适合检查镜头和图参绑定。</span>
                    </div>
                    <div className="endpoint">
                        <strong>/projects/zhengci-zhiwai/prompts</strong>
                        <span>Prompt 工作台，现已带 raw payload 和 mapped body 预览。</span>
                    </div>
                    <div className="endpoint">
                        <strong>/projects/zhengci-zhiwai/tasks/task_submit_zhengci-zhiwai_003_mock</strong>
                        <span>任务结果页，查看 manifest、结果链接和 raw payload。</span>
                    </div>
                </div>
            </section>

            <div id="provider-config">
                <ProviderConfigPanel
                title="Provider 配置"
                description="当前 provider 抽象已经支持 mock 和通用 HTTP 提交器。这里直接显示每个引擎是否可用、缺哪些环境变量，以及根目录 .env.example 该怎么填。"
                />
            </div>
        </main>
    );
}
