import {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../hooks/useAuth.js"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Icon} from "@iconify/react"
import ErrorAlert from "@/components/common/ErrorAlert.jsx"
import {getApiErrorMessage} from "@/utils/getApiErrorMessage.js"
import useDocumentTitle from "@/hooks/useDocumentTitle.js"

const DemoAccessPage = () => {
    const navigate = useNavigate()
    const {demoLogin} = useAuth()
    const [error, setError] = useState("")
    const [isStartingDemo, setIsStartingDemo] = useState(true)

    useDocumentTitle("Acceso demo")

    useEffect(() => {
        const startDemoSession = async () => {
            setError("")
            setIsStartingDemo(true)

            try {
                await demoLogin()
                navigate("/dashboard", {replace: true})
            } catch (e) {
                setError(getApiErrorMessage(e, "No se pudo iniciar la demo."))
            } finally {
                setIsStartingDemo(false)
            }
        }

        startDemoSession()
    }, [demoLogin, navigate])

    return (
        <div className={"relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/35 px-4 py-10"}>
            <div
                className={"absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_26%)]"}
            />

            <div className={"w-full max-w-md"}>
                <Card className={"border-border/70 shadow-sm"}>
                    <CardHeader className={"text-center"}>
                        <div className={"mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"}>
                            <Icon icon={"solar:rocket-bold-duotone"} className={"h-6 w-6"}/>
                        </div>

                        <CardTitle>Preparando tu acceso demo</CardTitle>
                        <CardDescription>
                            Estamos creando una cuenta temporal con datos de ejemplo para que explores PromptForge.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className={"space-y-4"}>
                        {error ? <ErrorAlert message={error}/> : null}

                        {isStartingDemo ? (
                            <div className={"rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm text-muted-foreground"}>
                                Creando usuario demo, generando datos iniciales y redirigiendo al panel...
                            </div>
                        ) : null}

                        {!isStartingDemo && error ? (
                            <div className={"flex flex-col gap-3"}>
                                <Button type={"button"} onClick={() => window.location.reload()}>
                                    <Icon icon={"solar:restart-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                                    Reintentar demo
                                </Button>

                                <Button asChild variant={"outline"}>
                                    <Link to={"/login"}>
                                        Volver a iniciar sesión
                                    </Link>
                                </Button>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DemoAccessPage
