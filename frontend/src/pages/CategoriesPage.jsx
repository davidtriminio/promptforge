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
            setError(e.response?.data?.message || "No se puedieron cargar las categorías.")
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
            setError(e.response?.data?.message || "No se pudieron cargar las categorías.")
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
            setError(e.response?.data?.message || "No se pudo eliminar la categoría.")
        }
    }

    return (
        <div className={"space-y-6"}>
            <PageHeader
                eyebrow={"Espacio De Trabajo"}
                title={"Categories"}
                description={"Administra las categorías que usarás para organizar tu biblioteca de prompts."}
                icon={"solar:folder-with-files-bold-duotone"}
            />

            {error ? <ErrorAlert message={error}/> : null}


            {loading ? (
                <LoadingState message={"Cargando Categorías..."}/>
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
