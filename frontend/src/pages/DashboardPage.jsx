import React from 'react'
import {useAuth} from "../hooks/useAuth.js";

const DashboardPage = () => {
    const {user} = useAuth()

    return (
        <div>
            <h1 className="text-2xl font-semibold">Welcome Back, {user?.name}</h1>
            <p className="mt-2 text-slate-600">Your prompt workspace is ready.</p>
        </div>
    )
}
export default DashboardPage
