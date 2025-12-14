import { useEffect, useState } from "react";

export default function DevicesPage() {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const DEVICE_ID = "dev-001";

  const fetchLatest = async () => {
    try {
      setError("");
      const res = await fetch(
        `/api/sensor/latest?deviceId=${DEVICE_ID}&t=${Date.now()}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch");

      setDevice(data);
      setLoading(false);
    } catch (err) {
      setError("Unable to fetch device data");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatest();
    const interval = setInterval(fetchLatest, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Devices
      </h1>

      {loading && (
        <div className="p-4 bg-white shadow rounded animate-pulse">
          Loading device...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {device && (
        <div className="max-w-md bg-white shadow rounded p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-800">
              Device: {device.deviceId}
            </h2>
            <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
              Online
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Stat label="Temperature" value={`${device.temperature} °C`} />
            <Stat label="Humidity" value={`${device.humidity} %`} />
            <Stat label="AQI" value={device.aqi} />
            <Stat
              label="Last Update"
              value={new Date(device.timestamp).toLocaleTimeString()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-3 border rounded bg-gray-50">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
}
