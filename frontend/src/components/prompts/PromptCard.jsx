const PromptCard = ({
                        prompt,
                        onEdit,
                        onDelete,
                        onToggleFavorite
                    }) => {
    return (
        <article className={"rounded-lg border bg-white p-5 shadow-sm"}>
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                            {prompt.title}
                        </h3>
                        {prompt.isFavorite ? (
                            <span className={"badge badge-warning badge-outline"}>Favorite</span>
                        ) : null}
                    </div>

                    <p className="mt-2 text-sm text-slate-600">
                        {prompt.description || "No description Provided."}
                    </p>
                </div>
                <div className={"flex shrink-0 gap-2"}>
                    <button
                        type={"button"}
                        className={"btn btn-sm rounded-md"}
                        onClick={() => onToggleFavorite(prompt)}
                    >
                        {prompt.isFavorite ? "Unfavorite" : "favorite"}
                    </button>

                    <button
                        type={"button"}
                        className={"btn btn-sm btn-ghost rounded-md"}
                        onClick={() => onEdit(prompt)}
                    >
                        Edit
                    </button>

                    <button
                        type={"button"}
                        className={"btn btn-sm btn-ghost rounded-md"}
                        onClick={() => onDelete(prompt)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className={"mt-4"}>
                <p className={"line-clamp-4 whitespace-pre-wrap text-sm text-slate-700"}>
                    {prompt.content}
                </p>
            </div>

            <div className={"mt-4 flex flex-wrap items-center gap-2"}>
                <span className={"badge badge-outline"}>
                    {prompt.category?.name || "Uncategorized"}
                </span>

                {prompt.tags?.map((tag) => (
                    <span key={tag} className={"badge badge-ghost"}>
                        #{tag}
                    </span>
                ))}
            </div>
        </article>
    )
}
export default PromptCard