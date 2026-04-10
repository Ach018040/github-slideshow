import { NextResponse } from "next/server";

type SensorReading = {
  sensor_id: string;
  timestamp: string;
  value: number;
};

const readings: SensorReading[] = [];

export async function GET() {
  return NextResponse.json({ data: readings.slice(-100) });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as SensorReading;
  readings.push(payload);
  return NextResponse.json({ ok: true, data: payload }, { status: 201 });
}
