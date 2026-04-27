import getAxiosClient from "./axiosClient.js";

const axiosClient = getAxiosClient()

export const getPromptRequest = async (params = {}) => {
    const {data} = await axiosClient.get("/prompts", {params})
    return data
}

export const createPromptRequest = async (payload) => {
    const {data} = await axiosClient.post("/prompts", payload)
    return data
}

export const updatePromptRequest = async (id, payload) => {
    const {data} = await axiosClient.put(`/prompts/${id}`, payload)
    return data
}

export const deletePromptRequest = async (id) => {
    const {data} = await axiosClient.delete(`/prompts/${id}`)
    return data
}

export const toggleFavoritePromptRequest = async (id) => {
    const {data} = await axiosClient.patch(`/prompts/${id}`)
    return data
}