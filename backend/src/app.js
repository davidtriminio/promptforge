import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import promptRoutes from "./routes/prompt.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "PromptForge API is running."
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/prompts", promptRoutes)
app.use("/api/categories", categoryRoutes)
export default app