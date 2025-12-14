function random(min, max) {
  return Math.random() * (max - min) + min;
}

const API_URL = "https://iot-dashboard-rust.vercel.app/api/sensor/update";

const sendData = async () => {
  const payload = {
    deviceId: "dev-001",
    temperature: random(20, 30).toFixed(1),
    humidity: random(40, 70).toFixed(1),
    aqi: random(60, 150).toFixed(0),
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Sent:", payload, "| Status:", res.status);
  } catch (err) {
    console.error("Error sending data:", err.message);
  }
};


setInterval(sendData, 3000);
