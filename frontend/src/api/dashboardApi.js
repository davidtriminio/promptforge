import axiosClient from "./axiosClient.js";

export const dashboardApi = async () => {
    try {
        const {data} = await axiosClient.get("/dashboard/stats")
        return data
    } catch (e) {
        throw e
    }
}