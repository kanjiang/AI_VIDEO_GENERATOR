import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    project: {
      id: "demo-project",
      name: "证词之外",
      status: "scaffolded",
      sourceType: "imported",
      targetProvider: "mock",
    },
    stats: {
      shots: 36,
      assets: 16,
      promptBundles: 6,
      queuedTasks: 0,
    },
  });
}
