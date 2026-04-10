export function MetricCard({ title, value, unit }: { title: string; value: string | number; unit?: string }) {
  return (
    <section className="card">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
        {unit ? <span className="ml-1 text-sm font-normal text-slate-500">{unit}</span> : null}
      </p>
    </section>
  );
}
