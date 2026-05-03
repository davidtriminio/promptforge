export function getApiErrorMessage(error, fallback = "Ocurrió un error inesperado."){
    const data = error?.response?.data

    if(Array.isArray(data?.errors) && data.errors.length > 0){
        return data.errors.map((item) => item.message).join(" ")
    }

    if(data?.message) return data.message

    if(!error?.response){
        return "No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo."
    }
    return fallback
}