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
    COOKIE_SECRET: getENV("COOKIE_SECRET"),
    NODE_ENV: getENV("NODE_ENV", "development"),
    API_RATE_LIMIT_WINDOW_MS: Number(getENV("API_RATE_LIMIT_WINDOW_MS", "900000")),
    API_RATE_LIMIT_MAX: Number(getENV("API_RATE_LIMIT_MAX", "200")),
    AUTH_RATE_LIMIT_WINDOW_MS: Number(getENV("AUTH_RATE_LIMIT_WINDOW_MS", "900000")),
    AUTH_RATE_LIMIT_MAX: Number(getENV("AUTH_RATE_LIMIT_MAX", "10")),
    JSON_LIMIT: getENV("JSON_LIMIT", "100kb"),
    URL_ENCODED_LIMIT: getENV("URL_ENCODED_LIMIT", "100kb"),
    TRUST_PROXY: getENV("TRUST_PROXY", "false"),
    MONGO_URI: getENV("MONGO_URI"),
    JWT_SECRET: getENV("JWT_SECRET"),
    JWT_EXPIRES_IN: getENV("JWT_EXPIRES_IN", "7d"),
    CORS_ORIGINS: getENV("CORS_ORIGINS", "http://localhost:5173"),
    COOKIE_NAME: getENV("COOKIE_NAME", "promptforge_token"),
    COOKIE_SECURE: getENV("COOKIE_SECURE", "false"),
    COOKIE_SAME_SITE: getENV("COOKIE_SAME_SITE", "lax"),
    CSRF_COOKIE_NAME: getENV("CSRF_COOKIE_NAME", "promptforge_csrf"),
}