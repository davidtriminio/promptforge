const CategoryManager = ({
                             categories,
                             onCrete,
                             onDelete,
                             isCreating = false
                         }) => {
    const [name, setName] = useState("")
    const [color, setColor] = useState("#6366f1")

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!name.trim()) return

        onCrete({
            name: name.trim(),
            color
        })

        setName("")
        setColor("#6366f1")
    }

    return (
        <section className={"rounded-lg border bg-white p-5 shadow-sm"}>
            <h2 className={"text-lg font-semibold text-slate-900"}>Categories</h2>

            <form onSubmit={handleSubmit} className={"mt-4 flex flex-col gap-3 md:flex-row"}>
                <input
                    type={"text"}
                    className={"input input-bordered w-full rounded-md"}
                    placeholder={"New category name"}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type={"color"}
                    className={"h-11 w-full rounded-md border md:w-16"}
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                />
                <input
                    type={"submit"}
                    className={"btn btn-neutral rounded-md"}
                    disabled={isCreating}
                >
                    {isCreating ? "Adding..." : "Add"}
                </input>
            </form>
            <div className={"mt-4 flex flex-wrap gap-2"}>
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className={"flex items-center gap-2 rounded-md border px-3 py-2"}
                    >
                        <span className={"text-sm text-slate-700"}>{category.name}</span>
                        <button
                            type={"button"}
                            className={"text-sm text-red-600"}
                            onClick={() => onDelete(category)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default CategoryManager
