import * as fs from "fs";
import * as path from "path";

import { parseVideoPrompts } from "./parser";
import type { ParsedVideoPrompts, ShotAssetMount } from "./parser";

export type AssetFileInfo = {
  alias: string;
  fileName: string;
  exists: boolean;
};

export type ScreenplayEntry = {
  label: string;
  relativePath: string;
  parsed: ParsedVideoPrompts;
};

export type ProjectInfo = {
  slug: string;
  displayName: string;
  screenplays: ScreenplayEntry[];
  assets: AssetFileInfo[];
};

export type ShotBrowserData = {
  projects: ProjectInfo[];
};

const SKIP_DIRS = new Set([
  "node_modules", ".next", ".next-runtime", ".claude", ".superpowers",
  ".app-data", ".tmp-video-frames", "app", "src", "scripts", "output",
  "outputs", "video", "assets", "screenplay", ".git",
]);

function discoverProjects(workspaceRoot: string): string[] {
  const entries = fs.readdirSync(workspaceRoot, { withFileTypes: true });
  const projectDirs: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    if (entry.name.startsWith(".")) continue;

    const dirPath = path.join(workspaceRoot, entry.name);
    const hasScreenplay = fs.existsSync(path.join(dirPath, "screenplay"));
    const hasVideoPromptsAtRoot = fs.readdirSync(dirPath).some(
      (f) => f.includes("视频提示词") || f.includes("video-prompts"),
    );

    if (hasScreenplay || hasVideoPromptsAtRoot) {
      projectDirs.push(entry.name);
    }
  }

  const sharedScreenplay = path.join(workspaceRoot, "screenplay");
  if (fs.existsSync(sharedScreenplay)) {
    const subDirs = fs.readdirSync(sharedScreenplay, { withFileTypes: true });
    for (const sub of subDirs) {
      if (sub.isDirectory()) {
        const subPath = path.join(sharedScreenplay, sub.name);
        const hasVideoPrompts = fs.readdirSync(subPath).some(
          (f) => f.includes("video-prompts") || f.includes("视频提示词"),
        );
        if (hasVideoPrompts) {
          projectDirs.push(`screenplay/${sub.name}`);
        }
      }
    }
  }

  return projectDirs;
}

function findVideoPromptFiles(projectPath: string): { label: string; filePath: string }[] {
  const results: { label: string; filePath: string }[] = [];

  const screenplayDir = path.join(projectPath, "screenplay");
  if (fs.existsSync(screenplayDir)) {
    const files = fs.readdirSync(screenplayDir);
    for (const f of files) {
      if ((f.includes("video-prompts") || f.includes("视频提示词")) && f.endsWith(".md")) {
        const label = f
          .replace(/\.md$/, "")
          .replace(/-video-prompts$/, "")
          .replace(/_视频提示词$/, "");
        results.push({
          label: label || "video-prompts",
          filePath: path.join(screenplayDir, f),
        });
      }
    }
  }

  const rootFiles = fs.readdirSync(projectPath);
  for (const f of rootFiles) {
    if ((f.includes("video-prompts") || f.includes("视频提示词")) && f.endsWith(".md")) {
      const fullPath = path.join(projectPath, f);
      if (fs.statSync(fullPath).isFile()) {
        const label = f
          .replace(/\.md$/, "")
          .replace(/-video-prompts$/, "")
          .replace(/_视频提示词$/, "");
        results.push({
          label: label || "video-prompts",
          filePath: fullPath,
        });
      }
    }
  }

  return results;
}

function scanAssetFiles(projectPath: string): AssetFileInfo[] {
  const assetsDir = path.join(projectPath, "assets");
  if (!fs.existsSync(assetsDir)) return [];

  const files = fs.readdirSync(assetsDir);
  return files
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .map((f) => {
      const nameWithoutExt = f.replace(/\.(png|jpg|jpeg|webp)$/i, "");
      return {
        alias: nameWithoutExt,
        fileName: f,
        exists: true,
      };
    });
}

function slugToDisplayName(slug: string): string {
  const nameMap: Record<string, string> = {
    "body-cells-animation-series": "人体细胞动画系列",
    "car-adventure-the-map": "汽车冒险·地图",
    "car-number-memory": "汽车记数字",
    "cars-mcqueen-legacy": "汽车总动员·传承之路",
    "cat-dog-soul-swap": "猫狗灵魂互换",
    "dingyuxi-concert-qversion": "丁禹兮演唱会Q版",
    "laowang-chibi-mukbang": "老王吃播",
    "lianaiing-mv": "恋爱ING MV",
    "my-cloud-buddy": "我的专属云朵",
    "supercar-explode-reassemble": "超跑重生",
    "the-deep-crown": "The Deep Crown 深海王冠",
    "zhengci-zhiwai-promo": "证词之外宣传片",
  };

  if (slug.startsWith("screenplay/")) {
    return slug.replace("screenplay/", "");
  }

  return nameMap[slug] ?? slug;
}

function assetMatchesMount(assetFileName: string, mount: ShotAssetMount): boolean {
  const normalizedAlias = mount.alias
    .replace(/[_\s\-]/g, "")
    .toLowerCase();
  const normalizedFile = assetFileName
    .replace(/\.(png|jpg|jpeg|webp)$/i, "")
    .replace(/[_\s\-]/g, "")
    .toLowerCase();

  return normalizedFile.includes(normalizedAlias) || normalizedAlias.includes(normalizedFile);
}

export function buildMatchedAssets(
  shotMounts: ShotAssetMount[],
  globalMounts: ShotAssetMount[],
  assetFiles: AssetFileInfo[],
): AssetFileInfo[] {
  const allMounts = [...shotMounts, ...globalMounts];
  const seen = new Set<string>();
  const matched: AssetFileInfo[] = [];

  for (const mount of allMounts) {
    if (seen.has(mount.alias)) continue;
    seen.add(mount.alias);

    const matchedAsset = assetFiles.find((a) => assetMatchesMount(a.fileName, mount));
    matched.push({
      alias: mount.alias,
      fileName: matchedAsset?.fileName ?? `${mount.alias}.png`,
      exists: !!matchedAsset,
    });
  }

  return matched;
}

export function scanAllProjects(workspaceRoot: string): ShotBrowserData {
  const projectSlugs = discoverProjects(workspaceRoot);
  const projects: ProjectInfo[] = [];

  for (const slug of projectSlugs) {
    const projectPath = path.join(workspaceRoot, slug);
    const promptFiles = findVideoPromptFiles(projectPath);
    if (promptFiles.length === 0) continue;

    const assets = scanAssetFiles(projectPath);
    const screenplays: ScreenplayEntry[] = [];

    for (const pf of promptFiles) {
      try {
        const content = fs.readFileSync(pf.filePath, "utf-8");
        const parsed = parseVideoPrompts(content);
        if (parsed.shots.length === 0) continue;

        const relativePath = path.relative(workspaceRoot, pf.filePath).replace(/\\/g, "/");
        screenplays.push({
          label: parsed.fileTitle || pf.label,
          relativePath,
          parsed,
        });
      } catch {
        continue;
      }
    }

    if (screenplays.length === 0) continue;

    projects.push({
      slug,
      displayName: slugToDisplayName(slug),
      screenplays,
      assets,
    });
  }

  projects.sort((a, b) => b.screenplays.length - a.screenplays.length);
  return { projects };
}
