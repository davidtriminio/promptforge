import {useEffect, useState} from "react";
import {createCategoryRequest, deleteCategoryRequest, getCategoriesRequest} from "@/api/categoryApi.js";
import ErrorAlert from "@/components/common/ErrorAlert.jsx";
import LoadingState from "@/components/common/LoadingState.jsx";
import CategoryManager from "@/components/categories/CategoryManager.jsx";
import PageHeader from "@/components/common/PageHeader.jsx";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [error, setError] = useState("")

    const loadCategories = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await getCategoriesRequest()
            setCategories(data.categories || [])
        } catch (e) {
            setError(e.response?.data?.message || "Unable to load categories.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategories()
    }, []);

    const handleCreateCategory = async (payload) => {
        try {
            setCreating(true)
            setError("")
            await createCategoryRequest(payload)
            await loadCategories()
        } catch (e) {
            setError(e.response?.data?.message || "Unable to create category.")
        } finally {
            setCreating(false)
        }
    }

    const handleDeleteCategory = async (category) => {
        try {
            setError("")
            await deleteCategoryRequest(category._id)
            await loadCategories()
        } catch (e) {
            setError(e.response?.data?.message || "Unable to delete category.")
        }
    }

    return (
        <div className={"space-y-6"}>
            <PageHeader
                eyebrow={"Workspace"}
                title={"Categories"}
                description={"Administra las categorías que usarás para organizar tu biblioteca de prompts."}
                icon={"solar:folder-with-files-bold-duotone"}
            />

            {error ? <ErrorAlert message={error}/> : null}


            {loading ? (
                <LoadingState message={"Loading categories..."}/>
            ) : (
                <CategoryManager
                    categories={categories}
                    onCreate={handleCreateCategory}
                    onDelete={handleDeleteCategory}
                    isCreating={creating}
                />
            )}

        </div>
    )
}
export default CategoriesPage
