import {connectDB} from "@/libs/db";
import Reading from "@/models/Reading";

export default async function handler(req,res){
    if(req.method!=="GET"){
        return res.status(405).json({error: "method not allowed"});
    }
    try{
        await connectDB();
        const {deviceId, limit=50}=req.query;

        if(!deviceId){
            return res.status(400).json({error: "deviceID not found"});
        }
        const readings= await Reading.find({deviceId})
                        .sort({timestamp: -1}).limit(Number(limit)).lean();
        
        return res.status(200).json(readings.reverse());
    }catch(err){
        return res.status(500).json({error: "Server error"});
    }
    

}
