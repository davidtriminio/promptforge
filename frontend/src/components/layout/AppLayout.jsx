import React from 'react'
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div className={"min-h-screen bg-slate-100 text-slate-900"}>
            <Header/>

            <div className={"mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]"}>
                <Sidebar/>
                <main className={"min-w-0"}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default AppLayout
