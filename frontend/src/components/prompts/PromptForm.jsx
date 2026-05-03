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

    const fieldIds = {
        title: "prompt-title",
        description: "prompt-description",
        content: "prompt-content",
        category: "prompt-category",
        tags: "prompt-tags",
    }

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
                <label htmlFor={fieldIds.title} className={"text-sm font-medium text-foreground"}>Título</label>
                <Input
                    id={fieldIds.title}
                    type={"text"}
                    maxLength={100}
                    placeholder={"Ej. Prompt para landing de SaaS"}
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={errors.title ? "prompt-title-error" : undefined}
                    {...register("title", {
                        required: "Debe ingresar un título",
                        minLength: {value: 3, message: "El título debe tener al menos 3 caracteres."},
                        maxLength: {value: 100, message: "El título no puede superar 100 caracteres."}
                    })}
                />
                {errors.title ? (
                    <p id="prompt-title-error" className={"mt-1 text-sm text-red-600"}>{errors.title.message}</p>
                ) : null}
            </div>

            <div className={"space-y-2"}>
                <label htmlFor={fieldIds.description}
                       className={"text-sm font-medium text-foreground"}>Descripción</label>
                <Textarea
                    id={fieldIds.description}
                    rows={4}
                    maxLength={300}
                    placeholder={"Describe brevemente para qué sirve este prompt"}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "prompt-description-error" : undefined}
                    {...register("description", {
                        maxLength: {value: 300, message: "La descripción no puede exceder 300 caracteres."}
                    })}
                />

                {errors.description ? (
                        <p id={"prompt-description-error"}
                           className={"mt-1 text-sm text-red-600"}>{errors.description.message}</p>)
                    : null}
            </div>

            <div className={"space-y-2"}>
                <label htmlFor={fieldIds.content} className={"text-sm font-medium text-foreground"}>Contenido del
                    prompt</label>
                <Textarea
                    id="prompt-content"
                    rows={10}
                    maxLength={10000}
                    className={"min-h-56 lg:min-h-72"}
                    placeholder={"Escribe aquí el contenido principal del prompt"}
                    aria-invalid={Boolean(errors.content)}
                    aria-describedby={errors.content ? "prompt-content-error" : undefined}
                    {...register("content", {
                        required: "Debe ingresar el contenido del prompt",
                        minLength: {
                            value: 10,
                            message: "El contenido debe tener al menos 10 caracteres."
                        },
                        maxLength: {value: 10000, message: "El contenido no puede superar 10000 caracteres"}
                    })}
                />
                {errors.content ? (
                    <p id="prompt-content-error" className={"mt-1 text-sm text-red-600"}>{errors.content.message}</p>
                ) : null}
            </div>

            <div className={"grid gap-4 md:grid-cols-2"}>
                <div className={"space-y-2"}>
                    <label id="prompt-category-label" htmlFor={fieldIds.category}
                           className={"text-sm font-medium text-foreground"}>Categoría</label>
                    <Select
                        value={selectedCategory || "__none__"}
                        onValueChange={(value) => setValue("category", value === "__none__" ? "" : value)
                        }
                    >
                        <SelectTrigger
                            id={fieldIds.category}
                            className={"w-full"}>
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
                    <label htmlFor={fieldIds.tags} className={"text-sm font-medium text-foreground"}>Etiquetas</label>
                    <Input
                        id={fieldIds.tags}
                        type={"text"}
                        maxLength={300}
                        placeholder={"marketing, ai, linkeding"}
                        aria-invalid={Boolean(errors.tags)}
                        aria-describedby={errors.tags ? "prompt-tags-error" : "prompt-tags-help"}
                        {...register("tags", {
                            validate: (value) => {
                                if (!value.trim()) return true

                                const tags = value
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter(Boolean)

                                if (tags.length > 10) {
                                    return "Puedes agregar un máximo de 10 etiquetas."
                                }

                                const invalidTag = tags.find((tag) => tag.length > 30)
                                if (invalidTag) {
                                    return "Cada etiqueta puede tener un máximo de 30 caracteres."
                                }

                                return true
                            }
                        })}
                    />

                    <p id="prompt-tags-help" className={"text-xs leading-5 text-muted-foreground"}>
                        Separa cada etiqueta con comas. Ejemplo: marketing, ai, linkedin
                    </p>

                    {errors.tags ? (
                        <p id={"prompt-tags-error"} className={"mt-1 text-sm text-red-600"}>{errors.tags.message}</p>
                    ) : null}
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