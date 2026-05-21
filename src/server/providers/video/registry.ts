import {
  VIDEO_PROVIDER_NAMES,
  type VideoProviderConfigStatus,
  type VideoProviderDefinition,
  type VideoProviderName,
  type VideoProviderSummary,
} from "@/server/providers/video/types";
import { fetchHttpGenericResult, getHttpGenericConfigStatus, isHttpGenericConfigured, pollHttpGenericTask, submitHttpGenericTask } from "@/server/providers/video/http-generic";
import { fetchMockTaskResult, getMockConfigStatus, pollMockTask, submitMockTask } from "@/server/providers/video/mock";

function sanitizeToken(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

const providers: Record<VideoProviderName, VideoProviderDefinition> = {
  mock: {
    name: "mock",
    label: "Mock Provider",
    description: "本地占位引擎，用来验证任务提交流程、状态切换和失败重试。",
    isAvailable: true,
    capabilities: {
      supportsImageBindings: true,
      supportsBatchSubmit: true,
      supportsStatusPolling: true,
    },
    buildTaskId: ({ projectSlug, shotId, kind }) => `task_${kind}_${sanitizeToken(projectSlug)}_${sanitizeToken(shotId)}_mock`,
    submitTask: submitMockTask,
    pollTask: pollMockTask,
    fetchResult: fetchMockTaskResult,
  },
  "http-generic": {
    name: "http-generic",
    label: "Generic HTTP",
    description: "通用 HTTP 提交器。配置 VIDEO_HTTP_GENERIC_SUBMIT_URL 后即可把镜头任务 POST 到外部视频 API。",
    isAvailable: isHttpGenericConfigured(),
    capabilities: {
      supportsImageBindings: true,
      supportsBatchSubmit: false,
      supportsStatusPolling: true,
    },
    buildTaskId: ({ projectSlug, shotId, kind }) => `task_${kind}_${sanitizeToken(projectSlug)}_${sanitizeToken(shotId)}_http_generic`,
    submitTask: submitHttpGenericTask,
    pollTask: pollHttpGenericTask,
    fetchResult: fetchHttpGenericResult,
  },
};

export const DEFAULT_VIDEO_PROVIDER_NAME: VideoProviderName = "mock";

export function getVideoProvider(name: string) {
  const provider = providers[name as VideoProviderName];

  if (!provider) {
    throw new Error(`未注册的视频 provider: ${name}`);
  }

  return provider;
}

export function listVideoProviders(): VideoProviderSummary[] {
  return VIDEO_PROVIDER_NAMES.map((name) => {
    const { buildTaskId: _, ...provider } = providers[name];
    return provider;
  });
}

export function assertVideoProviderAvailable(name: string) {
  const provider = getVideoProvider(name);

  if (!provider.isAvailable) {
    throw new Error(`provider ${provider.label} 尚未启用`);
  }

  return provider;
}

export function listVideoProviderConfigStatus(): VideoProviderConfigStatus[] {
  return VIDEO_PROVIDER_NAMES.map((name) => {
    const provider = providers[name];
    const config = name === "http-generic" ? getHttpGenericConfigStatus() : getMockConfigStatus();

    return {
      name: provider.name,
      label: provider.label,
      description: provider.description,
      isAvailable: provider.isAvailable,
      requiredEnvVars: config.requiredEnvVars,
      optionalEnvVars: config.optionalEnvVars,
      configuredEnvVars: config.configuredEnvVars,
      missingEnvVars: config.missingEnvVars,
      endpointPreview: config.endpointPreview,
      notes: config.notes,
    };
  });
}
