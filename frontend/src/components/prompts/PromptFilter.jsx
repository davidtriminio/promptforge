import {useState} from "react";

const PromptFilter = ({filters, categories, onApply}) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (event) => {
        const {name, value} = event.target
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onApply(localFilters)
    }

    const handleReset = () => {
        const resetFilters = {
            search: "",
            category: "",
            tag: "",
            favorite: "",
            sort: "newest"
        }

        setLocalFilters(resetFilters)
        onApply(resetFilters)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={"rounded-lg border bg-white p-4 shadow-sm"}
        >
            <div className={"grid gap-3 md:grid-cols-2 xl:grid-cols-5"}>
                <input
                    type={"text"}
                    name={"search"}
                    placeholder={"Search Prompts"}
                    className={"input input-bordered w-full rounded-md"}
                    value={localFilters.search}
                    onChange={handleChange}
                />

                <select
                    name={"category"}
                    className={"select select-bordered w-full rounded-md"}
                    value={localFilters.category}
                    onChange={handleChange}
                >
                    <option value={""}>
                        All Categories
                    </option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type={"text"}
                    name={"tag"}
                    placeholder={"Filter by tag"}
                    className={"input input-bordered w-full rounded-md"}
                    value={localFilters.tag}
                    onChange={handleChange}
                />

                <select
                    name={"favorite"}
                    className={"select select-bordered w-full rounded-md"}
                    value={localFilters.favorite}
                    onChange={handleChange}
                >
                    <option value={""}>All prompts</option>
                    <option value={"true"}>Favorites</option>
                    <option value={"false"}>Non-Favorites</option>
                </select>

                <select
                    name={"sort"}
                    className={"select select-bordered w-full rounded-md"}
                    value={localFilters.sort}
                    onChange={handleChange}
                >
                    <option value={"newest"}>Newest</option>
                    <option value={"oldest"}>Oldest</option>
                    <option value={"updated"}>Recently Updated</option>
                    <option value={"title_asc"}>Title A-Z</option>
                    <option value={"title_desc"}>Title Z-A</option>
                </select>
            </div>

            <div className={"mt-4 flex flex-wrap gap-3"}>
                <button type={"submit"} className={"btn btn-neutral rounded-md"}>
                    Apply filters
                </button>
                <button
                    type={"button"}
                    className={"btn btn-ghost rounded-md"}
                    onClick={handleReset}>
                    Reset
                </button>
            </div>

        </form>
    )
}
export default PromptFilter
