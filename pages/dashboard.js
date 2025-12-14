"use client";

import { useState, useEffect } from "react";
import { Thermometer, Droplets, Wind } from "lucide-react";

export default function Dashboard() {
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [aqi, setAqi] = useState(null);

  const fetchLatest = async () => {
    try {
      const res = await fetch(
        "/api/sensor/latest?deviceId=dev-001&ts=" + Date.now(),
        { cache: "no-store" }
      );
      const data = await res.json();

      setTemp(data.temperature);
      setHumidity(data.humidity);
      setAqi(data.aqi);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLatest();
    const interval = setInterval(fetchLatest, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        
        
        <h1 className="text-3xl font-bold mb-2 text-blue-900">
          Sensor Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Real-time environmental parameters
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Thermometer className="text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                Temperature
              </h2>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {temp ?? "--"} <span className="text-xl">°C</span>
            </p>
          </div>

          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplets className="text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                Humidity
              </h2>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {humidity ?? "--"} <span className="text-xl">%</span>
            </p>
          </div>

          
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Wind className="text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                Air Quality
              </h2>
            </div>
            <p className="text-4xl font-bold text-gray-900">
              {aqi ?? "--"} <span className="text-xl">AQI</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
