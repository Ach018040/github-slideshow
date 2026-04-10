import { NextResponse } from "next/server";

type Operation = {
  plot_id: string;
  type: "irrigation" | "fertilization" | "harvest";
  quantity: number;
  date: string;
};

const operations: Operation[] = [];

export async function GET() {
  return NextResponse.json({ data: operations });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Operation;
  operations.push(payload);
  return NextResponse.json({ ok: true, data: payload }, { status: 201 });
}
