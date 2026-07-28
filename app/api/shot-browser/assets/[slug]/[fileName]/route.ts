import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    slug: string;
    fileName: string;
  }>;
};

const CONTENT_TYPE: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(_: Request, { params }: Params) {
  const { slug, fileName } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const decodedFileName = decodeURIComponent(fileName);
  const safeFileName = path.basename(decodedFileName);

  const assetPath = path.resolve(process.cwd(), decodedSlug, "assets", safeFileName);
  const projectRoot = path.resolve(process.cwd(), decodedSlug, "assets");

  if (!assetPath.startsWith(projectRoot)) {
    return NextResponse.json({ error: "invalid_path" }, { status: 400 });
  }

  try {
    await stat(assetPath);
    const payload = await readFile(assetPath);
    const ext = path.extname(safeFileName).toLowerCase();
    const contentType = CONTENT_TYPE[ext] ?? "application/octet-stream";

    return new NextResponse(payload, {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": contentType,
      },
    });
  } catch {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
}
