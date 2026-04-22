function getENV(name){
    const value = import.meta.env[name]

    if(!value){
        throw new Error(`Environment variables ${name} is required`)
    }

    return value
}

export const ENV = {
    VITE_API_URL: getENV("VITE_API_URL")
}