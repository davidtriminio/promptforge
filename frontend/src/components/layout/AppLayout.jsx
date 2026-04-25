import React from 'react'
import {useAuth} from "../../hooks/useAuth.js";
import {Link, NavLink, Outlet} from "react-router-dom";

const AppLayout = () => {
    const {user, logout} = useAuth()
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <Link to="/dashboard" className="text-xl font-semibold">
                        PromptForge
                    </Link>

                    <div className="flex items-cente gap-4">
                        <span className="text-sm text-slate-600">
                            {user?.name}
                        </span>
                        <button onClick={logout}
                                className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
                <aside className="rounded-lg bg-white p-4 shadow-sm">
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/prompts">Prompts</NavLink>
                    </nav>
                </aside>

                <main className="rounded-lg bg-white p-6 shadow-sm">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default AppLayout
