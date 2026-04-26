import getAxiosClient from "./axiosClient.js";

export const getDashboardStatsRequest = async () => {
    try {
        const axiosClient = await getAxiosClient();
        const {data} = await axiosClient.get("/dashboard/stats")
        return data
    } catch (e) {
        throw e
    }
}