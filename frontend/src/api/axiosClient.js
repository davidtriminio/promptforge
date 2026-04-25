import axios from "axios";

let axiosClientInstance = null;

async function getAxiosClient() {
    if (!axiosClientInstance) {
        const {ENV} = await import("../utils/ENV.js");
        axiosClientInstance = axios.create({
            baseURL: ENV.VITE_API_URL
        })

        axiosClientInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem("promptforge_token")

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        })
    }
    return axiosClientInstance
}

export default getAxiosClient
