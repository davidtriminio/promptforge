import React from 'react'
import {useAuth} from "../hooks/useAuth.js";
import {Navigate, Outlet} from "react-router-dom";
import LoadingState from "@/components/common/LoadingState.jsx";

const ProtectedRoute = () => {
    const {isAuthenticated, authLoading} = useAuth()

    if (authLoading) {
        return <LoadingState variant={"fullscreen"} message={"Validando sesión..."}/>
    }

    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace/>
    }
    return (
        <Outlet/>
    )
}
export default ProtectedRoute
