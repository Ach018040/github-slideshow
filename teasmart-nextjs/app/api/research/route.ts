import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

type ResearchIdea = {
  title: string;
  priority: "low" | "medium" | "high";
  summary: string;
};

type ResearchPayload = {
  generated_at: string;
  tool: string;
  ideas: ResearchIdea[];
};

const fallback: ResearchPayload = {
  generated_at: new Date().toISOString(),
  tool: "AI-Scientist-v2",
  ideas: [
    {
      title: "No research file detected",
      priority: "medium",
      summary: "Place data/research/latest.json to populate AI-assisted ideas."
    }
  ]
};

export async function GET() {
  const targetPath = join(process.cwd(), "data", "research", "latest.json");

  if (!existsSync(targetPath)) {
    return NextResponse.json(fallback);
  }

  try {
    const raw = readFileSync(targetPath, "utf-8");
    const parsed = JSON.parse(raw) as ResearchPayload;
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(fallback, { status: 200 });
  }
}
