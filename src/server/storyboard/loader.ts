import { readFile } from "node:fs/promises";
import path from "node:path";

export type StoryboardAsset = {
  alias: string;
  canonicalAlias: string;
  sourceAliases?: string[];
  fileName: string;
  description: string;
  fileExists: boolean;
  referenceOnly: boolean;
  imageRelativePath: string;
};

export type StoryboardShot = {
  shotNo: string;
  sceneNo: string;
  framing: string;
  cameraMove: string;
  visualAction: string;
  dialogueOrSound: string;
  duration: string;
  notes: string;
  promptTitle: string;
  promptText: string;
  promptSourcePath: string;
  bindingAliases: string[];
  promptAliases: string[];
  assets: StoryboardAsset[];
  stages: {
    storyboard: string;
    assets: string;
    prompt: string;
    video: string;
    edit: string;
  };
};

export type StoryboardScene = {
  sceneNo: string;
  shots: StoryboardShot[];
};

export type ProjectStoryboard = {
  projectSlug: string;
  generatedAt: string;
  sourceFiles: {
    shotList: string;
    referenceMap: string;
    generationList: string;
    prompts: string[];
    config?: string | null;
  };
  summary: {
    totalShots: number;
    totalScenes: number;
    shotsWithBindings: number;
    shotsWithPrompts: number;
    assetsDefined: number;
    visualAssetsGenerated: number;
    visualAssetsTotal: number;
  };
  warnings: {
    unresolvedAliases: string[];
    shotsWithoutBindings: string[];
    shotsWithoutPrompts: string[];
  };
  scenes: StoryboardScene[];
  shots?: StoryboardShot[];
  assets?: StoryboardAsset[];
};

export async function loadProjectStoryboard(rootPath: string, projectSlug: string): Promise<ProjectStoryboard | null> {
  const storyboardPath = path.join(rootPath, "outputs", "projects", projectSlug, "storyboard", `${projectSlug}.storyboard.json`);

  try {
    const content = await readFile(storyboardPath, "utf8");
    return JSON.parse(content) as ProjectStoryboard;
  } catch {
    return null;
  }
}
