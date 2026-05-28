import { NextResponse } from "next/server";

import { loadProjectStoryboard } from "@/server/storyboard/loader";

type StoryboardRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, { params }: StoryboardRouteProps) {
  const { slug } = await params;
  const storyboard = await loadProjectStoryboard(process.cwd(), slug);

  if (!storyboard) {
    return NextResponse.json(
      {
        error: "storyboard_not_found",
        message: "未找到 storyboard 结果，请先运行 build:storyboard。",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(storyboard);
}
