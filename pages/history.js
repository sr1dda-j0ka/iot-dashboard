import Chart from "@/components/Chart";
import { useState, useEffect } from "react";
export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await fetch("/api/sensor/history?deviceId=dev-001&limit=50&ts=" + Date.now());
    const data = await res.json();

    const formatted = data.map(r => ({
      time: new Date(r.timestamp).toLocaleTimeString(),
      temp: r.temperature,
      humidity: r.humidity,
      aqi: r.aqi,
    }))
    setHistory(formatted);
  }

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <h1 className="text-center text-blue-800 text-2xl font-bold mb-10">
      Readings History
    </h1>

    
    <div className="flex flex-col items-center w-full space-y-12">

      
      <div className="w-full max-w-3xl">
        <Chart
          data={history}
          xKey="time"
          yKey="temp"
          label="Temperature History (°C)"
          color="#ff7300"
        />
      </div>

      <div className="w-full max-w-3xl">
        <Chart
          data={history}
          xKey="time"
          yKey="humidity"
          label="Humidity History (%)"
          color="#0088FE"
        />
      </div>

      <div className="w-full max-w-3xl">
        <Chart
          data={history}
          xKey="time"
          yKey="aqi"
          label="AQI History"
          color="#82ca9d"
        />
      </div>

    </div>
  </div>
  )
}
