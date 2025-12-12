import mongoose from "mongoose"
const ReadingSchema=new mongoose.Schema({
    deviceId: {
        type: String,
        required: true
    },
    temperature: Number,
    humidity: Number,
    aqi: Number,
    timestamp: {
        type: Date,
        default: Date.now
    },
})
export default mongoose.models.Reading || mongoose.model("Reading",ReadingSchema)