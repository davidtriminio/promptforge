import {createContext, useEffect, useMemo, useState} from "react";
import {loginRequest, meRequest, registerRequest} from "../api/authApi.js";
import {storage} from "../utils/storage.js";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    const register = async (formData) => {
        try {
            const data = await registerRequest(formData)

            storage.setToken(data.token)
            setUser(data.user)

            return data
        } catch (e) {
            throw e
        }
    }

    const login = async (formData) => {
        try {
            const data = await loginRequest(formData)

            storage.setToken(data.token)
            setUser(data.user)

            return data
        } catch (e) {
            throw e
        }
    }

    const logout = async () => {
        storage.removeToken()
        setUser(null)
    }

    const loadAuthenticatedUser = async () => {
        const token = storage.getToken()

        if (!token) {
            setAuthLoading(false)
            return
        }

        try {
            const data = await meRequest()
            setUser(data.user)
        } catch (e) {
            storage.removeToken()
            setUser(null)
        } finally {
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        loadAuthenticatedUser()
    }, [])

    const value = useMemo(() => ({
        user,
        authLoading,
        isAuthenticated: Boolean(user),
        register,
        login,
        logout,
        setUser
    }), [user, authLoading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}