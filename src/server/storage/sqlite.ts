import fs from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";

let database: Database.Database | null = null;

function ensureDatabaseFile() {
  const dataDir = path.join(process.cwd(), ".app-data");
  fs.mkdirSync(dataDir, { recursive: true });
  return path.join(dataDir, "ai-video-generator.sqlite");
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS task_queue (
      id TEXT PRIMARY KEY,
      project_slug TEXT NOT NULL,
      shot_id TEXT NOT NULL,
      provider_name TEXT NOT NULL,
      provider_task_id TEXT,
      result_urls TEXT,
      output_manifest_path TEXT,
      status TEXT NOT NULL,
      progress INTEGER NOT NULL DEFAULT 0,
      retry_count INTEGER NOT NULL DEFAULT 0,
      last_error TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_task_queue_project_slug ON task_queue(project_slug);
  `);

  const columns = db.prepare("PRAGMA table_info(task_queue)").all() as Array<{ name: string }>;
  const hasProviderTaskId = columns.some((column) => column.name === "provider_task_id");
  const hasResultUrls = columns.some((column) => column.name === "result_urls");
  const hasOutputManifestPath = columns.some((column) => column.name === "output_manifest_path");
  const hasRetryCount = columns.some((column) => column.name === "retry_count");
  const hasLastError = columns.some((column) => column.name === "last_error");

  if (!hasProviderTaskId) {
    db.exec("ALTER TABLE task_queue ADD COLUMN provider_task_id TEXT");
  }

  if (!hasResultUrls) {
    db.exec("ALTER TABLE task_queue ADD COLUMN result_urls TEXT");
  }

  if (!hasOutputManifestPath) {
    db.exec("ALTER TABLE task_queue ADD COLUMN output_manifest_path TEXT");
  }

  if (!hasRetryCount) {
    db.exec("ALTER TABLE task_queue ADD COLUMN retry_count INTEGER NOT NULL DEFAULT 0");
  }

  if (!hasLastError) {
    db.exec("ALTER TABLE task_queue ADD COLUMN last_error TEXT");
  }
}

export function getDatabase() {
  if (database) {
    return database;
  }

  const filePath = ensureDatabaseFile();
  database = new Database(filePath);
  migrate(database);
  return database;
}
