export const VIDEO_PROVIDER_NAMES = ["mock", "http-generic"] as const;

export type VideoProviderName = (typeof VIDEO_PROVIDER_NAMES)[number];

export type VideoProviderCapabilities = {
  supportsImageBindings: boolean;
  supportsBatchSubmit: boolean;
  supportsStatusPolling: boolean;
};

export type VideoProviderTaskIdInput = {
  projectSlug: string;
  shotId: string;
  kind: "seed" | "submit";
};

export type VideoProviderSubmitPayload = {
  taskId: string;
  projectSlug: string;
  shotId: string;
  prompt: {
    title: string;
    text: string;
    imageBindings: string[];
    providerStyle: string;
  };
  shot: {
    sceneNo: string;
    framing: string;
    cameraMove: string;
    visualAction: string;
    dialogueOrSound: string;
    duration: string;
    notes: string;
  } | null;
  bindingAssets: string[];
  generation: {
    duration: string;
    sceneNo: string;
    summary: string;
    assets: string[];
  } | null;
};

export type VideoProviderSubmitInput = {
  taskId: string;
  projectSlug: string;
  shotId: string;
  payload: VideoProviderSubmitPayload;
};

export type VideoProviderPollInput = {
  taskId: string;
  projectSlug: string;
  shotId: string;
  providerTaskId: string;
  currentStatus: "queued" | "running" | "succeeded" | "failed";
  currentProgress: number;
  currentLastError: string | null;
};

export type VideoProviderFetchResultInput = {
  taskId: string;
  projectSlug: string;
  shotId: string;
  providerTaskId: string;
};

export type VideoProviderSubmitResult = {
  providerTaskId: string | null;
  status: "queued" | "running" | "succeeded" | "failed";
  progress: number;
  lastError: string | null;
};

export type VideoProviderFetchResult = {
  providerTaskId: string | null;
  resultUrls: string[];
  rawPayload: unknown;
};

export type VideoProviderDefinition = {
  name: VideoProviderName;
  label: string;
  description: string;
  isAvailable: boolean;
  capabilities: VideoProviderCapabilities;
  buildTaskId: (input: VideoProviderTaskIdInput) => string;
  submitTask: (input: VideoProviderSubmitInput) => Promise<VideoProviderSubmitResult>;
  pollTask: (input: VideoProviderPollInput) => Promise<VideoProviderSubmitResult>;
  fetchResult: (input: VideoProviderFetchResultInput) => Promise<VideoProviderFetchResult>;
};

export type VideoProviderSummary = Omit<VideoProviderDefinition, "buildTaskId" | "submitTask" | "pollTask" | "fetchResult">;

export type VideoProviderConfigStatus = {
  name: VideoProviderName;
  label: string;
  description: string;
  isAvailable: boolean;
  requiredEnvVars: string[];
  optionalEnvVars: string[];
  configuredEnvVars: string[];
  missingEnvVars: string[];
  endpointPreview: string | null;
  notes: string[];
};
