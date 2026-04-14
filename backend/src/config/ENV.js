import dotenv from "dotenv"

dotenv.config({
    quiet: true
})

export const ENV = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI
}