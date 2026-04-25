const RecentPrompts = ({items = []}) => {
    return (<section className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                Recent prompts
            </h2>
            {items.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                    You have not created prompts yet.
                </p>
            ) : (
                <div className="mt-5 space-y-4">
                    {items.map((prompt) => (<div
                        key={prompt._id}
                        className="rounded-md border p-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-medium text-slate-900">
                                    {prompt.title}
                                </h3>
                                <p className="mt-1 text-sm text-slate-600">
                                    {prompt.description || "No description provided."}
                                </p>
                            </div>

                            {prompt.isFavorite ? (<span className="text-sm text-amber-600">Favorite</span>) : null}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>
                  {new Date(prompt.createdAt).toLocaleDateString()}
                </span>
                            <span>
                  {prompt.category?.name || "Uncategorized"}
                </span>
                        </div>
                    </div>))}
                </div>
            )}
        </section>
    )
}
export default RecentPrompts
