"use client";

import { useDeferredValue, useEffect, useState } from "react";

type ScreenplayInputWorkbenchProps = {
  initialText: string;
  projectAssetLibrary?: ProjectAssetLibrary | null;
  projectStoryboardPreview?: StoryboardPreviewScene[] | null;
  projectAssetDemandPreview?: AssetPreview | null;
};

type ProjectAssetLibrary = {
  projectSlug: string;
  assets: ProjectAssetReference[];
};

type ProjectAssetReference = {
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

type DerivedScreenplayState = {
  sceneCount: number;
  dialogueCount: number;
  actionCount: number;
  estimatedShotCount: number;
  scenePreview: string[];
  storyboardPreview: StoryboardPreviewScene[];
  assetPreview: AssetPreview;
};

type AssetPreviewItem = {
  assetKey: string;
  label: string;
  usageCount: number;
  shotIds: string[];
  source: string;
};

type AssetPreview = {
  characters: AssetPreviewItem[];
  locations: AssetPreviewItem[];
  props: AssetPreviewItem[];
};

type AssetLane = {
  id: "characters" | "locations" | "props";
  title: string;
  description: string;
  badgeClassName: string;
  ratioClassName: string;
  items: AssetPreviewItem[];
};

type AssetExecutionProfile = {
  priorityLabel: string;
  readinessLabel: string;
  readinessClassName: string;
  dependencyLabel: string;
  riskLabel: string;
  coverageLabel: string;
};

type StoryboardPreviewShot = {
  shotId: string;
  framing: string;
  purpose: string;
  sourceLine: string;
  location: string;
  characters: string[];
  props: string[];
};

type StoryboardPreviewScene = {
  sceneId: string;
  heading: string;
  summary: string;
  shots: StoryboardPreviewShot[];
};

const SAMPLE_SCREENPLAY = `S0 书房，深夜
林深独坐书桌前，耳机里循环播放妹妹留下的残缺录音。
林深：再放一遍。
林晚录音：如果我遇到意外。找我哥。把证据交给他。

S1 307 室门外，夜
周妍推开307，半搬空的房间和墙面浅印一起入画。
周妍：林深。晚晚出事了。她让我找你，说证据在307的音箱里。

S2 307 室内，连续
林深按亮角落音箱，指示灯转红。
系统机械音：请输入口令。
林晚录音：我把最后关键东西，藏在二十九楼设备间。`;

const FRAMING_PRESETS = ["建立镜头", "中景", "近景", "特写"] as const;
const DEFAULT_VISIBLE_SCENES = 3;
const DEFAULT_VISIBLE_SHOTS = 2;
const DEFAULT_VISIBLE_ASSET_ITEMS = 3;
const ASSET_ITEMS_PAGE_STEP = 3;

const PROP_KEYWORDS = [
  "书桌",
  "耳机",
  "录音",
  "门",
  "旧音箱",
  "墙面",
  "手机",
  "钥匙",
  "档案",
  "信封",
  "照片",
  "纸条",
] as const;

const PROJECT_ASSET_SYNONYMS = [
  { pattern: /林深/, tokens: ["lin", "shen", "linshen", "lin_shen"] },
  { pattern: /周妍/, tokens: ["zhou", "yan", "zhouyan", "zhou_yan"] },
  { pattern: /陈博/, tokens: ["chen", "bo", "chenbo", "chen_bo"] },
  { pattern: /林晚/, tokens: ["lin", "wan", "linwan", "lin_wan"] },
  { pattern: /书房|书桌/, tokens: ["study", "desk", "wide", "room"] },
  { pattern: /307\s*室门外|门外|门口|走廊/, tokens: ["307", "room", "entry", "corridor", "door"] },
  { pattern: /307\s*室内|室内|房间/, tokens: ["307", "room", "reverse", "table", "half", "moved"] },
  { pattern: /录音|波形|音频/, tokens: ["recorder", "waveform", "screen", "audio", "speaker"] },
  { pattern: /音箱|喇叭|扬声器/, tokens: ["speaker", "smartspeaker", "audio"] },
  { pattern: /纸|档案|信封|照片|纸条/, tokens: ["paper", "notice", "envelope", "note", "photo", "file"] },
  { pattern: /耳机/, tokens: ["headphone", "earphone"] },
  { pattern: /钥匙/, tokens: ["key"] },
  { pattern: /电箱|配电|传感/, tokens: ["power", "box", "sensor"] },
] as const;

function tokenizeAssetMatchValue(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fa5]+/)
    .filter(Boolean);
}

function buildAssetImageUrl(projectSlug: string, fileName: string) {
  return `/api/projects/${projectSlug}/assets/${encodeURIComponent(fileName)}`;
}

function createEmptyAssetPreview(): AssetPreview {
  return {
    characters: [],
    locations: [],
    props: [],
  };
}

function toAssetKey(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function collectDialogueSpeakers(lines: string[]) {
  const speakers = new Set<string>();

  for (const line of lines) {
    const match = line.match(/^([^:：]{1,12})[:：]/);

    if (match?.[1]) {
      speakers.add(match[1].trim());
    }
  }

  return [...speakers];
}

function extractLocationLabel(heading: string) {
  const cleaned = heading.replace(/^(S\d+|INT\.|EXT\.|内景|外景|场景)\s*/i, "").trim();
  const [location] = cleaned.split(/[，,]/);

  return location?.trim() || "未命名场景";
}

function extractPropTags(line: string) {
  return PROP_KEYWORDS.filter((keyword) => line.includes(keyword));
}

function sortAssetPreview(items: Map<string, AssetPreviewItem>) {
  return [...items.values()].sort((left, right) => {
    if (right.usageCount !== left.usageCount) {
      return right.usageCount - left.usageCount;
    }

    return left.label.localeCompare(right.label, "zh-CN");
  });
}

function registerAsset(map: Map<string, AssetPreviewItem>, label: string, shotId: string, source: string) {
  const assetKey = toAssetKey(label);
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

function buildAssetPreview(storyboardPreview: StoryboardPreviewScene[]) {
  if (storyboardPreview.length === 0) {
    return createEmptyAssetPreview();
  }

  const characters = new Map<string, AssetPreviewItem>();
  const locations = new Map<string, AssetPreviewItem>();
  const props = new Map<string, AssetPreviewItem>();

  for (const scene of storyboardPreview) {
    for (const shot of scene.shots) {
      registerAsset(locations, shot.location, shot.shotId, scene.heading);

      for (const character of shot.characters) {
        registerAsset(characters, character, shot.shotId, shot.sourceLine);
      }

      for (const prop of shot.props) {
        registerAsset(props, prop, shot.shotId, shot.sourceLine);
      }
    }
  }

  return {
    characters: sortAssetPreview(characters).slice(0, 6),
    locations: sortAssetPreview(locations).slice(0, 6),
    props: sortAssetPreview(props).slice(0, 8),
  };
}

function getSceneCountFromShotIds(shotIds: string[]) {
  return new Set(shotIds.map((shotId) => shotId.split("-")[0])).size;
}

function assetPriorityLabel(usageCount: number, sceneCount: number) {
  if (usageCount >= 3 || sceneCount > 1) {
    return "主资产";
  }

  return "补充资产";
}

function assetNextAction(laneId: AssetLane["id"], label: string) {
  if (laneId === "characters") {
    return `下一步：补 ${label} 的定妆和情绪参考`;
  }

  if (laneId === "locations") {
    return `下一步：补 ${label} 的空间建立图和反打位`;
  }

  return `下一步：补 ${label} 的单体参考和手持状态`;
}

function buildAssetExecutionProfile(laneId: AssetLane["id"], asset: AssetPreviewItem): AssetExecutionProfile {
  const sceneCount = getSceneCountFromShotIds(asset.shotIds);
  const priorityLabel = assetPriorityLabel(asset.usageCount, sceneCount);
  const coverageLabel = `${asset.shotIds[0]} -> ${asset.shotIds[asset.shotIds.length - 1]}`;
  const dependencyLabel = sceneCount > 1 ? `跨 ${sceneCount} 场复用` : "单场绑定";

  if (laneId === "characters") {
    return {
      priorityLabel,
      readinessLabel: sceneCount > 1 || asset.usageCount >= 3 ? "立即出图" : "补情绪图",
      readinessClassName: sceneCount > 1 || asset.usageCount >= 3 ? "chip--ok" : "chip--warn",
      dependencyLabel,
      riskLabel: sceneCount > 1 ? "高一致性要求" : "单场表演要求",
      coverageLabel,
    };
  }

  if (laneId === "locations") {
    return {
      priorityLabel,
      readinessLabel: sceneCount > 1 || asset.usageCount >= 2 ? "先锁空间" : "补机位图",
      readinessClassName: sceneCount > 1 || asset.usageCount >= 2 ? "chip--ok" : "chip--warn",
      dependencyLabel,
      riskLabel: sceneCount > 1 ? "空间连续性" : "单场空间建立",
      coverageLabel,
    };
  }

  return {
    priorityLabel,
    readinessLabel: asset.usageCount >= 2 ? "先做参考" : "待补细节",
    readinessClassName: asset.usageCount >= 2 ? "chip--ok" : "chip--muted",
    dependencyLabel,
    riskLabel: asset.usageCount >= 2 ? "连续持有风险" : "单点触发物",
    coverageLabel,
  };
}

function buildRequestedAssetTokens(laneId: AssetLane["id"], asset: AssetPreviewItem) {
  const fingerprint = `${asset.label} ${asset.source} ${asset.shotIds.join(" ")}`;
  const tokenSet = new Set(tokenizeAssetMatchValue(fingerprint));

  for (const synonym of PROJECT_ASSET_SYNONYMS) {
    if (synonym.pattern.test(fingerprint)) {
      for (const token of synonym.tokens) {
        tokenSet.add(token);
      }
    }
  }

  tokenSet.add(laneId.slice(0, -1));
  return [...tokenSet];
}

function findLinkedProjectAsset(
  laneId: AssetLane["id"],
  asset: AssetPreviewItem,
  projectAssetLibrary?: ProjectAssetLibrary | null,
) {
  if (!projectAssetLibrary || projectAssetLibrary.assets.length === 0) {
    return null;
  }

  const requestedTokens = buildRequestedAssetTokens(laneId, asset);
  let bestMatch: { asset: ProjectAssetReference; score: number } | null = null;

  for (const projectAsset of projectAssetLibrary.assets) {
    const overlapCount = requestedTokens.filter((token) => projectAsset.matchTokens.includes(token)).length;
    const laneScore = projectAsset.kind === laneId ? 2 : 0;
    const availabilityScore = projectAsset.fileExists ? 1 : 0;
    const score = overlapCount * 3 + laneScore + availabilityScore;

    if (score < 4) {
      continue;
    }

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { asset: projectAsset, score };
    }
  }

  return bestMatch?.asset ?? null;
}

function buildAssetLanes(assetPreview: AssetPreview): AssetLane[] {
  return [
    {
      id: "characters",
      title: "角色泳道",
      description: "优先沉淀会反复出镜的人物参考和表演状态。",
      badgeClassName: "chip--asset-character",
      ratioClassName: "screenplay-asset-card__visual--character",
      items: assetPreview.characters,
    },
    {
      id: "locations",
      title: "场景泳道",
      description: "先锁定空间 establishing，再补反打和特定机位。",
      badgeClassName: "chip--asset-location",
      ratioClassName: "screenplay-asset-card__visual--location",
      items: assetPreview.locations,
    },
    {
      id: "props",
      title: "道具泳道",
      description: "把推动情节的物件先抽出来，便于后续做 reference binding。",
      badgeClassName: "chip--asset-prop",
      ratioClassName: "screenplay-asset-card__visual--prop",
      items: assetPreview.props,
    },
  ];
}

function pickFraming(index: number) {
  return FRAMING_PRESETS[index] ?? FRAMING_PRESETS[FRAMING_PRESETS.length - 1];
}

function summarizeScene(lines: string[]) {
  const firstAction = lines.find((line) => !/[:：]/.test(line));
  const firstDialogue = lines.find((line) => /[:：]/.test(line));

  if (firstAction && firstDialogue) {
    return `${firstAction} / ${firstDialogue}`;
  }

  return firstAction ?? firstDialogue ?? "等待补充场次内容";
}

function buildStoryboardPreview(source: string, knownCharacters: string[]) {
  const lines = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const scenes: StoryboardPreviewScene[] = [];
  let currentScene: { heading: string; lines: string[] } | null = null;

  for (const line of lines) {
    if (/^(S\d+|INT\.|EXT\.|内景|外景|场景)/i.test(line)) {
      if (currentScene) {
        const currentHeading = currentScene.heading;

        scenes.push({
          sceneId: `scene-${scenes.length + 1}`,
          heading: currentHeading,
          summary: summarizeScene(currentScene.lines),
          shots: currentScene.lines.slice(0, 3).map((sceneLine, index) => {
            const location = extractLocationLabel(currentHeading);
            const characters = knownCharacters.filter(
              (name) => sceneLine.includes(name) || sceneLine.startsWith(`${name}:`) || sceneLine.startsWith(`${name}：`),
            );
            const props = extractPropTags(sceneLine);

            return {
              shotId: `${String(scenes.length + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`,
              framing: pickFraming(index),
              purpose: /[:：]/.test(sceneLine) ? "对白推进" : index === 0 ? "空间建立" : "动作推进",
              sourceLine: sceneLine,
              location,
              characters,
              props,
            };
          }),
        });
      }

      currentScene = { heading: line, lines: [] };
      continue;
    }

    if (!currentScene) {
      currentScene = { heading: "S0 未命名场次", lines: [] };
    }

    currentScene.lines.push(line);
  }

  if (currentScene) {
    const currentHeading = currentScene.heading;

    scenes.push({
      sceneId: `scene-${scenes.length + 1}`,
      heading: currentHeading,
      summary: summarizeScene(currentScene.lines),
      shots: currentScene.lines.slice(0, 3).map((sceneLine, index) => {
        const location = extractLocationLabel(currentHeading);
        const characters = knownCharacters.filter(
          (name) => sceneLine.includes(name) || sceneLine.startsWith(`${name}:`) || sceneLine.startsWith(`${name}：`),
        );
        const props = extractPropTags(sceneLine);

        return {
          shotId: `${String(scenes.length + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`,
          framing: pickFraming(index),
          purpose: /[:：]/.test(sceneLine) ? "对白推进" : index === 0 ? "空间建立" : "动作推进",
          sourceLine: sceneLine,
          location,
          characters,
          props,
        };
      }),
    });
  }

  return scenes.slice(0, 4);
}

function deriveScreenplayState(source: string): DerivedScreenplayState {
  const text = source.trim();

  if (!text) {
    return {
      sceneCount: 0,
      dialogueCount: 0,
      actionCount: 0,
      estimatedShotCount: 0,
      scenePreview: [],
      storyboardPreview: [],
      assetPreview: createEmptyAssetPreview(),
    };
  }

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const sceneLines = lines.filter((line) => /^(S\d+|INT\.|EXT\.|内景|外景|场景)/i.test(line));
  const dialogueLines = lines.filter((line) => /[:：]/.test(line) && line.length <= 48);
  const actionLines = lines.filter((line) => !sceneLines.includes(line) && !dialogueLines.includes(line));
  const estimatedShotCount = Math.max(sceneLines.length * 3, Math.ceil((dialogueLines.length + actionLines.length) * 1.4));
  const dialogueSpeakers = collectDialogueSpeakers(lines);
  const storyboardPreview = buildStoryboardPreview(text, dialogueSpeakers);

  return {
    sceneCount: sceneLines.length,
    dialogueCount: dialogueLines.length,
    actionCount: actionLines.length,
    estimatedShotCount,
    scenePreview: sceneLines.slice(0, 4),
    storyboardPreview,
    assetPreview: buildAssetPreview(storyboardPreview),
  };
}

export function ScreenplayInputWorkbench({
  initialText,
  projectAssetLibrary,
  projectStoryboardPreview,
  projectAssetDemandPreview,
}: ScreenplayInputWorkbenchProps) {
  const initialScreenplayText = initialText.trim().length > 0 ? initialText : SAMPLE_SCREENPLAY;
  const [screenplayText, setScreenplayText] = useState(initialScreenplayText);
  const [scenePage, setScenePage] = useState(1);
  const [expandedSceneIds, setExpandedSceneIds] = useState<string[]>([]);
  const [visibleAssetCountByLane, setVisibleAssetCountByLane] = useState<
    Record<AssetLane["id"], number>
  >({
    characters: DEFAULT_VISIBLE_ASSET_ITEMS,
    locations: DEFAULT_VISIBLE_ASSET_ITEMS,
    props: DEFAULT_VISIBLE_ASSET_ITEMS,
  });
  const deferredText = useDeferredValue(screenplayText);
  const derived = deriveScreenplayState(deferredText);
  const hasInput = deferredText.trim().length > 0;
  const storyboardSourceLabel = hasInput ? "本地预估" : projectStoryboardPreview?.length ? "真实 storyboard" : "本地预估";
  const assetSourceLabel = hasInput ? "本地预估" : projectAssetDemandPreview ? "真实 shot 统计" : "本地预估";
  const activeStoryboardPreview = hasInput ? derived.storyboardPreview : projectStoryboardPreview ?? [];
  const activeAssetPreview = hasInput
    ? derived.assetPreview
    : projectAssetDemandPreview ?? buildAssetPreview(activeStoryboardPreview);
  const totalShots = activeStoryboardPreview.reduce((count, scene) => count + scene.shots.length, 0);
  const fallbackDialogueCount = activeStoryboardPreview.reduce(
    (count, scene) =>
      count + scene.shots.filter((shot) => shot.purpose === "对白推进" || /[:：]/.test(shot.sourceLine)).length,
    0,
  );
  const sceneCount = hasInput ? derived.sceneCount : activeStoryboardPreview.length;
  const dialogueCount = hasInput ? derived.dialogueCount : fallbackDialogueCount;
  const actionCount = hasInput ? derived.actionCount : Math.max(0, totalShots - fallbackDialogueCount);
  const estimatedShotCount = hasInput ? derived.estimatedShotCount : totalShots;
  const totalAssetCount =
    activeAssetPreview.characters.length + activeAssetPreview.locations.length + activeAssetPreview.props.length;
  const assetLanes = buildAssetLanes(activeAssetPreview);
  const totalScenePages = Math.max(1, Math.ceil(activeStoryboardPreview.length / DEFAULT_VISIBLE_SCENES));
  const boundedScenePage = Math.min(scenePage, totalScenePages);
  const sceneStartIndex = (boundedScenePage - 1) * DEFAULT_VISIBLE_SCENES;
  const visibleStoryboardScenes = activeStoryboardPreview.slice(sceneStartIndex, sceneStartIndex + DEFAULT_VISIBLE_SCENES);
  const primaryAssetCount = assetLanes.reduce(
    (count, lane) => count + lane.items.filter((asset) => asset.usageCount >= 3).length,
    0,
  );

  useEffect(() => {
    setScenePage(1);
    setExpandedSceneIds([]);
  }, [hasInput, activeStoryboardPreview.length, storyboardSourceLabel]);

  useEffect(() => {
    if (scenePage > totalScenePages) {
      setScenePage(totalScenePages);
    }
  }, [scenePage, totalScenePages]);

  useEffect(() => {
    setVisibleAssetCountByLane({
      characters: DEFAULT_VISIBLE_ASSET_ITEMS,
      locations: DEFAULT_VISIBLE_ASSET_ITEMS,
      props: DEFAULT_VISIBLE_ASSET_ITEMS,
    });
  }, [hasInput, totalAssetCount]);

  function toggleSceneShots(sceneId: string) {
    setExpandedSceneIds((current) =>
      current.includes(sceneId) ? current.filter((item) => item !== sceneId) : [...current, sceneId],
    );
  }

  function resetCanvasPaginationState() {
    setScenePage(1);
    setExpandedSceneIds([]);
    setVisibleAssetCountByLane({
      characters: DEFAULT_VISIBLE_ASSET_ITEMS,
      locations: DEFAULT_VISIBLE_ASSET_ITEMS,
      props: DEFAULT_VISIBLE_ASSET_ITEMS,
    });
  }

  function handleLoadSampleScreenplay() {
    resetCanvasPaginationState();
    setScreenplayText("");
    queueMicrotask(() => {
      setScreenplayText(SAMPLE_SCREENPLAY);
    });
  }

  function handleClearScreenplay() {
    resetCanvasPaginationState();
    setScreenplayText("");
  }

  return (
    <section className="screenplay-workbench">
      <div className="screenplay-workbench__header">
        <div className="stack" style={{ gap: 8 }}>
          <p className="eyebrow">Script Input</p>
          <h2>把剧本贴进来</h2>
          <p>
            这里应该是制作画布的左侧入口。先输入剧本，再往右推到分镜、资产和视频，而不是先跳很多页面。
          </p>
        </div>
        <div className="screenplay-workbench__actions">
          <button
            className="workflow-node__link workflow-node__link--primary"
            type="button"
            onClick={handleLoadSampleScreenplay}
          >
            载入示例剧本
          </button>
          <button className="workflow-node__link" type="button" onClick={handleClearScreenplay}>
            清空输入
          </button>
        </div>
      </div>

      <div className="screenplay-workbench__body">
        <label className="screenplay-editor" htmlFor="screenplay-input">
          <span className="screenplay-editor__label">剧本文本</span>
          <textarea
            id="screenplay-input"
            className="screenplay-editor__textarea"
            value={screenplayText}
            onChange={(event) => setScreenplayText(event.target.value)}
            placeholder="把剧本、分场大纲或一句话梗概贴在这里。下一步应该自动进入分镜拆解。"
          />
        </label>

        <aside className="screenplay-inspector">
          <div className="project-kpi-grid">
            <div className="project-kpi">
              <span>场次</span>
              <strong>{sceneCount}</strong>
            </div>
            <div className="project-kpi">
              <span>对白</span>
              <strong>{dialogueCount}</strong>
            </div>
            <div className="project-kpi">
              <span>动作</span>
              <strong>{actionCount}</strong>
            </div>
            <div className="project-kpi">
              <span>预估镜头</span>
              <strong>{estimatedShotCount}</strong>
            </div>
          </div>

          <div className="screenplay-inspector__panel stack">
            <div className="screenplay-inspector__panel-header">
              <p className="eyebrow">分镜预览</p>
              {activeStoryboardPreview.length > 0 ? <span className="chip chip--muted">{activeStoryboardPreview.length} scenes</span> : null}
              <span className="chip chip--muted">{storyboardSourceLabel}</span>
            </div>
            {activeStoryboardPreview.length > 0 ? (
              <div className="screenplay-storyboard-list">
                {visibleStoryboardScenes.map((scene) => {
                  const isSceneExpanded = expandedSceneIds.includes(scene.sceneId);
                  const hasMoreShots = scene.shots.length > DEFAULT_VISIBLE_SHOTS;
                  const visibleShots = isSceneExpanded ? scene.shots : scene.shots.slice(0, DEFAULT_VISIBLE_SHOTS);

                  return (
                  <article className="screenplay-storyboard-card" key={scene.sceneId}>
                    <div className="screenplay-storyboard-card__header">
                      <strong>{scene.heading}</strong>
                      <span className="chip chip--muted">{scene.shots.length} beats</span>
                    </div>
                    <p className="mono">{scene.summary}</p>
                    <div className="screenplay-shot-list">
                      {visibleShots.map((shot) => (
                        <div className="endpoint" key={shot.shotId}>
                          <strong>
                            Shot {shot.shotId} · {shot.framing}
                          </strong>
                          <span>{shot.purpose}</span>
                          <span>{shot.sourceLine}</span>
                          <div className="screenplay-shot-assets">
                            <span className="chip chip--asset-location">场景 · {shot.location}</span>
                            {shot.characters.map((character) => (
                              <span className="chip chip--asset-character" key={`${shot.shotId}-${character}`}>
                                角色 · {character}
                              </span>
                            ))}
                            {shot.props.map((prop) => (
                              <span className="chip chip--asset-prop" key={`${shot.shotId}-${prop}`}>
                                道具 · {prop}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {hasMoreShots ? (
                      <button
                        className="workflow-node__link"
                        type="button"
                        onClick={() => toggleSceneShots(scene.sceneId)}
                      >
                        {isSceneExpanded ? "收起本场镜头" : `展开本场其余 ${scene.shots.length - DEFAULT_VISIBLE_SHOTS} 个镜头`}
                      </button>
                    ) : null}
                  </article>
                  );
                })}
                {activeStoryboardPreview.length > DEFAULT_VISIBLE_SCENES ? (
                  <div className="chip-row">
                    <button
                      className="workflow-node__link"
                      type="button"
                      disabled={boundedScenePage <= 1}
                      onClick={() => {
                        setScenePage((page) => Math.max(1, page - 1));
                        setExpandedSceneIds([]);
                      }}
                    >
                      上一页
                    </button>
                    {Array.from({ length: totalScenePages }, (_, index) => index + 1).map((page) => (
                      <button
                        key={`scene-page-${page}`}
                        className="workflow-node__link"
                        type="button"
                        onClick={() => {
                          setScenePage(page);
                          setExpandedSceneIds([]);
                        }}
                      >
                        {page === boundedScenePage ? `第 ${page} 页` : `${page}`}
                      </button>
                    ))}
                    <button
                      className="workflow-node__link"
                      type="button"
                      disabled={boundedScenePage >= totalScenePages}
                      onClick={() => {
                        setScenePage((page) => Math.min(totalScenePages, page + 1));
                        setExpandedSceneIds([]);
                      }}
                    >
                      下一页
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="endpoint">
                <strong>等待输入</strong>
                <span>输入剧本后将先展示本地预估分镜；若保留空输入，将显示已接入的项目真实分镜。</span>
              </div>
            )}
          </div>

          <div className="screenplay-inspector__panel stack">
            <div className="screenplay-inspector__panel-header">
              <p className="eyebrow">资产需求</p>
              {totalAssetCount > 0 ? <span className="chip chip--muted">{totalAssetCount} assets</span> : null}
              <span className="chip chip--muted">{assetSourceLabel}</span>
            </div>
            {totalAssetCount > 0 ? (
              <div className="screenplay-asset-canvas">
                <div className="screenplay-asset-canvas__summary">
                  <div className="endpoint">
                    <strong>主资产优先级</strong>
                    <span>当前识别出 {primaryAssetCount} 个高频资产，应该先出参考图再扩展补充资产。</span>
                  </div>
                  <div className="endpoint">
                    <strong>画布原则</strong>
                    <span>角色保表演一致，场景保空间连续，道具保情节触发点。</span>
                  </div>
                </div>

                <div className="screenplay-asset-lanes">
                  {assetLanes.map((lane) => (
                    <section className="screenplay-asset-lane" key={lane.id}>
                      <div className="screenplay-asset-group__header">
                        <div className="stack" style={{ gap: 6 }}>
                          <strong>{lane.title}</strong>
                          <span>{lane.description}</span>
                        </div>
                        <span className={`chip ${lane.badgeClassName}`}>{lane.items.length}</span>
                      </div>

                      {lane.items.length > 0 ? (
                        <div className="screenplay-asset-card-grid">
                          {lane.items.slice(0, visibleAssetCountByLane[lane.id]).map((asset) => (
                            <article className="screenplay-asset-card screenplay-asset-card--canvas" key={asset.assetKey}>
                              {(() => {
                                const executionProfile = buildAssetExecutionProfile(lane.id, asset);
                                const linkedProjectAsset = findLinkedProjectAsset(lane.id, asset, projectAssetLibrary);

                                return (
                                  <>
                                    <div className={`screenplay-asset-card__visual ${lane.ratioClassName}`}>
                                      <span className={`chip ${lane.badgeClassName}`}>{executionProfile.priorityLabel}</span>
                                      {linkedProjectAsset?.fileExists && !linkedProjectAsset.referenceOnly ? (
                                        <a
                                          className="screenplay-asset-card__image-link"
                                          href={buildAssetImageUrl(linkedProjectAsset.projectSlug, linkedProjectAsset.fileName)}
                                          rel="noreferrer"
                                          target="_blank"
                                        >
                                          <img
                                            alt={linkedProjectAsset.canonicalAlias}
                                            className="screenplay-asset-card__image"
                                            src={buildAssetImageUrl(linkedProjectAsset.projectSlug, linkedProjectAsset.fileName)}
                                          />
                                        </a>
                                      ) : (
                                        <span className="screenplay-asset-card__placeholder">{asset.label}</span>
                                      )}
                                    </div>
                                    <div className="screenplay-asset-card__body">
                                      <div className="screenplay-asset-card__header">
                                        <strong>{asset.label}</strong>
                                        <span className={`chip ${lane.badgeClassName}`}>{asset.usageCount} shots</span>
                                      </div>
                                      <div className="chip-row">
                                        <span className={`chip ${executionProfile.readinessClassName}`}>{executionProfile.readinessLabel}</span>
                                        <span className="chip chip--muted">{executionProfile.dependencyLabel}</span>
                                        {linkedProjectAsset ? (
                                          <span className={linkedProjectAsset.fileExists ? "chip chip--ok" : "chip chip--warn"}>
                                            {linkedProjectAsset.fileExists ? "项目已有图" : "项目缺图"}
                                          </span>
                                        ) : (
                                          <span className="chip chip--muted">未命中项目资产</span>
                                        )}
                                      </div>
                                      <div className="screenplay-asset-card__metrics">
                                        <span>{asset.source}</span>
                                        <span className="mono">连续性：{executionProfile.riskLabel}</span>
                                        <span className="mono">覆盖镜头：{executionProfile.coverageLabel}</span>
                                        <span className="mono">绑定镜头：{asset.shotIds.join(", ")}</span>
                                        {linkedProjectAsset ? (
                                          <>
                                            <span className="mono">项目资产：{linkedProjectAsset.canonicalAlias}</span>
                                            <span className="mono">文件：{linkedProjectAsset.fileName || "未定义"}</span>
                                          </>
                                        ) : null}
                                        <span className="mono">{assetNextAction(lane.id, asset.label)}</span>
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </article>
                          ))}
                          {lane.items.length > DEFAULT_VISIBLE_ASSET_ITEMS ? (
                            <div className="chip-row">
                              {lane.items.length > visibleAssetCountByLane[lane.id] ? (
                                <button
                                  className="workflow-node__link"
                                  type="button"
                                  onClick={() =>
                                    setVisibleAssetCountByLane((current) => ({
                                      ...current,
                                      [lane.id]: Math.min(current[lane.id] + ASSET_ITEMS_PAGE_STEP, lane.items.length),
                                    }))
                                  }
                                >
                                  加载更多{lane.title.replace("泳道", "")}
                                </button>
                              ) : null}
                              {visibleAssetCountByLane[lane.id] > DEFAULT_VISIBLE_ASSET_ITEMS ? (
                                <button
                                  className="workflow-node__link"
                                  type="button"
                                  onClick={() =>
                                    setVisibleAssetCountByLane((current) => ({
                                      ...current,
                                      [lane.id]: DEFAULT_VISIBLE_ASSET_ITEMS,
                                    }))
                                  }
                                >
                                  收起{lane.title.replace("泳道", "")}
                                </button>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="endpoint">
                          <strong>等待 {lane.title.replace("泳道", "")}</strong>
                          <span>{lane.description}</span>
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            ) : (
              <div className="endpoint">
                <strong>等待资产拆解</strong>
                <span>先输入剧本并生成分镜，这里再把角色、场景、道具汇总成可继续生产的资产列表。</span>
              </div>
            )}
          </div>

          <div className="screenplay-inspector__panel stack">
            <p className="eyebrow">下游输出</p>
            <div className="endpoint">
              <strong>Storyboard</strong>
              <span>按场次拆镜头节拍，形成 story beats 和 shot list。</span>
            </div>
            <div className="endpoint">
              <strong>Assets</strong>
              <span>把当前识别出的角色、场景、道具继续整理成图参和参考图绑定。</span>
            </div>
            <div className="endpoint">
              <strong>Video Tasks</strong>
              <span>把镜头 prompt 提交给 provider，轮询状态并抓取结果。</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
