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
    PORT: Number(getENV("PORT", "5000")),
    NODE_ENV: getENV("NODE_ENV", "development"),
    TRUST_PROXY: getENV("TRUST_PROXY", "false"),

    MONGO_URI: getENV("MONGO_URI"),

    CORS_ORIGINS: getENV("CORS_ORIGINS", "http://localhost:5173"),

    COOKIE_SECRET: getENV("COOKIE_SECRET"),
    ACCESS_COOKIE_NAME: getENV("ACCESS_COOKIE_NAME", "promptforge_access"),
    REFRESH_COOKIE_NAME: getENV("REFRESH_COOKIE_NAME", "promptforge_refresh"),
    CSRF_COOKIE_NAME: getENV("CSRF_COOKIE_NAME", "promptforge_csrf"),
    COOKIE_SECURE: getENV("COOKIE_SECURE", "false"),
    COOKIE_SAME_SITE: getENV("COOKIE_SAME_SITE", "lax"),

    JWT_ACCESS_SECRET: getENV("JWT_ACCESS_SECRET"),
    JWT_REFRESH_SECRET: getENV("JWT_REFRESH_SECRET"),
    JWT_ACCESS_EXPIRES_IN: getENV("JWT_ACCESS_EXPIRES_IN", "15m"),
    JWT_REFRESH_EXPIRES_IN: getENV("JWT_REFRESH_EXPIRES_IN", "7d"),

    API_RATE_LIMIT_WINDOW_MS: Number(getENV("API_RATE_LIMIT_WINDOW_MS", "900000")),
    API_RATE_LIMIT_MAX: Number(getENV("API_RATE_LIMIT_MAX", "200")),
    AUTH_RATE_LIMIT_WINDOW_MS: Number(getENV("AUTH_RATE_LIMIT_WINDOW_MS", "900000")),
    AUTH_RATE_LIMIT_MAX: Number(getENV("AUTH_RATE_LIMIT_MAX", "10")),

    AUTH_MAX_FAILED_ATTEMPTS: Number(getENV("AUTH_MAX_FAILED_ATTEMPTS", "5")),
    AUTH_LOCK_WINDOW_MINUTES: Number(getENV("AUTH_LOCK_WINDOW_MINUTES", "15")),

    JSON_LIMIT: getENV("JSON_LIMIT", "100kb"),
    URL_ENCODED_LIMIT: getENV("URL_ENCODED_LIMIT", "100kb"),

    FRONTEND_URL: getENV("FRONTEND_URL", "http://localhost:5173"),
    BACKEND_URL: getENV("BACKEND_URL", "http://localhost:5000")
}