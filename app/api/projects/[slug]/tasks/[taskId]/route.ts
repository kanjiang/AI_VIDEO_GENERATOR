import { NextResponse } from "next/server";
import { z } from "zod";

import { updateTaskState } from "@/server/tasks/task-queue";

const updateSchema = z.object({
  status: z.enum(["queued", "running", "succeeded", "failed"]),
  progress: z.number().int().min(0).max(100).optional(),
  lastError: z.string().min(1).nullable().optional(),
});

type TaskUpdateRouteProps = {
  params: Promise<{
    slug: string;
    taskId: string;
  }>;
};

export async function PATCH(request: Request, { params }: TaskUpdateRouteProps) {
  const { slug, taskId } = await params;
  const json = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "任务状态更新请求不合法",
          details: parsed.error.flatten(),
        },
      },
      { status: 400 },
    );
  }

  try {
    const task = updateTaskState(slug, taskId, parsed.data);
    return NextResponse.json({ task });
  } catch (error) {
    const message = error instanceof Error ? error.message : "任务状态更新失败";
    return NextResponse.json(
      {
        error: {
          code: "TASK_UPDATE_FAILED",
          message,
          details: { slug, taskId },
        },
      },
      { status: 400 },
    );
  }
}
