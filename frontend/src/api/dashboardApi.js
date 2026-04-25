import axiosClient from "./axiosClient.js";

export const getDashboardStatsRequest = async () => {
    try {
        const {data} = await axiosClient.get("/dashboard/stats")
        return data
    } catch (e) {
        throw e
    }
}