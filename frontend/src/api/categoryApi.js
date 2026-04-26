import getAxiosClient from "./axiosClient.js";

const axiosClient = getAxiosClient()

export const getCategoriesRequest = async() => {
    const {data} = await axiosClient.get("/categories")
    return data
}

export const createCategoryRequest = async(payload) =>{
    const {data} = await axiosClient.post("/categories", payload)
    return data
}

export const updateCategoryRequest = async(id, payload) => {
    const {data} = await axiosClient.put(`/categories/${id}`, payload)
    return data
}

export const deleteCategoryRequest = async (id) => {
    const {data} = await axiosClient.delete(`/prompts/${id}`)
}