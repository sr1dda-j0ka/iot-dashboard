import { connectDB} from "@/libs/db";
import Device from "@/models/Device";
import Reading from "@/models/Reading";

export default async function handler(req,res){
    if(req.method!=="GET"){
        return res.status(405).json({error: "method not allowed"});
    }
    try{
        await connectDB();

        const {deviceId}=req.query;
        if(!deviceId){
            return res.status(400).json({error: "deviceId not found"});
        }
        const latestReading= await Reading.findOne({deviceId}).sort({timestamp:-1}).lean();
        if(!latestReading){
            return res.status(404).json({error: "reading not found"});
        }
        return res.status(200).json({
            deviceId: latestReading.deviceId,
            temperature: latestReading.temperature,
            humidity: latestReading.humidity,
            aqi: latestReading.aqi,
            timestamp: latestReading.timestamp,
        })

    }catch(error){
        console.error("Latest api error: ",error);
        return res.status(500).json({ error: "Server error", detail: error.message });
    }
}