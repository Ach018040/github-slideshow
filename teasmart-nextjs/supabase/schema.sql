create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  created_at timestamptz default now()
);

create table if not exists farms (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  name text not null,
  location text,
  area_ha numeric,
  created_at timestamptz default now()
);

create table if not exists plots (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid references farms(id),
  name text not null,
  size_ha numeric,
  crop_type text default 'tea'
);

create table if not exists sensors (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid references plots(id),
  type text not null,
  unit text,
  status text default 'active'
);

create table if not exists sensor_readings (
  id bigserial primary key,
  sensor_id uuid references sensors(id),
  timestamp timestamptz not null,
  value numeric not null
);

create index if not exists idx_sensor_time on sensor_readings(sensor_id, timestamp desc);

create table if not exists operations (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid references plots(id),
  type text not null,
  quantity numeric,
  unit text,
  cost numeric,
  operator text,
  date timestamptz,
  notes text
);

create table if not exists carbon_factors (
  id uuid primary key default gen_random_uuid(),
  source text not null unique,
  unit text not null,
  co2e_factor numeric not null
);

insert into carbon_factors(source, unit, co2e_factor)
values
  ('electricity', 'kWh', 0.509),
  ('nitrogen_fertilizer', 'kg', 5.5)
on conflict (source) do nothing;
