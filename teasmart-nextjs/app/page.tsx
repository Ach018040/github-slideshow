import { DashboardChart } from "@/components/dashboard-chart";
import { MetricCard } from "@/components/metric-card";
import { getDashboardData } from "@/lib/dashboard";

export default async function HomePage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">TeaSmart Dashboard</h1>
          <p className="text-slate-600">{data.farmName}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">MVP Demo</span>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Temperature" value={data.today.temp} unit="°C" />
        <MetricCard title="Soil Moisture" value={data.today.soilMoisture} />
        <MetricCard title="Monthly Carbon" value={data.carbonMonth} unit="kg CO₂e" />
      </section>

      <DashboardChart data={data.trend} />

      <section className="card">
        <h2 className="text-sm font-medium text-slate-600">Alerts & Recommendations</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {data.alerts.map((alert: string) => (
            <li key={alert}>{alert}</li>
          ))}
          <li>Predicted quality score: {data.qualityPrediction}/100</li>
        </ul>
      </section>
    </div>
  );
}
