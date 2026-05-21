import { NextResponse } from "next/server";

import { listProjectTasks } from "@/server/tasks/task-queue";

type TaskRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, { params }: TaskRouteProps) {
  const { slug } = await params;

  try {
    const items = await listProjectTasks(process.cwd(), slug);
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "任务列表获取失败";
    return NextResponse.json(
      {
        error: {
          code: "TASK_LIST_FAILED",
          message,
          details: { slug },
        },
      },
      { status: 400 },
    );
  }
}
