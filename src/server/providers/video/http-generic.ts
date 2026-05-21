import type {
  VideoProviderFetchResult,
  VideoProviderFetchResultInput,
  VideoProviderPollInput,
  VideoProviderSubmitInput,
  VideoProviderSubmitResult,
} from "@/server/providers/video/types";
import { mapHttpGenericSubmitBody, type HttpGenericSubmitBodyMode } from "@/server/providers/video/http-generic-submit-mapper";

type HttpGenericConfig = {
  submitUrl: string | null;
  submitBodyMode: HttpGenericSubmitBodyMode;
  submitBodyTemplate: string | null;
  statusUrlTemplate: string | null;
  resultUrlTemplate: string | null;
  authHeader: string;
  authScheme: string;
  authToken: string | null;
};

type HttpGenericConfigStatus = {
  requiredEnvVars: string[];
  optionalEnvVars: string[];
  configuredEnvVars: string[];
  missingEnvVars: string[];
  endpointPreview: string | null;
  notes: string[];
};

function normalizeSubmitBodyMode(value: string | undefined): HttpGenericSubmitBodyMode {
  return value?.trim().toLowerCase() === "template" ? "template" : "raw";
}

function getHttpGenericConfig(): HttpGenericConfig {
  return {
    submitUrl: process.env.VIDEO_HTTP_GENERIC_SUBMIT_URL?.trim() || null,
    submitBodyMode: normalizeSubmitBodyMode(process.env.VIDEO_HTTP_GENERIC_SUBMIT_BODY_MODE),
    submitBodyTemplate: process.env.VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE?.trim() || null,
    statusUrlTemplate: process.env.VIDEO_HTTP_GENERIC_STATUS_URL_TEMPLATE?.trim() || null,
    resultUrlTemplate: process.env.VIDEO_HTTP_GENERIC_RESULT_URL_TEMPLATE?.trim() || null,
    authHeader: process.env.VIDEO_HTTP_GENERIC_AUTH_HEADER?.trim() || "Authorization",
    authScheme: process.env.VIDEO_HTTP_GENERIC_AUTH_SCHEME?.trim() || "Bearer",
    authToken: process.env.VIDEO_HTTP_GENERIC_AUTH_TOKEN?.trim() || null,
  };
}

function extractMessage(payload: unknown, fallback: string) {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const candidate = payload as Record<string, unknown>;
    const message = candidate.message ?? candidate.error ?? candidate.detail;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

function extractProviderTaskId(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidate = payload as Record<string, unknown>;
  const providerTaskId = candidate.providerTaskId ?? candidate.taskId ?? candidate.id ?? candidate.jobId;
  return typeof providerTaskId === "string" && providerTaskId.trim() ? providerTaskId : null;
}

function extractProgress(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidate = payload as Record<string, unknown>;
  const progress = candidate.progress;
  return typeof progress === "number" && Number.isFinite(progress) ? Math.max(0, Math.min(100, Math.round(progress))) : null;
}

function normalizeStatus(payload: unknown): VideoProviderSubmitResult["status"] {
  if (!payload || typeof payload !== "object") {
    return "queued";
  }

  const candidate = payload as Record<string, unknown>;
  const rawStatus = candidate.status ?? candidate.state;

  if (typeof rawStatus !== "string") {
    return "queued";
  }

  const normalized = rawStatus.trim().toLowerCase();

  if (["running", "processing", "in_progress"].includes(normalized)) {
    return "running";
  }

  if (["succeeded", "success", "completed", "done"].includes(normalized)) {
    return "succeeded";
  }

  if (["failed", "error", "errored"].includes(normalized)) {
    return "failed";
  }

  return "queued";
}

async function readResponsePayload(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }

  return response.text().catch(() => null);
}

export function isHttpGenericConfigured() {
  return Boolean(getHttpGenericConfig().submitUrl);
}

export function isHttpGenericPollingConfigured() {
  return Boolean(getHttpGenericConfig().statusUrlTemplate);
}

export function isHttpGenericResultFetchConfigured() {
  return Boolean(getHttpGenericConfig().resultUrlTemplate);
}

export function getHttpGenericConfigStatus(): HttpGenericConfigStatus {
  const config = getHttpGenericConfig();
  const requiredEnvVars = ["VIDEO_HTTP_GENERIC_SUBMIT_URL"];
  const optionalEnvVars = [
    "VIDEO_HTTP_GENERIC_SUBMIT_BODY_MODE",
    "VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE",
    "VIDEO_HTTP_GENERIC_STATUS_URL_TEMPLATE",
    "VIDEO_HTTP_GENERIC_RESULT_URL_TEMPLATE",
    "VIDEO_HTTP_GENERIC_AUTH_HEADER",
    "VIDEO_HTTP_GENERIC_AUTH_SCHEME",
    "VIDEO_HTTP_GENERIC_AUTH_TOKEN",
  ];
  const configuredEnvVars = [
    config.submitUrl ? "VIDEO_HTTP_GENERIC_SUBMIT_URL" : null,
    process.env.VIDEO_HTTP_GENERIC_SUBMIT_BODY_MODE?.trim() ? "VIDEO_HTTP_GENERIC_SUBMIT_BODY_MODE" : null,
    config.submitBodyTemplate ? "VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE" : null,
    config.statusUrlTemplate ? "VIDEO_HTTP_GENERIC_STATUS_URL_TEMPLATE" : null,
    config.resultUrlTemplate ? "VIDEO_HTTP_GENERIC_RESULT_URL_TEMPLATE" : null,
    process.env.VIDEO_HTTP_GENERIC_AUTH_HEADER?.trim() ? "VIDEO_HTTP_GENERIC_AUTH_HEADER" : null,
    process.env.VIDEO_HTTP_GENERIC_AUTH_SCHEME?.trim() ? "VIDEO_HTTP_GENERIC_AUTH_SCHEME" : null,
    config.authToken ? "VIDEO_HTTP_GENERIC_AUTH_TOKEN" : null,
  ].filter((value): value is string => Boolean(value));

  return {
    requiredEnvVars,
    optionalEnvVars,
    configuredEnvVars,
    missingEnvVars: requiredEnvVars.filter((envVar) => !configuredEnvVars.includes(envVar)),
    endpointPreview: config.submitUrl,
    notes: [
      "未配置鉴权 token 时，将以匿名请求方式提交。",
      `当前提交 body 模式为 ${config.submitBodyMode}。raw = 直接发送内部 payload；template = 通过 JSON 模板映射外部 API body。`,
      config.submitBodyMode === "template"
        ? config.submitBodyTemplate
          ? "已配置 VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE，可将 prompt/shot/generation 字段映射到任意外部请求结构。"
          : "当前为 template 模式，但缺少 VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE。"
        : "未启用模板映射时，将直接把内部 payload 提交给外部 API。",
      `默认鉴权头为 ${config.authHeader}，默认 scheme 为 ${config.authScheme}。`,
      config.statusUrlTemplate ? `状态轮询模板已配置：${config.statusUrlTemplate}` : "未配置 VIDEO_HTTP_GENERIC_STATUS_URL_TEMPLATE 时，无法同步远端任务状态。",
      config.resultUrlTemplate ? `结果抓取模板已配置：${config.resultUrlTemplate}` : "未配置 VIDEO_HTTP_GENERIC_RESULT_URL_TEMPLATE 时，无法抓取远端输出结果。",
    ],
  };
}

function buildTemplatedUrl(
  template: string,
  input: Pick<VideoProviderPollInput, "providerTaskId" | "taskId" | "projectSlug" | "shotId">,
) {
  return template
    .replaceAll("{providerTaskId}", encodeURIComponent(input.providerTaskId))
    .replaceAll("{taskId}", encodeURIComponent(input.taskId))
    .replaceAll("{projectSlug}", encodeURIComponent(input.projectSlug))
    .replaceAll("{shotId}", encodeURIComponent(input.shotId));
}

function buildHeaders(config: HttpGenericConfig) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (config.authToken) {
    headers[config.authHeader] = `${config.authScheme} ${config.authToken}`.trim();
  }

  return headers;
}

export async function submitHttpGenericTask(input: VideoProviderSubmitInput): Promise<VideoProviderSubmitResult> {
  const config = getHttpGenericConfig();

  if (!config.submitUrl) {
    throw new Error("未配置环境变量 VIDEO_HTTP_GENERIC_SUBMIT_URL");
  }

  const requestBody = mapHttpGenericSubmitBody(input, {
    mode: config.submitBodyMode,
    template: config.submitBodyTemplate,
  });

  const response = await fetch(config.submitUrl, {
    method: "POST",
    headers: buildHeaders(config),
    body: JSON.stringify(requestBody),
  });

  const payload = await readResponsePayload(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, `HTTP provider 提交失败: ${response.status}`));
  }

  return {
    providerTaskId: extractProviderTaskId(payload),
    status: normalizeStatus(payload),
    progress: extractProgress(payload) ?? 0,
    lastError: null,
  };
}

export async function pollHttpGenericTask(input: VideoProviderPollInput): Promise<VideoProviderSubmitResult> {
  const config = getHttpGenericConfig();

  if (!config.statusUrlTemplate) {
    throw new Error("未配置环境变量 VIDEO_HTTP_GENERIC_STATUS_URL_TEMPLATE");
  }

  const response = await fetch(buildTemplatedUrl(config.statusUrlTemplate, input), {
    method: "GET",
    headers: buildHeaders(config),
  });

  const payload = await readResponsePayload(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, `HTTP provider 状态轮询失败: ${response.status}`));
  }

  const status = normalizeStatus(payload);
  const progress = extractProgress(payload) ?? (status === "succeeded" ? 100 : input.currentProgress);

  return {
    providerTaskId: extractProviderTaskId(payload) ?? input.providerTaskId,
    status,
    progress,
    lastError: status === "failed" ? extractMessage(payload, input.currentLastError ?? "provider 返回失败状态") : null,
  };
}

function extractResultUrls(payload: unknown): string[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const candidate = payload as Record<string, unknown>;
  const possibleLists = [candidate.resultUrls, candidate.urls, candidate.results, candidate.outputs];

  for (const possibleList of possibleLists) {
    if (!Array.isArray(possibleList)) {
      continue;
    }

    const urls = possibleList
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (item && typeof item === "object") {
          const objectItem = item as Record<string, unknown>;
          const value = objectItem.url ?? objectItem.fileUrl ?? objectItem.downloadUrl ?? objectItem.href;
          return typeof value === "string" ? value.trim() : "";
        }

        return "";
      })
      .filter(Boolean);

    if (urls.length > 0) {
      return urls;
    }
  }

  return [];
}

export async function fetchHttpGenericResult(input: VideoProviderFetchResultInput): Promise<VideoProviderFetchResult> {
  const config = getHttpGenericConfig();

  if (!config.resultUrlTemplate) {
    throw new Error("未配置环境变量 VIDEO_HTTP_GENERIC_RESULT_URL_TEMPLATE");
  }

  const response = await fetch(buildTemplatedUrl(config.resultUrlTemplate, input), {
    method: "GET",
    headers: buildHeaders(config),
  });

  const payload = await readResponsePayload(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, `HTTP provider 结果抓取失败: ${response.status}`));
  }

  return {
    providerTaskId: extractProviderTaskId(payload) ?? input.providerTaskId,
    resultUrls: extractResultUrls(payload),
    rawPayload: payload,
  };
}
