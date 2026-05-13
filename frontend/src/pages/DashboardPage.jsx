import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import {getDashboardStatsRequest} from "../api/dashboardApi.js";
import StatsCard from "../components/dashboard/StatsCard.jsx";
import RecentPrompts from "../components/dashboard/RecentPrompts.jsx";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown.jsx";
import LoadingState from "@/components/common/LoadingState.jsx";
import ErrorAlert from "@/components/common/ErrorAlert.jsx";
import PageHeader from "@/components/common/PageHeader.jsx";
import useDocumentTitle from "@/hooks/useDocumentTitle.js";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";

const DashboardPage = () => {
    const {user} = useAuth()
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true)
                setError("")
                const data = await getDashboardStatsRequest()
                setDashboardData(data)
            } catch (e) {
                setError(e.response?.data?.message || "No se puede cargar el panel.")
            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [])

    useDocumentTitle("Panel")

    const stats = dashboardData?.stats || {
        totalPrompts: 0,
        totalFavorites: 0,
        usedCategoriesCount: 0
    }

    const recentPrompts = dashboardData?.recentPrompts || []
    const promptsByCategory = dashboardData?.promptsByCategory || []

    const topCategory = useMemo(() => {
        if (!promptsByCategory.length) return null
        return [...promptsByCategory].sort((a, b) => b.count - a.count)[0]
    }, [promptsByCategory])

    const activeThisWeek = useMemo(() => {
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
        return recentPrompts.filter((prompt) => new Date(prompt.createdAt).getTime() >= sevenDaysAgo).length
    }, [recentPrompts])

    const favoriteRatio = stats.totalPrompts
        ? Math.round((stats.totalFavorites / stats.totalPrompts) * 100)
        : 0

    const onboardingSteps = [
        {
            label: "Crea tu primer prompt",
            done: stats.totalPrompts > 0,
            hint: "Comienza construyendo tu librería con un prompt reutilizable."
        },
        {
            label: "Organiza con categorías",
            done: stats.usedCategoriesCount > 0,
            hint: "Las categorías hacen que la búsqueda y el filtrado sean mucho más rápidos."
        },
        {
            label: "Marca prompts importantes como favoritos",
            done: stats.totalFavorites > 0,
            hint: "Los favoritos mejoran el acceso rápido y hacen el panel más dinámico."
        }
    ]

    if (loading) return <LoadingState message={"Cargando panel..."}/>
    if (error) return <ErrorAlert message={error}/>

    return (
        <div className="space-y-8">
            <PageHeader
                eyebrow={"Vista previa de tu espacio"}
                title={`Bienvenido de nuevo, ${user?.name || "Usuario"}`}
                description={"Monitorea el estado de tu librería de prompts, vuelve rápidamente a tu trabajo reciente y mantén PromptForge organizado mientras crece."}
                icon={"solar:widget-5-bold-duotone"}
                meta={<Badge variant={"secondary"}>Espacio de trabajo profesional</Badge>}
                action={
                    <Button asChild>
                        <Link to={"/prompts"}>
                            <Icon icon={"solar:add-circle-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                            Crear prompt
                        </Link>
                    </Button>
                }
            />

            <section className="grid gap-4 xl:grid-cols-[1.25fr_repeat(3,minmax(0,1fr))]">
                <StatsCard
                    label="Librería de prompts"
                    value={stats.totalPrompts}
                    hint="Total de prompts en tu espacio de trabajo."
                    icon="solar:document-text-bold-duotone"
                    trend={activeThisWeek > 0 ? `${activeThisWeek} creados esta semana` : "Sin nuevos prompts esta semana"}
                    tone="primary"
                    featured
                />
                <StatsCard
                    label="Favoritos"
                    value={stats.totalFavorites}
                    hint="Acceso rápido a prompts favoritos."
                    icon="solar:star-bold-duotone"
                    trend={favoriteRatio ? `${favoriteRatio}% de la librería.` : "Puedes marcar algunos como favoritos"}
                    tone="warning"
                />
                <StatsCard
                    label="Categorías"
                    value={stats.usedCategoriesCount}
                    hint="Las categorías son útiles para ordenar tu librería."
                    icon="solar:folder-with-files-bold-duotone"
                    trend={topCategory ? `${topCategory.name} tiene más prompts` : "Ninguna categoría contiene prompts aún."}
                    tone="success"
                />
                <StatsCard
                    label="Actividad reciente"
                    value={activeThisWeek}
                    hint="Prompts creados en la última semana."
                    icon="solar:clock-circle-bold-duotone"
                    trend={recentPrompts[0] ? "Actividad semanal detectada" : "No hay actividad de prompts"}
                />
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <Card className={"border-border/70 shadow-sm"}>
                    <CardHeader>
                        <CardTitle>Resumen del espacio de trabajo</CardTitle>
                        <CardDescription>
                            Pequeñas métricas que hacen que el panel sea útil y no solo decorativo.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className={"grid gap-3 md:grid-cols-3"}>
                        <div className={"rounded-3xl border border-border/70 bg-muted/35 p-4"}>
                            <p className={"text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"}>
                                Categoría principal
                            </p>

                            <p className={"mt-3 text-base font-semibold text-foreground"}>
                                {topCategory ? topCategory.name : "Sin datos de categorías"}
                            </p>

                            <p className={"mt-1 text-sm text-muted-foreground"}>
                                {topCategory
                                    ? `${topCategory.count} prompts agrupados actualmente aquí.`
                                    : "Agrega categorías para mejorar la organización."
                                }
                            </p>
                        </div>

                        <div className={"rounded-3xl border border-border/70 bg-muted/35 p-4"}>
                            <p className={"text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"}>
                                Calidad de la librería
                            </p>

                            <p className={"mt-3 text-base font-semibold text-foreground"}>
                                {favoriteRatio}% en favoritos
                            </p>

                            <p className={"mt-1 text-sm text-muted-foreground"}>
                                Un buen porcentaje de favoritos hace más rápido el acceso a trabajos repetitivos.
                            </p>
                        </div>

                        <div className={"rounded-3xl border border-border/70 bg-muted/35 p-4"}>
                            <p className={"text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"}>
                                Próximo enfoque
                            </p>

                            <p className={"mt-3 text-base font-semibold text-foreground"}>
                                {stats.totalPrompts === 0
                                    ? "Crea tu primer prompt"
                                    : "Mejora la estructura y los metadatos"
                                }
                            </p>

                            <p className={"mt-1 text-sm text-muted-foreground"}>
                                Los mejores paneles guían la siguiente acción en lugar de solo mostrar números.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className={"border-border/70 shadow-sm"}>
                    <CardHeader>
                        <CardTitle>Lista de configuración</CardTitle>

                        <CardDescription>
                            Convierte un espacio vacío en un sistema de prompts listo para producción.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className={"space-y-3"}>
                        {onboardingSteps.map((step) => (
                            <div
                                key={step.label}
                                className={"flex items-start gap-3 rounded-3xl border border-border/70 bg-muted/25 p-4"}
                            >
                                <div className={"mt-0.5"}>
                                    <Icon
                                        icon={step.done
                                            ? "solar:check-circle-bold-duotone"
                                            : "solar:rocket-bold-duotone"
                                        }
                                        className={"h-5 w-5 text-foreground"}
                                    />
                                </div>

                                <div className={"space-y-1"}>
                                    <p className={"text-sm font-semibold text-foreground"}>
                                        {step.label}
                                    </p>

                                    <p className={"text-sm text-muted-foreground"}>
                                        {step.hint}
                                    </p>
                                </div>

                                <Badge
                                    variant={step.done ? "secondary" : "outline"}
                                    className={"ml-auto"}
                                >
                                    {step.done ? "Completado" : "Pendiente"}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <RecentPrompts items={recentPrompts}/>
                <CategoryBreakdown items={promptsByCategory}/>
            </section>
        </div>
    )
}

export default DashboardPage