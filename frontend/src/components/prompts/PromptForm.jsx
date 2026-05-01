import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

const PromptForm = ({
    initialValues,
    categories,
    onSubmit,
    submitLabel = "Guardar prompt",
    isSubmitting = false
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {errors}
    } = useForm({
        defaultValues: {
            title: initialValues?.title || "",
            description: initialValues?.description || "",
            content: initialValues?.content || "",
            category: initialValues?.category?._id || "",
            tags: initialValues?.tags?.join(", ") || ""
        }
    })

    useEffect(() => {
        reset({
            title: initialValues?.title || "",
            description: initialValues?.description || "",
            content: initialValues?.content || "",
            category: initialValues?.category?._id || "",
            tags: initialValues?.tags?.join(", ") || ""
        })
    }, [initialValues, reset]);

    const selectedCategory = watch("category")

    const submitHandler = (values) => {
        const payload = {
            title: values.title,
            description: values.description,
            content: values.content,
            category: values.category || null,
            tags: values.tags
            ? values.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : []
        }
        onSubmit(payload)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={"space-y-5"}>
            <div className={"space-y-2"}>
                <label className={"text-sm font-medium text-foreground"}>Título</label>
                <Input
                type={"text"}
                placeholder={"Ej. Prompt para landing de SaaS"}
                {...register("title", {
                    required: "Debe ingresar un título",
                    minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 carácteres."
                    }
                })}
                />
                {errors.title ? (
                    <p className={"mt-1 text-sm text-red-600"}>{errors.title.message}</p>
                ) : null}
            </div>

            <div className={"space-y-2"}>
                <label className={"text-sm font-medium text-foreground"}>Descripción</label>
                <Textarea
                rows={3}
                placeholder={"Describe brevemente para qué sirve este prompt"}
                {...register("description")}
                />
            </div>

            <div className={"space-y-2"}>
                <label className={"text-sm font-medium text-foreground"}>Contenido del prompt</label>
                <Textarea
                rows={8}
                placeholder={"Escribe aquí el contenido principal del prompt"}
                {...register("content", {
                    required: "Debe ingresar el contenido del prompt",
                    minLength: {
                        value: 10,
                        message: "El contenido debe tener al menos 10 carácteres."
                    }
                })}
                />
                {errors.content ? (
                    <p className={"mt-1 text-sm text-red-600"}>{errors.content.message}</p>
                ) : null}
            </div>

            <div className={"grid gap-4 md:grid-cols-2"}>
                <div className={"space-y-2"}>
                    <label className={"text-sm font-medium text-foreground"}>Categoría</label>
                    <Select
                    value={selectedCategory || "__none__"}
                    onValueChange={(value) => setValue("category", value === "__none__" ? "" : value)
                    }
                    >
                        <SelectTrigger className={"w-full"}>
                            <SelectValue placeholder={"Sin categoría"}/>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={"__none__"}>Sin categoría</SelectItem>
                            {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                                {category.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className={"space-y-2"}>
                    <label className={"text-sm font-medium text-foreground"}>Etiquetas</label>
                    <Input
                    type={"text"}
                    placeholder={"marketing, ai, linkeding"}
                    {...register("tags")}
                    />
                </div>
            </div>

            <div className={"flex justify-end"}>
                <Button
                type={"submit"}
                disabled={isSubmitting}
                >
                    {isSubmitting ? "Guardando..." : submitLabel}
                </Button>
            </div>
        </form>
    )
}

export default PromptForm