export const mockDashboard = {
  farmName: "Nantou Demo Tea Farm",
  today: {
    temp: 23.7,
    humidity: 72,
    soilMoisture: 0.31,
    rain: 4.2
  },
  alerts: ["Plot A soil moisture is below target"],
  carbonMonth: 112.6,
  qualityPrediction: 84,
  trend: [
    { day: "Mon", temp: 22.1, moisture: 0.29, carbon: 14 },
    { day: "Tue", temp: 23.3, moisture: 0.28, carbon: 16 },
    { day: "Wed", temp: 24.0, moisture: 0.31, carbon: 17 },
    { day: "Thu", temp: 24.2, moisture: 0.32, carbon: 15 },
    { day: "Fri", temp: 23.7, moisture: 0.31, carbon: 14 }
  ]
};
