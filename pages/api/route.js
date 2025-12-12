import { connectDB } from "@/libs/db";
import Device from "@/models/Device";

export default async function handler(req, res) {
  try {
    await connectDB();

    const devices = await Device.find({});

    res.status(200).json({
      connected: true,
      count: devices.length,
    });
  } catch (err) {
    res.status(500).json({
      connected: false,
      error: err.message,
    });
  }
}
