import axios from "axios";

let axiosClientInstance = null;
let csrfToken = null

async function getCsrfToken(client) {
    if (csrfToken) {
        return csrfToken
    }

    const {data} = await client.get("/csrf-token")
    csrfToken = data.csrfToken || data.token
    return csrfToken
}

async function getAxiosClient() {
    if (!axiosClientInstance) {
        const {ENV} = await import("../utils/ENV.js");
        axiosClientInstance = axios.create({
            baseURL: ENV.VITE_API_URL,
            withCredentials: true
        })

        axiosClientInstance.interceptors.request.use(async (config) => {
            const method = config.method?.toUpperCase()

            if (["POST", "PUT", "PATCH", "DELETE"].includes(method)){
                const token = await getCsrfToken(axiosClientInstance)
                config.headers = config.headers ?? {}
                config.headers["X-CSRF-Token"] = token
            }
            return config
        })
    }
    return axiosClientInstance
}

export default getAxiosClient
