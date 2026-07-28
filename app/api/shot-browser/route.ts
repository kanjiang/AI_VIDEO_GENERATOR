import { NextResponse } from "next/server";

import { scanAllProjects } from "@/shot-browser/scanner";

export async function GET() {
  try {
    const data = scanAllProjects(process.cwd());
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "扫描失败";
    return NextResponse.json(
      { error: { code: "SCAN_FAILED", message } },
      { status: 500 },
    );
  }
}
