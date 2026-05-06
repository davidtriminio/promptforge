function getENV(name, defaultValue = null){
    const value = import.meta.env[name]

    if(!value && !defaultValue){
        throw new Error(`Environment variables ${name} is required`)
    }

    return value || defaultValue
}

export const ENV = {
    get VITE_API_URL() {
        return getENV("VITE_API_URL",
            import.meta.env.DEV ? "http://localhost:5000/api" : null)
    }
}