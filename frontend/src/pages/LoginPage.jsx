import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import {useForm} from "react-hook-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Icon} from "@iconify/react";
import ErrorAlert from "@/components/common/ErrorAlert.jsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const LoginPage = () => {
    const navigate = useNavigate()
    const {login} = useAuth()
    const [serverError, setServerError] = useState("")

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm()

    const onSubmit = async (formData) => {
        setServerError("")
        try {
            await login(formData)
            navigate("/dashboard")
        } catch (e) {
            setServerError(
                e.response?.data?.message || "No se puede iniciar sesión."
            )
        }
    }

    return (
        <div
            className={"relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/35 px-4 py-10"}>
            <div
                className={"absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_26%)]"}/>

            <div className={"w-full max-w-md"}>
                <div className={"mb-6 space-y-3 text-center"}>
                    <div
                        className={"mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"}>
                        <Icon icon="solar:document-add-bold-duotone" className={"h-6 w-6"}/>
                    </div>

                    <div>
                        <p className={"text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"}>
                            PromptForge
                        </p>
                        <h1 className={"mt-2 text-3xl font-semibold tracking-tight text-foreground"}>
                            Bienvenido de nuevo
                        </h1>
                        <p className={"mt-2 text-sm text-muted-foreground"}>
                            Accede a tu Espacio De Trabajo privado de prompts.
                        </p>
                    </div>
                </div>

                <Card className={"border-border/70 shadow-sm"}>
                    <CardHeader>
                        <CardTitle>Iniciar Sesión</CardTitle>
                        <CardDescription>
                            Inicia sesión para continuar trabajando en tu biblioteca.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className={"space-y-4"}>
                            {serverError ? <ErrorAlert message={serverError}/> : null}

                            <div className={"space-y-2"}>
                                <label className={"text-sm font-medium text-foreground"}>Correo Electrónico</label>
                                <Input
                                    type={"email"}
                                    placeholder={"tu@email.com"}
                                    {...register("email", {
                                        required: "Debe ingresar un correo."
                                    })}
                                />

                                {errors.email ? (
                                    <p className={"text-sm text-destructive"}>{errors.email.message}</p>
                                ) : null
                                }
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Tu contraseña"
                                    {...register("password", {
                                            required: "Debe ingresar una contraseña."
                                        }
                                    )}/>
                                {errors.password ? (
                                    <p className="text-sm text-destructive">{errors.password.message}</p>
                                ) : null}
                            </div>

                            <Button type={"submit"} className={"w-full"} disabled={isSubmitting}>
                                <Icon icon={"solar:login-3-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                                {isSubmitting ? "Iniciando Sesión" : "Iniciar Sesión"}
                            </Button>
                        </form>

                        <p className={"mt-5 text-sm text-muted-foreground"}>
                            ¿No tienes cuenta?{" "}
                            <Link to={"/register"}
                                  className={"font-medium text-foreground underline underline-offset-4"}>
                                Crear cuenta
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default LoginPage
