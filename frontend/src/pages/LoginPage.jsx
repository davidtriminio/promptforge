import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import {useForm} from "react-hook-form";

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
            console.log(e)
            setServerError(
                e.response?.data?.message || "Unable to login"
            )
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold">Login</h1>
                <p className="mt-2 text-sm text-slate-600">
                    Access your private prompt workspace.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Email</label>
                        <input type="email"
                               className="w-full rounded-md border px-3 py-2"
                               {...register("email", {
                                   required: "Email is required"
                               })}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Password</label>
                        <input type="password"
                               className="w-full rounded-md border px-3 py-2"
                               {...register("password", {
                                   required: "Password is required"
                               })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-sm text-red-600">
                            {serverError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-slate-900 px-4 py-2 text-white">
                        {isSubmitting ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    No account yet? <Link to="/register" className="underline">Create One</Link>
                </p>

            </div>
        </div>
    )
}
export default LoginPage
