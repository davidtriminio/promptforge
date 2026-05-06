import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    clearPromptDraft,
    formatPromptDraftDate,
    readPromptDraft,
    writePromptDraft
} from "@/utils/promptDraftStorage.js";
import QuickCategoryDialog from "@/components/categories/QuickCategoryDialog.jsx";

const getPromptFormValues = (initialValues) => ({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    content: initialValues?.content || "",
    category: initialValues?.category?._id || "",
    tags: initialValues?.tags?.join(", ") || ""
})

const PromptForm = ({
                        initialValues,
                        categories,
                        onSubmit,
                        onCreateCategory,
                        submitLabel = "Guardar prompt",
                        isSubmitting = false,
                        isCreatingCategory = false,
                        draftKey = null
                    }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {errors}
    } = useForm({
        defaultValues: getPromptFormValues(initialValues)
    })

    const [isDraftReady, setIsDraftReady] = useState(false)
    const [draftSavedAt, setDraftSavedAt] = useState(null)
    const [isQuickCategoryOpen, setIsQuickCategoryOpen] = useState(false)

    useEffect(() => {
        const baseValues = getPromptFormValues(initialValues)

        if (!draftKey || initialValues?._id) {
            reset(baseValues)
            setDraftSavedAt(null)
            setIsDraftReady(true)
            return
        }

        const savedDraft = readPromptDraft(draftKey)

        if (!savedDraft) {
            reset(baseValues)
            setDraftSavedAt(null)
            setIsDraftReady(true)
            return
        }

        reset({
            title: savedDraft.values.title || "",
            description: savedDraft.values.description || "",
            content: savedDraft.values.content || "",
            category: savedDraft.values.category || "",
            tags: savedDraft.values.tags || ""
        })
        setDraftSavedAt(savedDraft.savedAt)
        setIsDraftReady(true)
    }, [draftKey, initialValues, reset])

    const selectedCategory = watch("category")
    const watchedValues = watch()

    useEffect(() => {
        if (!draftKey || initialValues?._id || !isDraftReady) return

        const timeoutId = window.setTimeout(() => {
            const savedDraft = writePromptDraft(draftKey, watchedValues)
            setDraftSavedAt(savedDraft?.savedAt || null)
        }, 400)

        return () => window.clearTimeout(timeoutId)
    }, [draftKey, initialValues, isDraftReady, watchedValues])



    const fieldIds = {
        title: "prompt-title",
        description: "prompt-description",
        content: "prompt-content",
        category: "prompt-category",
        tags: "prompt-tags",
    }

    const handleClearDraft = () => {
        clearPromptDraft(draftKey)
        reset(getPromptFormValues(initialValues))
        setDraftSavedAt(null)
    }

    const submitHandler = async (values) => {
        const payload = {
            title: values.title,
            description: values.description,
            content: values.content,
            category: values.category || null,
            tags: values.tags
                ? values.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : []
        }
        await onSubmit(payload)

        if (draftKey) {
            clearPromptDraft(draftKey)
            setDraftSavedAt(null)
        }
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
                    id={fieldIds.content}
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

            <div className={"space-y-2"}>
                <div className={"flex items-center justify-between gap-3"}>
                    <label
                        id="prompt-category-label"
                        htmlFor={fieldIds.category}
                        className={"text-sm font-medium text-foreground"}
                    >
                        Categoría
                    </label>

                    {onCreateCategory ? (
                        <Button
                            type={"button"}
                            variant={"outline"}
                            size={"sm"}
                            onClick={() => setIsQuickCategoryOpen(true)}
                        >
                            Nueva categoría
                        </Button>
                    ) : null}
                </div>

                <Select
                    value={selectedCategory || "__none__"}
                    onValueChange={(value) =>
                        setValue("category", value === "__none__" ? "" : value, {
                            shouldDirty: true,
                            shouldValidate: true
                        })
                    }
                >
                    <SelectTrigger
                        id={fieldIds.category}
                        className={"w-full"}
                    >
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

                {onCreateCategory ? (
                    <QuickCategoryDialog
                        isOpen={isQuickCategoryOpen}
                        onOpenChange={setIsQuickCategoryOpen}
                        isCreating={isCreatingCategory}
                        onCreate={async (payload) => {
                            const createdCategory = await onCreateCategory(payload)

                            setValue("category", createdCategory._id, {
                                shouldDirty: true,
                                shouldValidate: true
                            })

                            return createdCategory
                        }}
                    />
                ) : null}
            </div>

            <div className={"border-t pt-4 space-y-4"}>
                <p className={"max-w-none text-sm leading-6 text-muted-foreground"}>
                    {draftSavedAt
                        ? `Borrador guardado automáticamente el ${formatPromptDraftDate(draftSavedAt)}. Expira en 72 horas si no lo guardas.`
                        : "El borrador se guarda automáticamente en este navegador y expira en 72 horas."}
                </p>

                <div className={"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>
                    <div className={"flex"}>
                        {draftKey && !initialValues?._id ? (
                            <Button
                                type={"button"}
                                variant={"outline"}
                                size={"sm"}
                                className={"w-full sm:w-auto border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"}
                                onClick={handleClearDraft}
                            >
                                Limpiar borrador
                            </Button>
                        ) : null}
                    </div>

                    <div className={"flex sm:justify-end"}>
                        <Button
                            type={"submit"}
                            disabled={isSubmitting}
                            className={"w-full sm:w-auto"}
                        >
                            {isSubmitting ? "Guardando..." : submitLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PromptForm
