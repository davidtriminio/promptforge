import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import promptRoutes from "./routes/prompt.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import {ENV} from "./config/ENV.js";

const app = express()

const allowedOrigins = ENV.CORS_ORIGINS
.split(",")
.map((origin) => origin.trim())
.filter(Boolean)

app.use(cors({
    origin(origin, callback){
        if (!origin || allowedOrigins.includes(origin)){
            return callback(null, true)
        }
        return callback(new Error("Origin no permitido por CORS"))
    }
}))

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "PromptForge API is running."
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/prompts", promptRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/dashboard", dashboardRoutes)
export default app