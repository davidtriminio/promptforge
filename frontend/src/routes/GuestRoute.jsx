import React from 'react'
import {useAuth} from "../hooks/useAuth.js";
import {Navigate, Outlet} from "react-router-dom";
import LoadingState from "@/components/common/LoadingState.jsx";

const GuestRoute = () => {
    const {isAuthenticated, authLoading} = useAuth()

    if (authLoading) {
        return <LoadingState variant="fullscreen" message="Cargando acceso..." />
    }

    if (isAuthenticated) {
        return <Navigate to={"/dashboard"} replace/>
    }
    return <Outlet/>
}
export default GuestRoute
