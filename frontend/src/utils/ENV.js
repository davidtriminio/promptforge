function getENV(name, defaultValue = null){
    const value = import.meta.env[name]

    if(!value && !defaultValue){
        console.error(`Environment variable ${name} is not defined in import.meta.env`, import.meta.env)
        throw new Error(`Environment variables ${name} is required`)
    }

    return value || defaultValue
}

export const ENV = {
    get VITE_API_URL() {
        return getENV("VITE_API_URL", "http://localhost:5000/api")
    }
}