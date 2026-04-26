const CategoryBreakdown = ({items = []}) => {
    return (<section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
                Prompts by Category
            </h2>
        </div>

        {items.length === 0 ? (<p className="mt-4 text-sm text-slate-500">
            No prompts yet.
        </p>) : (<div className="mt-5 space-y-4">
            {items.map((item) => (<div
                key={item._id ?? "uncategorized"}
                className="flex items-center justify-between gap-4"
            >
                <div className="flex items-center gap-3">
                <span
                    className="h-3 w-3 rounded-full"
                    style={{backgroundColor: item.color}}
                />
                    <span className="text-sm font-medium text-slate-700">
                  {item.name}
                </span>
                </div>

                <span className="text-sm text-slate-500">{item.count}</span>
            </div>))}
        </div>)}

    </section>)
}
export default CategoryBreakdown
