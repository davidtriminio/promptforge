import axios from "axios";
import {ENV} from "../utils/ENV.js";

let axiosClientInstance = null;

function getAxiosClient() {
    if (!axiosClientInstance) {
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
