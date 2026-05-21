import { NextResponse } from "next/server";

import { retryTask } from "@/server/tasks/task-queue";

type TaskRetryRouteProps = {
  params: Promise<{
    slug: string;
    taskId: string;
  }>;
};

export async function POST(_: Request, { params }: TaskRetryRouteProps) {
  const { slug, taskId } = await params;

  try {
    const task = retryTask(slug, taskId);
    return NextResponse.json({ task });
  } catch (error) {
    const message = error instanceof Error ? error.message : "任务重试失败";
    return NextResponse.json(
      {
        error: {
          code: "TASK_RETRY_FAILED",
          message,
          details: { slug, taskId },
        },
      },
      { status: 400 },
    );
  }
}
