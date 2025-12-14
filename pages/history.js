"use client";

import Chart from "@/components/Chart";
import { useState, useEffect } from "react";
import { Thermometer, Droplets, Wind } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await fetch(
      "/api/sensor/history?deviceId=dev-001&limit=50&ts=" + Date.now()
    );
    const data = await res.json();

    const formatted = data.map(r => ({
      time: new Date(r.timestamp).toLocaleTimeString(),
      temp: r.temperature,
      humidity: r.humidity,
      aqi: r.aqi,
    }));
    setHistory(formatted);
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        
        <h1 className="text-center text-blue-900 text-3xl font-bold mb-12">
          Sensor Readings History
        </h1>

        <div className="flex flex-col items-center w-full space-y-10">

          
          <div className="w-full bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100">
                <Thermometer className="text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Temperature History (°C)
              </h2>
            </div>

            <Chart
              data={history}
              xKey="time"
              yKey="temp"
              label="Temperature (°C)"
              color="#ff7300"
            />
          </div>

          
          <div className="w-full bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Droplets className="text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Humidity History (%)
              </h2>
            </div>

            <Chart
              data={history}
              xKey="time"
              yKey="humidity"
              label="Humidity (%)"
              color="#0088FE"
            />
          </div>

          <div className="w-full bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-100">
                <Wind className="text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Air Quality Index (AQI)
              </h2>
            </div>

            <Chart
              data={history}
              xKey="time"
              yKey="aqi"
              label="AQI"
              color="#82ca9d"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
