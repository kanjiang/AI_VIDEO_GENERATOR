import type { VideoProviderSubmitInput } from "@/server/providers/video/types";

export type HttpGenericSubmitBodyMode = "raw" | "template";

type TemplateContext = Record<string, unknown>;

function flattenContext(prefix: string, value: unknown, context: TemplateContext) {
  if (!prefix) {
    return;
  }

  context[prefix] = value;

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      flattenContext(`${prefix}.${index}`, item, context);
    });
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, nestedValue] of Object.entries(value)) {
      flattenContext(`${prefix}.${key}`, nestedValue, context);
    }
  }
}

function buildTemplateContext(input: VideoProviderSubmitInput) {
  const context: TemplateContext = {
    taskId: input.taskId,
    projectSlug: input.projectSlug,
    shotId: input.shotId,
    payload: input.payload,
  };

  flattenContext("payload", input.payload, context);
  flattenContext("prompt", input.payload.prompt, context);
  flattenContext("shot", input.payload.shot, context);
  flattenContext("generation", input.payload.generation, context);
  flattenContext("bindingAssets", input.payload.bindingAssets, context);

  return context;
}

function renderInlinePlaceholder(source: string, context: TemplateContext) {
  return source.replaceAll(/{{\s*([^}]+)\s*}}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    const value = context[key];

    if (value === undefined || value === null) {
      return "";
    }

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }

    return JSON.stringify(value);
  });
}

function renderTemplateNode(node: unknown, context: TemplateContext): unknown {
  if (typeof node === "string") {
    const exactMatch = node.match(/^{{\s*([^}]+)\s*}}$/);

    if (exactMatch) {
      const key = exactMatch[1]?.trim() ?? "";
      return context[key] ?? null;
    }

    return renderInlinePlaceholder(node, context);
  }

  if (Array.isArray(node)) {
    return node.map((item) => renderTemplateNode(item, context));
  }

  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [key, renderTemplateNode(value, context)]),
    );
  }

  return node;
}

export function mapHttpGenericSubmitBody(input: VideoProviderSubmitInput, options: { mode: HttpGenericSubmitBodyMode; template: string | null }) {
  if (options.mode === "raw") {
    return input.payload;
  }

  if (!options.template) {
    throw new Error("已启用 template 模式，但未配置 VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE");
  }

  let parsedTemplate: unknown;

  try {
    parsedTemplate = JSON.parse(options.template);
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误";
    throw new Error(`VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE 不是合法 JSON: ${message}`);
  }

  if (!parsedTemplate || typeof parsedTemplate !== "object") {
    throw new Error("VIDEO_HTTP_GENERIC_SUBMIT_BODY_TEMPLATE 必须是 JSON object 或 array");
  }

  return renderTemplateNode(parsedTemplate, buildTemplateContext(input));
}
