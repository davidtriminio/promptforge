import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import {useForm} from "react-hook-form";

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
                errors.response?.data?.message || "Unable to register"
            )
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold">Create account</h1>
                <p className="mt-2 text-sm text-slate-600">
                    Start organizing your prompts privately.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full rounded-md border px-3 py-2"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full rounded-md border px-3 py-2"
                            {...register("email", {
                                required: "Email is required",
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
                        <input
                            type="password"
                            className="w-full rounded-md border px-3 py-2"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-sm text-red-600">{serverError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-slate-900 px-4 py-2 text-white"
                    >
                        {isSubmitting ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    Already have an account? <Link to="/login" className="underline">Login</Link>
                </p>
            </div>
        </div>
    )

}
export default RegisterPage
