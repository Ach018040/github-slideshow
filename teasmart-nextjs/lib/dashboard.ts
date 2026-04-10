import { mockDashboard } from "@/lib/mock";

export async function getDashboardData() {
  // TODO: swap with Supabase query once real tables are populated.
  return mockDashboard;
}
