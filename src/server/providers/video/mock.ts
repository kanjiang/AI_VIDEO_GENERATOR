import type {
  VideoProviderFetchResult,
  VideoProviderFetchResultInput,
  VideoProviderPollInput,
  VideoProviderSubmitInput,
  VideoProviderSubmitResult,
} from "@/server/providers/video/types";

function sanitizeToken(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export async function submitMockTask(input: VideoProviderSubmitInput): Promise<VideoProviderSubmitResult> {
  return {
    providerTaskId: `mock_remote_${sanitizeToken(input.projectSlug)}_${sanitizeToken(input.shotId)}`,
    status: "queued",
    progress: 0,
    lastError: null,
  };
}

export async function pollMockTask(input: VideoProviderPollInput): Promise<VideoProviderSubmitResult> {
  return {
    providerTaskId: input.providerTaskId,
    status: input.currentStatus,
    progress: input.currentProgress,
    lastError: input.currentLastError,
  };
}

export async function fetchMockTaskResult(input: VideoProviderFetchResultInput): Promise<VideoProviderFetchResult> {
  return {
    providerTaskId: input.providerTaskId,
    resultUrls: [`mock://outputs/${sanitizeToken(input.projectSlug)}/${sanitizeToken(input.shotId)}/result.mp4`],
    rawPayload: {
      providerTaskId: input.providerTaskId,
      resultUrls: [`mock://outputs/${sanitizeToken(input.projectSlug)}/${sanitizeToken(input.shotId)}/result.mp4`],
    },
  };
}

export function getMockConfigStatus() {
  return {
    requiredEnvVars: [],
    optionalEnvVars: [],
    configuredEnvVars: [],
    missingEnvVars: [],
    endpointPreview: null,
    notes: ["Mock provider 无需环境变量，可直接用于本地流程验证。"],
  };
}
