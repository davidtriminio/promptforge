import dotenv from "dotenv"

dotenv.config({
    quiet: true
})

function getENV(name, defaultValue = undefined) {
    const value = process.env[name]

    if(value === undefined || value === ""){
        if (defaultValue === undefined) {
            throw new Error(`Environment variable ${name} is required`)
        }
        return defaultValue
    }
    return value
}

export const ENV = {
    PORT: Number(getENV("PORT",5000)),
    NODE_ENV: getENV("NODE_ENV", "development"),
    MONGO_URI: getENV("MONGO_URI"),
    JWT_SECRET: getENV("JWT_SECRET"),
    JWT_EXPIRES_IN: getENV("JWT_EXPIRES_IN", "7d"),
    CORS_ORIGINS: getENV("CORS_ORIGINS", "http://localhost:5173")
}