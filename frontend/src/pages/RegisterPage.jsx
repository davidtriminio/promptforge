import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import {useForm} from "react-hook-form";
import {Icon} from "@iconify/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import ErrorAlert from "@/components/common/ErrorAlert.jsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const RegisterPage = () => {
    const navigate = useNavigate()
    const {register: registerUser} = useAuth()
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm()

    const onSubmit = async (formData) => {
        setServerError("")

        try {
            await registerUser(formData)
            navigate("/dashboard")
        } catch (e) {
            setServerError(
                e.response?.data?.message || "No se pudo completar el registro."
            )
        }
    }
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/35 px-4 py-10">
            <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_26%)]"/>

            <div className="w-full max-w-md">
                <div className="mb-6 space-y-3 text-center">
                    <div
                        className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                        <Icon icon={"solar:user-plus-bold-duotone"} className={"h-6"}/>
                    </div>

                    <div>
                        <p className={"text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"}>PromptForge</p>
                        <h1 className={"mt-2 text-3xl font-semibold tracking-tight text-foreground"}>Crea tu cuenta</h1>
                        <p className={"mt-2 text-sm text-muted-foreground"}>Empieza a organizar tus prompts en un
                            Espacio De Trabajo privado.</p>
                    </div>
                </div>

                <Card className={"border-border/70 shadow-sm"}>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Crea tu cuenta para comenzar a guardar y reutilizar prompts.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {serverError ? <ErrorAlert message={serverError}/> : null}
                            <div className={"space-y-2"}>
                                <label className={"text-sm font-medium text-foreground"}>Nombre</label>
                                <Input
                                    type="text"
                                    placeholder={"Tu Nombre"}
                                    {...register("name", {
                                        required: "Debe ingresar un nombre.",
                                        minLength: {
                                            value: 2,
                                            message: "El nombre debe contener 2 o más carácteres.",
                                        },
                                    })}
                                />
                                {errors.name ? (
                                    <p className="text-sm text-destructive">
                                        {errors.name.message}
                                    </p>
                                ) : null}
                            </div>

                            <div className={"space-y-2"}>
                                <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
                                <Input
                                    type="email"
                                    placeholder={"tu@email.com"}
                                    {...register("email", {
                                        required: "Debe ingresar un correo.",
                                    })}
                                />
                                {errors.email ? (
                                    <p className="text-sm text-destructive">
                                        {errors.email.message}
                                    </p>
                                ) : null}
                            </div>

                            <div className={"space-y-2"}>
                                <label className="text-sm font-medium text-foreground">Contraseña</label>
                                <Input
                                    type="password"
                                    {...register("password", {
                                        required: "Debe ingresar una contraseña.",
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe contener al menos 6 carácteres",
                                        },
                                    })}
                                />
                                {errors.password ? (
                                    <p className="text-sm text-destructive">
                                        {errors.password.message}
                                    </p>
                                ) : null}
                            </div>

                            <Button
                                type="submit"
                                className={"w-full"}
                                disabled={isSubmitting}
                            >
                                <Icon icon={"solar:user-plus-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                                {isSubmitting ? "Creando Cuenta..." : "Registrarse"}
                            </Button>
                        </form>
                        <p className="mt-5 text-sm text-muted-foreground">
                            ¿Ya tienes una cuenta? {" "}
                            <Link to="/login" className={"font-medium text-foreground underline underline-offset-4"}>Iniciar
                                Sesión</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default RegisterPage
