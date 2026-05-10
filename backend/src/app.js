import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import promptRoutes from "./routes/prompt.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import {ENV} from "./config/ENV.js";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp"
import mongoSanitize from "express-mongo-sanitize"
import csrf from "csurf"

const app = express()

if (ENV.TRUST_PROXY === "true"){
    app.set("trust proxy", 1)
}

app.disable("x-powered-by")

const allowedOrigins = ENV.CORS_ORIGINS
.split(",")
.map((origin) => origin.trim())
.filter(Boolean)

const apiLimiter = rateLimit({
    windowMs: ENV.API_RATE_LIMIT_WINDOW_MS,
    max: ENV.API_RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message:{
        message: "Demasiadas solicitudes. Intenta de nuevo más tarde."
    }
})

const authLimiter = rateLimit({
    windowMs: ENV.AUTH_RATE_LIMIT_WINDOW_MS,
    max: ENV.AUTH_RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Demasiados intentos de autenticación. Intenta más tarde."
    }
})

const authSpeedLimiter = slowDown({
    windowMs: ENV.AUTH_RATE_LIMIT_WINDOW_MS,
    delayAfter: 5,
    delayMs: () => 500
})

app.use(helmet({
    crossOriginResourcePolicy: {policy: "cross-origin"}
}))

app.use(cors({
    origin(origin, callback){
        if (!origin || allowedOrigins.includes(origin)){
            return callback(null, true)
        }
        return callback(new Error("Origin no permitido por CORS"))
    },
    credentials: true
}))

app.use(cookieParser(ENV.COOKIE_SECRET))
const csrfProtection = csrf({
    cookie: {
        key: ENV.CSRF_COOKIE_NAME,
        httpOnly: false,
        secure: ENV.COOKIE_SECURE === "true",
        sameSite: ENV.COOKIE_SAME_SITE
    }
})
app.use(express.json({limit: ENV.JSON_LIMIT}))
app.use(express.urlencoded({extended: false, limit: ENV.URL_ENCODED_LIMIT}))
app.use((req, res, next) => {
    if(req.body){
        req.body = mongoSanitize.sanitize(req.body)
    }

    if (req.params){
        req.params = mongoSanitize.sanitize(req.params)
    }
    next()
})
app.use(hpp())

app.use("/api", apiLimiter)
app.use("/api/auth", authSpeedLimiter)
app.use("/api/auth", authLimiter)

app.get("/api/csrf-token", csrfProtection, (req,res) => {
    res.status(200).json({
        csrfToken: req.csrfToken()
    })
})

app.get("/", (req, res) => {
    res.status(200).json({
        message: "PromptForge API is running."
    })
})

app.use("/api/auth", csrfProtection, authRoutes)
app.use("/api/prompts",csrfProtection, promptRoutes)
app.use("/api/categories", csrfProtection, categoryRoutes)
app.use("/api/dashboard", dashboardRoutes)
export default app