import { importProjectFromWorkspace, type ImportProjectResult } from "@/server/importers/project";

export type PromptBundle = {
  shotId: string;
  sceneNo: string;
  title: string;
  promptText: string;
  imageBindings: string[];
  summary: string;
  duration: string;
};

function normalizeAssetKey(asset: string) {
  return asset.trim().toLowerCase().replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9]/g, "");
}

function mergeImageBindings(...groups: string[][]) {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const group of groups) {
    for (const asset of group) {
      const value = asset.trim();
      if (!value) {
        continue;
      }

      const normalized = normalizeAssetKey(value);

      if (seen.has(normalized)) {
        continue;
      }

      seen.add(normalized);
      merged.push(value);
    }
  }

  return merged;
}

function formatImageBindings(assets: string[]) {
  if (assets.length === 0) {
    return "@image: 无参考图，按文字锚点稳定空间、人物与道具关系。";
  }

  return assets.map((asset, index) => `@image${index + 1}: ${asset}`).join("\n");
}

function buildPromptText(project: ImportProjectResult, shotId: string) {
  const shot = project.data.shots.find((item) => item.shotNo === shotId);
  const binding = project.data.bindings.find((item) => item.shotNo === shotId);
  const generation = project.data.generationItems.find((item) => item.shotNo === shotId);

  if (!shot) {
    throw new Error(`未找到镜头 ${shotId} 的 shot-list 数据`);
  }

  const imageBindings =
    binding && binding.assets.length > 0
      ? mergeImageBindings(binding.assets)
      : mergeImageBindings(generation?.assets ?? []);
  const title = `Shot ${shot.shotNo} · ${shot.sceneNo}`;
  const duration = generation?.duration || shot.duration || "未标注";
  const summary = generation?.summary || shot.visualAction;

  const promptText = [
    `${title}`,
    formatImageBindings(imageBindings),
    "",
    `目标时长：${duration}`,
    `场次：${shot.sceneNo}`,
    `景别：${shot.framing || "未标注"}`,
    `机位/运动：${shot.cameraMove || "未标注"}`,
    `画面动作：${shot.visualAction || "未标注"}`,
    `台词/声音：${shot.dialogueOrSound || "无"}`,
    `补充说明：${shot.notes || generation?.summary || "无"}`,
    imageBindings.length > 0 ? `参考资产：${imageBindings.join(" / ")}` : "参考资产：无",
    "统一风格：21:9，真实场景光，克制表演，弱运动，连续性稳定，禁止字幕与音乐。",
  ].join("\n");

  return {
    shotId: shot.shotNo,
    sceneNo: shot.sceneNo,
    title,
    promptText,
    imageBindings,
    summary,
    duration,
  } satisfies PromptBundle;
}

export async function assembleProjectPrompts(rootPath: string, projectSlug: string) {
  const project = await importProjectFromWorkspace(rootPath, projectSlug);
  const shotIds = Array.from(new Set(project.data.generationItems.map((item) => item.shotNo).concat(project.data.shots.map((item) => item.shotNo)))).sort();
  const bundles = shotIds.map((shotId) => buildPromptText(project, shotId));

  return {
    projectSlug,
    providerStyle: "seedance-v1",
    bundles,
  };
}

export async function assemblePromptBundle(rootPath: string, projectSlug: string, shotId: string) {
  const project = await importProjectFromWorkspace(rootPath, projectSlug);
  return buildPromptText(project, shotId);
}
