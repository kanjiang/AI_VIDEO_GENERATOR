import { importProjectFromWorkspace } from "@/server/importers/project";
import { DEFAULT_VIDEO_PROVIDER_NAME, assertVideoProviderAvailable, getVideoProvider } from "@/server/providers/video/registry";
import type { VideoProviderSubmitPayload } from "@/server/providers/video/types";
import { assemblePromptBundle } from "@/server/prompts/assembler";
import { getDatabase } from "@/server/storage/sqlite";
import { persistTaskResultManifest } from "@/server/storage/task-results";

export type PersistedTask = {
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
  createdAt: string;
  updatedAt: string;
};

type TaskRow = {
  id: string;
  shot_id: string;
  provider_name: string;
  provider_task_id: string | null;
  result_urls: string | null;
  output_manifest_path: string | null;
  status: PersistedTask["status"];
  progress: number;
  retry_count: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};

function mapTaskRow(row: TaskRow): PersistedTask {
  const resultUrls = row.result_urls ? (JSON.parse(row.result_urls) as string[]) : [];

  return {
    id: row.id,
    shotId: row.shot_id,
    providerName: row.provider_name,
    providerTaskId: row.provider_task_id,
    resultUrls,
    outputManifestPath: row.output_manifest_path,
    status: row.status,
    progress: row.progress,
    retryCount: row.retry_count,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function buildProviderSubmitPayload(
  rootPath: string,
  project: Awaited<ReturnType<typeof importProjectFromWorkspace>>,
  slug: string,
  taskId: string,
  shotId: string,
) {
  const shot = project.data.shots.find((item) => item.shotNo === shotId) ?? null;
  const binding = project.data.bindings.find((item) => item.shotNo === shotId);
  const generation = project.data.generationItems.find((item) => item.shotNo === shotId) ?? null;
  const prompt = await assemblePromptBundle(rootPath, slug, shotId);

  return {
    taskId,
    projectSlug: slug,
    shotId,
    prompt: {
      title: prompt.title,
      text: prompt.promptText,
      imageBindings: prompt.imageBindings,
      providerStyle: "seedance-v1",
    },
    shot: shot
      ? {
          sceneNo: shot.sceneNo,
          framing: shot.framing,
          cameraMove: shot.cameraMove,
          visualAction: shot.visualAction,
          dialogueOrSound: shot.dialogueOrSound,
          duration: shot.duration,
          notes: shot.notes,
        }
      : null,
    bindingAssets: binding?.assets ?? [],
    generation: generation
      ? {
          duration: generation.duration,
          sceneNo: generation.sceneNo,
          summary: generation.summary,
          assets: generation.assets,
        }
      : null,
  };
}

export async function buildProjectSubmitPayloadPreviews(rootPath: string, slug: string, shotIds?: string[]) {
  const project = await importProjectFromWorkspace(rootPath, slug);
  const resolvedShotIds = Array.from(
    new Set(shotIds?.length ? shotIds : project.data.generationItems.map((item) => item.shotNo).concat(project.data.shots.map((item) => item.shotNo))),
  ).sort();

  const previews = await Promise.all(
    resolvedShotIds.map(async (shotId) => {
      const taskId = `preview_${slug}_${shotId}_http_generic`;
      const payload = (await buildProviderSubmitPayload(rootPath, project, slug, taskId, shotId)) as VideoProviderSubmitPayload;

      return {
        taskId,
        shotId,
        payload,
      };
    }),
  );

  return previews;
}

export async function ensureProjectTaskSeed(rootPath: string, slug: string) {
  const db = getDatabase();
  const existingCount = db
    .prepare("SELECT COUNT(*) as count FROM task_queue WHERE project_slug = ?")
    .get(slug) as { count: number };

  if (existingCount.count > 0) {
    return;
  }

  const project = await importProjectFromWorkspace(rootPath, slug);
  const provider = getVideoProvider(DEFAULT_VIDEO_PROVIDER_NAME);
  const now = new Date().toISOString();
  const insert = db.prepare(
     `INSERT INTO task_queue (id, project_slug, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at)
      VALUES (@id, @projectSlug, @shotId, @providerName, @providerTaskId, @resultUrls, @outputManifestPath, @status, @progress, @retryCount, @lastError, @createdAt, @updatedAt)`,
  );

  const seedItems = project.data.generationItems.slice(0, 8).map((item, index) => ({
    id: provider.buildTaskId({ projectSlug: slug, shotId: item.shotNo, kind: "seed" }),
    projectSlug: slug,
    shotId: item.shotNo,
    providerName: provider.name,
    providerTaskId: null,
    resultUrls: null,
    outputManifestPath: null,
    status: (index < 2 ? "running" : "queued") as PersistedTask["status"],
    progress: index < 2 ? 40 + index * 15 : 0,
    retryCount: 0,
    lastError: null,
    createdAt: now,
    updatedAt: now,
  }));

  const transaction = db.transaction((rows: typeof seedItems) => {
    for (const row of rows) {
      insert.run(row);
    }
  });

  transaction(seedItems);
}

export async function listProjectTasks(rootPath: string, slug: string) {
  await ensureProjectTaskSeed(rootPath, slug);
  const db = getDatabase();
  const rows = db
    .prepare(
      `SELECT id, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at
       FROM task_queue
       WHERE project_slug = ?
       ORDER BY shot_id ASC`,
    )
    .all(slug) as TaskRow[];

  return rows.map(mapTaskRow);
}

export function getProjectTask(slug: string, taskId: string) {
  const db = getDatabase();
  const row = db
    .prepare(
      `SELECT id, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at
       FROM task_queue
       WHERE project_slug = ? AND id = ?`,
    )
    .get(slug, taskId) as TaskRow | undefined;

  return row ? mapTaskRow(row) : null;
}

export async function submitProjectTasks(rootPath: string, slug: string, providerName: string, shotIds: string[]) {
  const provider = assertVideoProviderAvailable(providerName);
  const project = await importProjectFromWorkspace(rootPath, slug);
  const db = getDatabase();
  const now = new Date().toISOString();
  const insert = db.prepare(
    `INSERT INTO task_queue (id, project_slug, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at)
     VALUES (@id, @projectSlug, @shotId, @providerName, @providerTaskId, @resultUrls, @outputManifestPath, @status, @progress, @retryCount, @lastError, @createdAt, @updatedAt)
     ON CONFLICT(id) DO UPDATE SET
       provider_name = excluded.provider_name,
       provider_task_id = excluded.provider_task_id,
       result_urls = excluded.result_urls,
       output_manifest_path = excluded.output_manifest_path,
       status = excluded.status,
       progress = excluded.progress,
       last_error = excluded.last_error,
       updated_at = excluded.updated_at`,
  );

  const rows = shotIds.map((shotId, index) => ({
    id: provider.buildTaskId({ projectSlug: slug, shotId, kind: "submit" }),
    projectSlug: slug,
    shotId,
    providerName: provider.name,
    providerTaskId: null,
    resultUrls: null,
    outputManifestPath: null,
    status: "queued" as const,
    progress: 0,
    retryCount: 0,
    lastError: null,
    createdAt: now,
    updatedAt: new Date(Date.now() + index).toISOString(),
  }));

  const transaction = db.transaction((items: typeof rows) => {
    for (const item of items) {
      insert.run(item);
    }
  });

  transaction(rows);

  const updateSubmission = db.prepare(
    `UPDATE task_queue
     SET provider_task_id = ?, status = ?, progress = ?, last_error = ?, updated_at = ?
     WHERE project_slug = ? AND id = ?`,
  );

  const resultRows: PersistedTask[] = [];

  for (const row of rows) {
    const payload = await buildProviderSubmitPayload(rootPath, project, slug, row.id, row.shotId);

    try {
      const submission = await provider.submitTask({
        taskId: row.id,
        projectSlug: slug,
        shotId: row.shotId,
        payload,
      });

      const updatedAt = new Date().toISOString();
      updateSubmission.run(
        submission.providerTaskId,
        submission.status,
        submission.progress,
        submission.lastError,
        updatedAt,
        slug,
        row.id,
      );

      resultRows.push({
        id: row.id,
        shotId: row.shotId,
        providerName: row.providerName,
        providerTaskId: submission.providerTaskId,
        resultUrls: [],
        outputManifestPath: null,
        status: submission.status,
        progress: submission.progress,
        retryCount: row.retryCount,
        lastError: submission.lastError,
        createdAt: row.createdAt,
        updatedAt,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "provider 提交失败";
      const updatedAt = new Date().toISOString();
      updateSubmission.run(null, "failed", 0, message, updatedAt, slug, row.id);

      resultRows.push({
        id: row.id,
        shotId: row.shotId,
        providerName: row.providerName,
        providerTaskId: null,
        resultUrls: [],
        outputManifestPath: null,
        status: "failed",
        progress: 0,
        retryCount: row.retryCount,
        lastError: message,
        createdAt: row.createdAt,
        updatedAt,
      });
    }
  }

  return resultRows;
}

export async function syncTaskWithProvider(slug: string, taskId: string) {
  const db = getDatabase();
  const current = db
    .prepare(
      `SELECT id, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at
       FROM task_queue
       WHERE project_slug = ? AND id = ?`,
    )
    .get(slug, taskId) as TaskRow | undefined;

  if (!current) {
    throw new Error(`任务不存在: ${taskId}`);
  }

  if (!current.provider_task_id) {
    throw new Error(`任务尚未绑定远端 providerTaskId: ${taskId}`);
  }

  const provider = assertVideoProviderAvailable(current.provider_name);

  if (!provider.capabilities.supportsStatusPolling) {
    throw new Error(`provider ${provider.label} 不支持状态轮询`);
  }

  const next = await provider.pollTask({
    taskId: current.id,
    projectSlug: slug,
    shotId: current.shot_id,
    providerTaskId: current.provider_task_id,
    currentStatus: current.status,
    currentProgress: current.progress,
    currentLastError: current.last_error,
  });

  const nextUpdatedAt = new Date().toISOString();

  db.prepare(
    `UPDATE task_queue
     SET provider_task_id = ?, status = ?, progress = ?, last_error = ?, updated_at = ?
     WHERE project_slug = ? AND id = ?`,
  ).run(next.providerTaskId ?? current.provider_task_id, next.status, next.progress, next.lastError, nextUpdatedAt, slug, taskId);

  return mapTaskRow({
    ...current,
    provider_task_id: next.providerTaskId ?? current.provider_task_id,
    status: next.status,
    progress: next.progress,
    last_error: next.lastError,
    updated_at: nextUpdatedAt,
  });
}

export async function fetchAndPersistTaskResult(slug: string, taskId: string) {
  const db = getDatabase();
  const current = db
    .prepare(
      `SELECT id, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at
       FROM task_queue
       WHERE project_slug = ? AND id = ?`,
    )
    .get(slug, taskId) as TaskRow | undefined;

  if (!current) {
    throw new Error(`任务不存在: ${taskId}`);
  }

  if (!current.provider_task_id) {
    throw new Error(`任务尚未绑定远端 providerTaskId: ${taskId}`);
  }

  if (current.status !== "succeeded") {
    throw new Error(`任务尚未完成，当前状态为 ${current.status}`);
  }

  const provider = assertVideoProviderAvailable(current.provider_name);
  const fetched = await provider.fetchResult({
    taskId: current.id,
    projectSlug: slug,
    shotId: current.shot_id,
    providerTaskId: current.provider_task_id,
  });

  const persisted = await persistTaskResultManifest({
    taskId: current.id,
    projectSlug: slug,
    shotId: current.shot_id,
    providerName: current.provider_name,
    providerTaskId: fetched.providerTaskId ?? current.provider_task_id,
    resultUrls: fetched.resultUrls,
    rawPayload: fetched.rawPayload,
  });

  const nextUpdatedAt = new Date().toISOString();
  db.prepare(
    `UPDATE task_queue
     SET provider_task_id = ?, result_urls = ?, output_manifest_path = ?, updated_at = ?
     WHERE project_slug = ? AND id = ?`,
  ).run(
    fetched.providerTaskId ?? current.provider_task_id,
    JSON.stringify(fetched.resultUrls),
    persisted.manifestPath,
    nextUpdatedAt,
    slug,
    taskId,
  );

  return mapTaskRow({
    ...current,
    provider_task_id: fetched.providerTaskId ?? current.provider_task_id,
    result_urls: JSON.stringify(fetched.resultUrls),
    output_manifest_path: persisted.manifestPath,
    updated_at: nextUpdatedAt,
  });
}

export function updateTaskState(
  slug: string,
  taskId: string,
  input: {
    status: PersistedTask["status"];
    progress?: number;
    lastError?: string | null;
  },
) {
  const db = getDatabase();
  const current = db
    .prepare(
      `SELECT id, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at
       FROM task_queue
       WHERE project_slug = ? AND id = ?`,
    )
    .get(slug, taskId) as TaskRow | undefined;

  if (!current) {
    throw new Error(`任务不存在: ${taskId}`);
  }

  const nextProgress = input.progress ?? current.progress;
  const nextError = input.lastError ?? null;
  const nextUpdatedAt = new Date().toISOString();

  db.prepare(
    `UPDATE task_queue
     SET status = ?, progress = ?, last_error = ?, updated_at = ?
     WHERE project_slug = ? AND id = ?`,
  ).run(input.status, nextProgress, nextError, nextUpdatedAt, slug, taskId);

  return mapTaskRow({
    ...current,
    status: input.status,
    progress: nextProgress,
    last_error: nextError,
    updated_at: nextUpdatedAt,
  });
}

export function retryTask(slug: string, taskId: string) {
  const db = getDatabase();
  const current = db
    .prepare(
      `SELECT id, shot_id, provider_name, provider_task_id, result_urls, output_manifest_path, status, progress, retry_count, last_error, created_at, updated_at
       FROM task_queue
       WHERE project_slug = ? AND id = ?`,
    )
    .get(slug, taskId) as TaskRow | undefined;

  if (!current) {
    throw new Error(`任务不存在: ${taskId}`);
  }

  const nextRetryCount = current.retry_count + 1;
  const nextUpdatedAt = new Date().toISOString();

  db.prepare(
    `UPDATE task_queue
     SET provider_task_id = ?, result_urls = ?, output_manifest_path = ?, status = ?, progress = ?, retry_count = ?, last_error = ?, updated_at = ?
     WHERE project_slug = ? AND id = ?`,
  ).run(null, null, null, "queued", 0, nextRetryCount, null, nextUpdatedAt, slug, taskId);

  return mapTaskRow({
    ...current,
    provider_task_id: null,
    result_urls: null,
    output_manifest_path: null,
    status: "queued",
    progress: 0,
    retry_count: nextRetryCount,
    last_error: null,
    updated_at: nextUpdatedAt,
  });
}
