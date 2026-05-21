import { NextResponse } from "next/server";
import { z } from "zod";

import { DEFAULT_VIDEO_PROVIDER_NAME } from "@/server/providers/video/registry";
import { VIDEO_PROVIDER_NAMES } from "@/server/providers/video/types";
import { submitProjectTasks } from "@/server/tasks/task-queue";

const submitSchema = z.object({
  shotIds: z.array(z.string().min(1)).min(1),
  providerName: z.enum(VIDEO_PROVIDER_NAMES).default(DEFAULT_VIDEO_PROVIDER_NAME),
});

type SubmitRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, { params }: SubmitRouteProps) {
  const { slug } = await params;
  const json = await request.json().catch(() => null);
  const parsed = submitSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "提交任务请求不合法",
          details: parsed.error.flatten(),
        },
      },
      { status: 400 },
    );
  }

  try {
    const tasks = await submitProjectTasks(process.cwd(), slug, parsed.data.providerName, parsed.data.shotIds);

    return NextResponse.json({
      projectSlug: slug,
      providerName: parsed.data.providerName,
      tasks,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "任务提交失败";
    return NextResponse.json(
      {
        error: {
          code: "TASK_SUBMIT_FAILED",
          message,
          details: { slug, providerName: parsed.data.providerName },
        },
      },
      { status: 400 },
    );
  }
}
