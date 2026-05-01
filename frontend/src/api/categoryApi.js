import getAxiosClient from "./axiosClient.js";

export const getCategoriesRequest = async() => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.get("/categories")
    return data
}

export const createCategoryRequest = async(payload) =>{
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.post("/categories", payload)
    return data
}

export const updateCategoryRequest = async(id, payload) => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.put(`/categories/${id}`, payload)
    return data
}

export const deleteCategoryRequest = async (id) => {
    const axiosClient = await getAxiosClient()
    const {data} = await axiosClient.delete(`/categories/${id}`)
    return data
}