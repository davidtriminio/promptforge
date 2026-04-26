import {useForm} from "react-hook-form";

const PromptForm = ({
    initialValues,
    categories,
    onSubmit,
    submitLabel = "Save prompt",
    isSubmitting = false
}) => {
    const {
        register,
        handleSubmit,
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
        <form onSubmit={handleSubmit(submitHandler)} className={"space-y-4"}>
            <div>
                <label className={"mb-1 block text-sm font-medium"}>Title</label>
                <input
                type={"text"}
                className={"input input-bordered w-full rounded-md"}
                {...register("title", {
                    required: "Title is required",
                    minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters"
                    }
                })}
                />
                {errors.title &&(
                    <p className={"mt-1 text-sm text-red-600"}>{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className={"mb-1 block text-sm font-medium"}>Description</label>
                <textarea
                className={"textarea textarea-bordered w-full rounded-md"}
                rows={"3"}
                {...register("description")}
                />
            </div>

            <div>
                <label className={"mb-1 block text-sm font-medium"}>Prompt content</label>
                <textarea
                className={"textarea textarea-bordered w-full rounded-md"}
                rows={8}
                {...register("content", {
                    required: "Prompt content is required",
                    minLength: {
                        value: 10,
                        message: "Prompt content must be at least 10 characters"
                    }
                })}
                />
                {errors.content && (
                    <p className={"mt-1 text-sm text-red-600"}>{errors.content.message}</p>
                )}
            </div>

            <div className={"grid gap-4 md:grid-cols-2"}>
                <div>
                    <label className={"mb-1 block text-sm font-medium"}>Category</label>
                    <select
                    className={"select select-bordered w-full rounded-md"}
                    {...register("category")}>
                        <option value={""}>No category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={"mb-1 block text-sm font-medium"}>Tags</label>
                    <input
                    type={"text"}
                    placeholder={"marketing, ai, linkeding"}
                    className={"input input-bordered w-full rounded-md"}
                    {...register("tags")}
                    />
                </div>
            </div>

            <div className={"flex justify-end"}>
                <button
                type={"submit"}
                className={"btn btn-neutral rounded-md"}
                disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    )
}

export default PromptForm