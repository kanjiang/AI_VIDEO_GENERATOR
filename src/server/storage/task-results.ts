import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

type PersistTaskResultInput = {
  taskId: string;
  projectSlug: string;
  shotId: string;
  providerName: string;
  providerTaskId: string | null;
  resultUrls: string[];
  rawPayload: unknown;
};

export type TaskResultManifest = {
  taskId: string;
  projectSlug: string;
  shotId: string;
  providerName: string;
  providerTaskId: string | null;
  resultUrls: string[];
  rawPayload: unknown;
  savedAt: string;
};

export async function persistTaskResultManifest(input: PersistTaskResultInput) {
  const outputDir = path.join(process.cwd(), "outputs", "projects", input.projectSlug, "shots", input.shotId);
  await mkdir(outputDir, { recursive: true });

  const manifestPath = path.join(outputDir, `${input.taskId}.result.json`);
  const manifest = {
    taskId: input.taskId,
    projectSlug: input.projectSlug,
    shotId: input.shotId,
    providerName: input.providerName,
    providerTaskId: input.providerTaskId,
    resultUrls: input.resultUrls,
    rawPayload: input.rawPayload,
    savedAt: new Date().toISOString(),
  };

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  return {
    manifestPath: path.relative(process.cwd(), manifestPath).replaceAll("\\", "/"),
  };
}

export async function readTaskResultManifest(manifestPath: string) {
  const absolutePath = path.join(process.cwd(), manifestPath);
  const raw = await readFile(absolutePath, "utf8");
  return JSON.parse(raw) as TaskResultManifest;
}
