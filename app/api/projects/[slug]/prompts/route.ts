import { NextResponse } from "next/server";

import { assembleProjectPrompts } from "@/server/prompts/assembler";

type ProjectPromptsRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, { params }: ProjectPromptsRouteProps) {
  const { slug } = await params;

  try {
    const prompts = await assembleProjectPrompts(process.cwd(), slug);
    return NextResponse.json(prompts);
  } catch (error) {
    const message = error instanceof Error ? error.message : "prompt 组装失败";
    return NextResponse.json(
      {
        error: {
          code: "PROMPT_ASSEMBLY_FAILED",
          message,
          details: { slug },
        },
      },
      { status: 400 },
    );
  }
}
