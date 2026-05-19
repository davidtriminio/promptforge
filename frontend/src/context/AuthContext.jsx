import {createContext, useEffect, useMemo, useState} from "react";
import {demoLoginRequest, loginRequest, logoutRequest, meRequest, registerRequest} from "../api/authApi.js";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    const register = async (formData) => {
        try {
            const data = await registerRequest(formData)

            setUser(data.user)

            return data
        } catch (e) {
            throw e
        }
    }

    const login = async (formData) => {
        try {
            const data = await loginRequest(formData)

            setUser(data.user)

            return data
        } catch (e) {
            throw e
        }
    }

    const demoLogin = async () => {
        try {
            const data = await demoLoginRequest()
            setUser(data.user)
            return data
        } catch (e) {
            throw e
        }
    }

    const logout = async () => {
        try {
            await logoutRequest()
        } finally {
            setUser(null)
        }
    }

    const loadAuthenticatedUser = async () => {
        try {
            const data = await meRequest()
            setUser(data.user)
        } catch (e) {
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
        demoLogin,
        logout,
        setUser
    }), [user, authLoading])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}