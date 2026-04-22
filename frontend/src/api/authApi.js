import axiosClient from "./axiosClient.js";

export const registerRequest = async (payload) => {
    const {data} = await axiosClient.post("/auth/register", payload)
    return data
}

export const loginRequest = async (payload) => {
    const {data} =await axiosClient.post("/auth/login", payload)
    return data
}

export const meRequest = async () => {
    const {data} = await  axiosClient.post("auth/me")
    return data
}