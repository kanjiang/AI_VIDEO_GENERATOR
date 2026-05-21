import { NextResponse } from "next/server";

import { fetchAndPersistTaskResult } from "@/server/tasks/task-queue";

type TaskResultRouteProps = {
  params: Promise<{
    slug: string;
    taskId: string;
  }>;
};

export async function POST(_: Request, { params }: TaskResultRouteProps) {
  const { slug, taskId } = await params;

  try {
    const task = await fetchAndPersistTaskResult(slug, taskId);
    return NextResponse.json({ task });
  } catch (error) {
    const message = error instanceof Error ? error.message : "任务结果抓取失败";
    return NextResponse.json(
      {
        error: {
          code: "TASK_RESULT_FETCH_FAILED",
          message,
          details: { slug, taskId },
        },
      },
      { status: 400 },
    );
  }
}
