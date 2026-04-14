import dotenv from "dotenv"

dotenv.config({
    quiet: true
})

function getENV(name) {
    const value = process.env[name]

    if(!value){
        throw new Error(`Environment variable ${name} is required`)
    }
    return value
}

export const ENV = {
    PORT: getENV("PORT") || 5000,
    NODE_ENV: getENV("NODE_ENV"),
    MONGO_URI: getENV("MONGO_URI")
}