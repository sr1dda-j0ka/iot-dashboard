import { useState, useEffect} from "react";

export default function Dashboard() {
  const [temp,setTemp]=useState(null);
  const [humidity,setHumidity]=useState(null);
  const [aqi,setAqi]=useState(null);

  const fetchLatest=async ()=>{
    try{
      const res=await fetch("/api/sensor/latest?deviceId=dev-001&ts"+Date.now(),{
        cache: "no-store"
      });
      const data=await res.json();

      if(data.error){
        console.error("Error: ",data.error);
      }
      setTemp(data.temperature);
      setHumidity(data.humidity);
      setAqi(data.aqi);
    }catch(err){
      console.error("Fetch error: ",err);
    }
  }

  useEffect(() => {
    fetchLatest();
    const interval=setInterval(fetchLatest,3000);
    return ()=>clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">IoT Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg text-blue-500 font-semibold">Temperature</h2>
          <p className="text-4xl text-black font-bold mt-4">{temp ?? "--"} °C</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg text-blue-500 font-semibold">Humidity</h2>
          <p className="text-4xl text-black font-bold mt-4">{humidity ?? "--"} %</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-lg text-blue-500 font-semibold">Air Quality</h2>
          <p className="text-4xl text-black font-bold mt-4">{aqi ?? "--"} AQI</p>
        </div>
      </div>
    </div>
  );
}
