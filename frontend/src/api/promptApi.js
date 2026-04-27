import getAxiosClient from "./axiosClient.js";

export const getPromptRequest = async (params = {}) => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.get("/prompts", {params})
    return data
}

export const createPromptRequest = async (payload) => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.post("/prompts", payload)
    return data
}

export const updatePromptRequest = async (id, payload) => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.put(`/prompts/${id}`, payload)
    return data
}

export const deletePromptRequest = async (id) => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.delete(`/prompts/${id}`)
    return data
}

export const toggleFavoritePromptRequest = async (id) => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.patch(`/prompts/${id}/favorite`)
    return data
}