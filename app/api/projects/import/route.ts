import { NextResponse } from "next/server";
import { z } from "zod";

import { importProjectFromWorkspace } from "@/server/importers/project";

const importRequestSchema = z.object({
  rootPath: z.string().min(1),
  projectSlug: z.string().min(1),
  options: z
    .object({
      scanPromptFiles: z.boolean().default(true),
      scanGenerationList: z.boolean().default(true),
      createSnapshot: z.boolean().default(true),
    })
    .optional(),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = importRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "导入请求不合法",
          details: parsed.error.flatten(),
        },
      },
      { status: 400 },
    );
  }

  const { rootPath, projectSlug } = parsed.data;

  try {
    const result = await importProjectFromWorkspace(rootPath, projectSlug);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "项目导入失败";

    return NextResponse.json(
      {
        error: {
          code: "IMPORT_PARSE_FAILED",
          message,
          details: { rootPath, projectSlug },
        },
      },
      { status: 400 },
    );
  }
}
