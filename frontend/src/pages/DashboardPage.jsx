import {useEffect, useState} from 'react'
import {useAuth} from "../hooks/useAuth.js";
import {getDashboardStatsRequest} from "../api/dashboardApi.js";
import StatsCard from "../components/dashboard/StatsCard.jsx";
import RecentPrompts from "../components/dashboard/RecentPrompts.jsx";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown.jsx";

const DashboardPage = () => {
    const {user} = useAuth()
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true)
                setError("")
                const data = await getDashboardStatsRequest()
                setDashboardData(data)
            } catch (e) {
                setError(
                    e.response?.data?.message || "Unable to load dashboard"
                )
            } finally {
                setLoading(false)
            }
        }
        loadDashboard()
    }, [])

    if (loading) {
        return <p className="text-slate-500">Loading dashboard...</p>
    }

    if (error) {
        return <p className="text-red-600">{error}</p>
    }

    const stats = dashboardData?.stats || {
        totalPrompts: 0,
        totalFavorites: 0,
        usedCategoriesCount: 0
    }

    const recentPrompts = dashboardData?.recentPrompts || []
    const promptsByCategory = dashboardData?.promptsByCategory || []
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                    Welcome back, {user?.name}
                </h1>
                <p className="mt-2 text-slate-600">
                    Here is a quick look at your prompt workspace.
                </p>
            </div>

            <section className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    label="Total Prompts"
                    value={stats.totalPrompts}
                    hint={"All prompts in your private library."}
                />
                <StatsCard
                    label="Favorites"
                    value={stats.totalFavorites}
                    hint={"Prompts marked for quick access."}
                />
                <StatsCard
                    label="Categories in use"
                    value={stats.usedCategoriesCount}
                    hint={"Categories currently assignet to prompts."}
                />
            </section>
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <RecentPrompts items={recentPrompts}/>
                <CategoryBreakdown items={promptsByCategory}/>
            </section>

        </div>
    )
}
export default DashboardPage
