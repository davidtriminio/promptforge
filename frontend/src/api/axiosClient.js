import axios from "axios";

let axiosClientInstance = null;
let csrfToken = null
let refreshPromise = null

async function getCsrfToken(client) {
    if (csrfToken) {
        return csrfToken
    }

    const {data} = await client.get("/csrf-token")
    csrfToken = data.csrfToken || data.token
    return csrfToken
}

async function refreshSession(client) {
    if(!refreshPromise){
        refreshPromise = client
        .post("/auth/refresh")
        .finally(()=> {
            refreshPromise = null
        })
    }
    await refreshPromise
}

async function getAxiosClient() {
    if (!axiosClientInstance) {
        const {ENV} = await import("../utils/ENV.js")

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

        axiosClientInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config
                const status = error.response?.status
                const requestUrl = originalRequest?.url || ""

                const isRefreshRequest = requestUrl.includes("/auth/refresh")
                const isLoginRequest = requestUrl.includes("/auth/login")
                const isRegisterRequest = requestUrl.includes("/auth/register")
                const isLogoutRequest = requestUrl.includes("/auth/logout")

                if (
                    status === 401 &&
                    !originalRequest?._retry &&
                    !isRefreshRequest &&
                    !isLoginRequest &&
                    !isRegisterRequest &&
                    !isLogoutRequest
                ) {
                    originalRequest._retry = true

                    try {
                        await refreshSession(axiosClientInstance)
                        return axiosClientInstance(originalRequest)
                    } catch {
                    }
                }

                if (status === 403) {
                    csrfToken = null
                }

                return Promise.reject(error)
            }
        )
    }
    return axiosClientInstance
}

export default getAxiosClient
