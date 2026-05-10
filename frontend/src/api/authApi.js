import getAxiosClient from "@/api/axiosClient.js";

export const registerRequest = async (payload) => {
    const { default: getAxiosClient } = await import("./axiosClient.js")
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.post("/auth/register", payload)
    return data
}

export const loginRequest = async (payload) => {
    const { default: getAxiosClient } = await import("./axiosClient.js")
    const axiosClient = await getAxiosClient()
    const {data} =await axiosClient.post("/auth/login", payload)
    return data
}

export const meRequest = async () => {
    const { default: getAxiosClient } = await import("./axiosClient.js")
    const axiosClient = await getAxiosClient()
    const {data} = await  axiosClient.get("/auth/me")
    return data
}

export const refreshRequest = async () => {
    const {default: getAxiosClient} = await import("./axiosClient.js")
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.post("/auth/refresh")
    return data
}


export const logoutRequest = async () => {
    const {default: getAxiosClient} = await import("./axiosClient.js")
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.post("/auth/logout")
    return data
}