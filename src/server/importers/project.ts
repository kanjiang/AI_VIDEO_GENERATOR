import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseMarkdownTables, sanitizeCell } from "./markdown";

type ImportWarning = {
  code: string;
  message: string;
  sourcePath?: string;
};

type ImportedDocument = {
  docType: string;
  sourcePath: string;
  status: "parsed" | "missing";
};

type ImportedShot = {
  shotNo: string;
  sceneNo: string;
  framing: string;
  cameraMove: string;
  visualAction: string;
  dialogueOrSound: string;
  duration: string;
  notes: string;
};

type ImportedBinding = {
  shotNo: string;
  assets: string[];
};

type ImportedGenerationItem = {
  shotNo: string;
  duration: string;
  sceneNo: string;
  summary: string;
  assets: string[];
};

export type ImportProjectResult = {
  projectId: string;
  documents: ImportedDocument[];
  summary: {
    stage: string;
    message: string;
    shots: number;
    bindings: number;
    generationItems: number;
  };
  warnings: ImportWarning[];
  data: {
    shots: ImportedShot[];
    bindings: ImportedBinding[];
    generationItems: ImportedGenerationItem[];
  };
};

function normalizeShotNo(value: string) {
  return value.padStart(3, "0");
}

function extractAssetsFromReferenceCell(cell: string) {
  const matches = cell.matchAll(/\(([^)]+)\)/g);
  return [...matches].map((match) => sanitizeCell(match[1] ?? ""));
}

function extractAssetsFromGenerationCell(cell: string) {
  return sanitizeCell(cell)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => value !== "无（纯黑）");
}

function findTableByHeaders(content: string, expected: string[]) {
  const tables = parseMarkdownTables(content);
  return tables.find((table) => expected.every((header, index) => table.headers[index] === header));
}

async function readOptionalFile(filePath: string) {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    return null;
  }
}

function parseShotList(content: string) {
  const table = findTableByHeaders(content, ["镜号", "场次", "景别", "机位/运动", "画面内容", "台词/声音", "时长", "备注"]);

  if (!table) {
    throw new Error("shot-list 表头无法识别");
  }

  return table.rows.map((row) => ({
    shotNo: normalizeShotNo(sanitizeCell(row[0] ?? "")),
    sceneNo: sanitizeCell(row[1] ?? ""),
    framing: sanitizeCell(row[2] ?? ""),
    cameraMove: sanitizeCell(row[3] ?? ""),
    visualAction: sanitizeCell(row[4] ?? ""),
    dialogueOrSound: sanitizeCell(row[5] ?? ""),
    duration: sanitizeCell(row[6] ?? ""),
    notes: sanitizeCell(row[7] ?? ""),
  }));
}

function parseReferenceMap(content: string) {
  const tables = parseMarkdownTables(content).filter(
    (table) => table.headers[0] === "Shot" && table.headers[1] === "推荐写入的 @image",
  );

  return tables.flatMap((table) =>
    table.rows.map((row) => ({
      shotNo: normalizeShotNo(sanitizeCell(row[0] ?? "")),
      assets: extractAssetsFromReferenceCell(row[1] ?? ""),
    })),
  );
}

function parseGenerationList(content: string) {
  const tables = parseMarkdownTables(content).filter(
    (table) => table.headers[0] === "序号" && table.headers[1] === "Shot" && table.headers[2] === "时长",
  );

  return tables.flatMap((table) =>
    table.rows.map((row) => ({
      shotNo: normalizeShotNo(sanitizeCell(row[1] ?? "")),
      duration: sanitizeCell(row[2] ?? ""),
      sceneNo: sanitizeCell(row[3] ?? ""),
      summary: sanitizeCell(row[4] ?? ""),
      assets: extractAssetsFromGenerationCell(row[6] ?? ""),
    })),
  );
}

export async function importProjectFromWorkspace(rootPath: string, projectSlug: string): Promise<ImportProjectResult> {
  const screenplayDir = path.join(rootPath, "screenplay");
  const shotListPath = path.join(screenplayDir, `${projectSlug}-shot-list.md`);
  const referenceMapPath = path.join(screenplayDir, `${projectSlug}-seedance-reference-map.md`);
  const generationListPath = path.join(screenplayDir, `${projectSlug}-final-generation-list.md`);

  const warnings: ImportWarning[] = [];
  const documents: ImportedDocument[] = [];

  const shotListContent = await readOptionalFile(shotListPath);
  const referenceMapContent = await readOptionalFile(referenceMapPath);
  const generationListContent = await readOptionalFile(generationListPath);

  documents.push({ docType: "shotList", sourcePath: path.relative(rootPath, shotListPath), status: shotListContent ? "parsed" : "missing" });
  documents.push({ docType: "referenceMap", sourcePath: path.relative(rootPath, referenceMapPath), status: referenceMapContent ? "parsed" : "missing" });
  documents.push({ docType: "generationList", sourcePath: path.relative(rootPath, generationListPath), status: generationListContent ? "parsed" : "missing" });

  if (!shotListContent) {
    throw new Error(`缺少核心文件: ${path.relative(rootPath, shotListPath)}`);
  }

  const shots = parseShotList(shotListContent);
  const bindings = referenceMapContent ? parseReferenceMap(referenceMapContent) : [];
  const generationItems = generationListContent ? parseGenerationList(generationListContent) : [];

  if (!referenceMapContent) {
    warnings.push({ code: "REFERENCE_MAP_MISSING", message: "未发现 reference map，镜头绑定将为空。", sourcePath: path.relative(rootPath, referenceMapPath) });
  }

  if (!generationListContent) {
    warnings.push({ code: "GENERATION_LIST_MISSING", message: "未发现 final generation list，任务模板将为空。", sourcePath: path.relative(rootPath, generationListPath) });
  }

  const bindingShotSet = new Set(bindings.map((item) => item.shotNo));
  const shotSet = new Set(shots.map((item) => item.shotNo));
  const danglingBindings = [...bindingShotSet].filter((shotNo) => !shotSet.has(shotNo));

  if (danglingBindings.length > 0) {
    warnings.push({ code: "IMPORT_ALIGNMENT_CONFLICT", message: `reference map 中存在未匹配镜号: ${danglingBindings.join(", ")}` });
  }

  return {
    projectId: `import-${projectSlug}`,
    documents,
    summary: {
      stage: "imported",
      message: "已完成 shot-list、reference-map、final-generation-list 的真实解析。",
      shots: shots.length,
      bindings: bindings.length,
      generationItems: generationItems.length,
    },
    warnings,
    data: {
      shots,
      bindings,
      generationItems,
    },
  };
}
