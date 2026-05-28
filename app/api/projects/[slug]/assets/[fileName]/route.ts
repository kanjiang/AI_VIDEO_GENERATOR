import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

type ProjectAssetRouteProps = {
  params: Promise<{
    slug: string;
    fileName: string;
  }>;
};

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(_: Request, { params }: ProjectAssetRouteProps) {
  const { slug, fileName } = await params;
  const normalizedFileName = path.basename(fileName);

  if (normalizedFileName !== fileName) {
    return NextResponse.json({ error: "invalid_asset_path" }, { status: 400 });
  }

  const assetRoot = path.resolve(process.cwd(), "assets", slug);
  const assetPath = path.resolve(assetRoot, normalizedFileName);

  if (!assetPath.startsWith(`${assetRoot}${path.sep}`) && assetPath !== path.join(assetRoot, normalizedFileName)) {
    return NextResponse.json({ error: "invalid_asset_path" }, { status: 400 });
  }

  try {
    const payload = await readFile(assetPath);
    const extension = path.extname(normalizedFileName).toLowerCase();
    const contentType = CONTENT_TYPE_BY_EXTENSION[extension] ?? "application/octet-stream";

    return new NextResponse(payload, {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${normalizedFileName}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "asset_not_found" }, { status: 404 });
  }
}
