
function random(min,max){
    return Math.random()*(max-min)+min;
}
const sendData=async ()=>{
    const payload={
        deviceId: "dev-001",
        temperature: random(20, 30).toFixed(1),
        humidity: random(40, 70).toFixed(1),
        aqi: random(60, 150).toFixed(0), 
    }
    console.log("Sending payload: ",payload);
    await fetch("http://localhost:3000/api/sensor/update",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}
setInterval(sendData,3000);