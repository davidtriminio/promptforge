import mongoose from "mongoose"
import {connectDB} from "../config/db.js"
import {cleanupExpiredDemoUsers} from "../utils/cleanupExpiredDemoUsers.js.js"

const runDemoCleanup = async () => {
    try {
        await connectDB()

        const result = await cleanupExpiredDemoUsers()

        console.log("[DEMO CLEANUP] Resultado:", result)

        await mongoose.connection.close()
        process.exit(0)
    } catch (e) {
        console.error("[DEMO CLEANUP] Error:", e)
        await mongoose.connection.close().catch(() => {})
        process.exit(1)
    }
}

runDemoCleanup()
