const TOKEN_KEY = "promptforge_token"

export const storage = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    setToken(token) {
        return localStorage.setItem(TOKEN_KEY, token)
    },

    removeToken() {
        return localStorage.removeItem(TOKEN_KEY)
    }
}