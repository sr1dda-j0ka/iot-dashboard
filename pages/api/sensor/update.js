import {connectDB} from "@/libs/db";
import Device from "@/models/Device";
import Reading from "@/models/Reading";
export default async function handler(req,res){
    if(req.method!=="POST"){
        return res.status(405).json({error: "method not allowed"});
    }
    try{
        await connectDB();
        const {deviceId,temperature,humidity,aqi}=req.body;

        if(!deviceId){
            return res.status(400).json({error: "device ID is required"});
        }
        await Reading.create({
      deviceId,
      temperature: Number(temperature),
      humidity: Number(humidity),
      aqi: Number(aqi),
      timestamp: new Date()
    });
    
    const idsToKeep = await Reading.find({ deviceId })
      .sort({ timestamp: -1 })
      .limit(50)
      .select("_id");

    await Reading.deleteMany({
      deviceId,
      _id: { $nin: idsToKeep.map(r => r._id) },
    });

    await Device.findOneAndUpdate(
      { deviceId },
      {
        lastUpdated: new Date(),
        status: "online",
      },
      { upsert: true }
    );

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Update API error:", error);
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}

