import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "ai-video-generator", timestamp: new Date().toISOString() });
}
