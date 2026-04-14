import mongoose from "mongoose";
import {ENV} from "./ENV.js";

export const connectDB = async () => {
    try {
        const mongoUri = ENV.MONGO_URI
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in environment variables.")
        }

        const connection = await mongoose.connect(mongoUri)
        console.log(`MongoDB connected: ${connection.connection.host}`)

    } catch (e) {
        console.error(`MongoDB connection error: ${e.message}`)
        process.exit(1)
    }
}