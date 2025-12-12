import mongoose from "mongoose";
const DeviceSchema=new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
    },
    deviceName: String,
    location: String,
    status: {
        type: String,
        default: "online"
    },
    lastUpdated: Date,
})
export default mongoose.models.Device || mongoose.model("Device",DeviceSchema);