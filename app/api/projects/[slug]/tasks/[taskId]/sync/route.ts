import { NextResponse } from "next/server";

import { syncTaskWithProvider } from "@/server/tasks/task-queue";

type TaskSyncRouteProps = {
  params: Promise<{
    slug: string;
    taskId: string;
  }>;
};

export async function POST(_: Request, { params }: TaskSyncRouteProps) {
  const { slug, taskId } = await params;

  try {
    const task = await syncTaskWithProvider(slug, taskId);
    return NextResponse.json({ task });
  } catch (error) {
    const message = error instanceof Error ? error.message : "任务远端同步失败";
    return NextResponse.json(
      {
        error: {
          code: "TASK_SYNC_FAILED",
          message,
          details: { slug, taskId },
        },
      },
      { status: 400 },
    );
  }
}
