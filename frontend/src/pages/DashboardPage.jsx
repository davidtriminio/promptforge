import {useEffect, useState} from 'react'
import {useAuth} from "../hooks/useAuth.js";
import {getDashboardStatsRequest} from "../api/dashboardApi.js";
import StatsCard from "../components/dashboard/StatsCard.jsx";
import RecentPrompts from "../components/dashboard/RecentPrompts.jsx";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown.jsx";
import LoadingState from "@/components/common/LoadingState.jsx";
import ErrorAlert from "@/components/common/ErrorAlert.jsx";
import PageHeader from "@/components/common/PageHeader.jsx";

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
                    e.response?.data?.message || "No se puede cargar el Panel."
                )
            } finally {
                setLoading(false)
            }
        }
        loadDashboard()
    }, [])

    if (loading) {
        return <LoadingState message={"Cargando panel..."}/>
    }

    if (error) {
        return <ErrorAlert message={error}/>
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
            <PageHeader
                eyebrow={"Espacio de trabajo"}
                title={`Bienvenido de nuevo, ${user?.name || "Usuario"}`}
                description={"Aquí tienes una vista rápida del estado de tu biblioteca privada de prompts."}
                icon={"solar:widget-5-bold-duotone"}
                />

            <section className="grid gap-4 md:grid-cols-3">
                <StatsCard
                    label="Prompts Totales"
                    value={stats.totalPrompts}
                    hint={"Todos los prompts de tu biblioteca privada."}
                />
                <StatsCard
                    label="Favoritos"
                    value={stats.totalFavorites}
                    hint={"Prompts marcados para acceso rápido."}
                />
                <StatsCard
                    label="Categorías en uso"
                    value={stats.usedCategoriesCount}
                    hint={"Categorías actualmente asignadas a Prompts."}
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
