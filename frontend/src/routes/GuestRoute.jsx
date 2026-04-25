import React from 'react'
import {useAuth} from "../hooks/useAuth.js";
import {Navigate, Outlet} from "react-router-dom";

const GuestRoute = () => {
    const {isAuthenticated, authLoading} = useAuth()

    if (authLoading) {
        return <p>Loading...</p>
    }

    if (isAuthenticated) {
        return <Navigate to={"/dashboard"} replace/>
    }
    return <Outlet/>
}
export default GuestRoute
