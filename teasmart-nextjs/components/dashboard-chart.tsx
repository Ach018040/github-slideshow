"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { day: string; temp: number; moisture: number; carbon: number };

export function DashboardChart({ data }: { data: Point[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="card h-72">
        <h2 className="text-sm font-medium text-slate-600">Temperature & Soil Moisture</h2>
        <div className="mt-3 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#0f766e" />
              <Line type="monotone" dataKey="moisture" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="card h-72">
        <h2 className="text-sm font-medium text-slate-600">Daily Carbon Emission (kg CO₂e)</h2>
        <div className="mt-3 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="carbon" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
