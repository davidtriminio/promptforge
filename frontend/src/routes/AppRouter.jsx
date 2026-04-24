import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GuestRoute from "./GuestRoute.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AppLayout from "../components/layout/AppLayout.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import PromptsPage from "../pages/PromptsPage.jsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={GuestRoute}>
                    <Route path="/login" element={LoginPage}/>
                    <Route path="/register" element={RegisterPage}/>
                </Route>

                <Route element={ProtectedRoute}>
                    <Route element={AppLayout}/>
                    <Route path="/dashboard" element={DashboardPage}/>
                    <Route path="/prompts" element={PromptsPage}/>
                </Route>

                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
            </Routes>


        </BrowserRouter>
    )
}
export default AppRouter
