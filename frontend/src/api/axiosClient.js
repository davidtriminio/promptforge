import axios from "axios";
import {ENV} from "../utils/ENV.js";

const axiosClient = axios.create({
    baseURL: ENV.VITE_API_URL
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("promptforge_token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default axiosClient