export const registerRequest = async (payload) => {
    const { default: getAxiosClient } = await import("./axiosClient.js")
    const axiosClient = getAxiosClient()
    const {data} = await axiosClient.post("/auth/register", payload)
    return data
}

export const loginRequest = async (payload) => {
    const { default: getAxiosClient } = await import("./axiosClient.js")
    const axiosClient = getAxiosClient()
    const {data} =await axiosClient.post("/auth/login", payload)
    return data
}

export const meRequest = async () => {
    const { default: getAxiosClient } = await import("./axiosClient.js")
    const axiosClient = getAxiosClient()
    const {data} = await  axiosClient.post("/auth/me")
    return data
}