import {useEffect, useMemo, useState} from "react";
import {
    createPromptRequest,
    deletePromptRequest,
    getPromptRequest,
    toggleFavoritePromptRequest,
    updatePromptRequest
} from "../api/promptApi.js";
import {createCategoryRequest, deleteCategoryRequest, getCategoriesRequest} from "../api/categoryApi.js";
import ErrorAlert from "../components/common/ErrorAlert.jsx";
import PromptForm from "../components/prompts/PromptForm.jsx";
import CategoryManager from "../components/categories/CategoryManager.jsx";
import PromptFilter from "../components/prompts/PromptFilter.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import PromptList from "../components/prompts/PromptList.jsx";
import ConfirmModal from "../components/common/ConfirmModal.jsx";

const defaultFilters = {
    search: "",
    category: "",
    tag: "",
    favorite: "",
    sort: "newest"
}

const PromptsPage = () => {
    const [prompts, setPrompts] = useState([])
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState(defaultFilters)

    const [loadingPrompts, setLoadingPrompts] = useState(true)
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [error, setError] = useState("")

    const [editingPrompt, setEditingPrompt] = useState(null)
    const [savingPrompt, setSavingPrompt] = useState(false)

    const [deleteTarget, setDeleteTarget] = useState(null)
    const [deletingPrompt, setDeletingPrompt] = useState(false)

    const [creatingCategory, setCreatingCategory] = useState(false)

    const formTitle = useMemo(() => {
        return editingPrompt ? "Edit prompt" : "Create Prompt"
    });

    const loadPrompts = async (activeFilters = filters) => {
        try {
            setLoadingPrompts(true)
            setError("")

            const params = Object.fromEntries(
                Object.entries(activeFilters).filter(([, value]) => value !== "")
            )

            const data = await getPromptRequest(params)
            setPrompts(data.prompts || [])
        } catch (e) {
            setError(e.response?.data?.message || "Unable to load prompts.")
        } finally {
            setLoadingPrompts(false)
        }
    }

    const loadCategories = async () => {
        try {
            setLoadingCategories(true)

            const data = await getCategoriesRequest()
            setCategories(data.categories || [])
        } catch (e) {
            setError(e.response?.data?.message || "Unable to load categories.")
        } finally {
            setLoadingCategories(false)
        }
    }

    useEffect(() => {
        loadPrompts(defaultFilters),
            loadCategories()
    }, []);

    const handleApplyFilters = (nextFilters) => {
        setFilters(nextFilters)
        loadPrompts(nextFilters)
    }

    const handleSubmitPrompt = async (payload) => {
        try {
            setSavingPrompt(true)
            setError("")

            if (editingPrompt) {
                await updatePromptRequest(editingPrompt._id, payload)
            } else {
                await createPromptRequest(payload)
            }

            setEditingPrompt(null)
            await loadPrompts()
        } catch (e) {
            setError(e.response?.data?.message || "Unable to save prompt.")
        } finally {
            setSavingPrompt(false)
        }
    }

    const handleEditPrompt = (prompt) => {
        setEditingPrompt(prompt)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    const handleAskDeletePrompt = (prompt) => {
        setDeleteTarget(prompt)
    }

    const handleConfirmDeletePrompt = async () => {
        if (!deleteTarget) return

        try {
            setDeletingPrompt(true)
            setError("")
            await deletePromptRequest(deleteTarget._id)
            setDeleteTarget(null)
            await loadPrompts()
        } catch (e) {
            setError(e.response?.data?.message || "Unable to delete prompt.")
        } finally {
            setDeletingPrompt(false)
        }
    }

    const handleToggleFavorite = async (prompt) => {
        try {
            setError("")
            await toggleFavoritePromptRequest(prompt._id)
            await loadPrompts()
        } catch (e) {
            setError(e.response?.data?.message || "Unable to update favorite.")
        }
    }

    const handleCreateCategory = async (payload) => {
        try {
            setCreatingCategory(true)
            setError("")

            await createCategoryRequest(payload)
            await loadCategories()
        } catch (e) {
            setError(e.response?.data?.message || "Unable to create category.")
        } finally {
            setCreatingCategory(false)
        }
    }

    const handleDeleteCategory = async (category) => {
        try {
            setError("")
            await deleteCategoryRequest(category._id)
            await Promise.all([loadCategories(), loadPrompts()])
        } catch (e) {
            setError(e.response?.data?.message)
        }
    }

    return (
        <div className="space-y-6">
            <section className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold text-slate-900">Prompts</h1>
                    <p className="text-slate-600">
                        Create, organize, update, and refine your private prompt library.
                    </p>
                </div>
            </section>
            {error ? <ErrorAlert message={error}/> : null}

            <section className={"rounded-lg border bg-white p-6 shadow-sm"}>
                <h2 className={"text-lg font-semibold text-slate-900"}>{formTitle}</h2>
                <p className={"mt-1 text-sm text-slate-600"}>
                    {editingPrompt ? "Update the selected prompt." : "Add new prompt to your workspace."}
                </p>

                <div className={"mt-5"}>
                    <PromptForm
                        initialValues={editingPrompt}
                        categories={categories}
                        onSubmit={handleSubmitPrompt}
                        submitLabel={editingPrompt ? "Update prompt" : "Create prompt"}
                        isSubmitting={savingPrompt}
                    />
                </div>

                {editingPrompt ? (
                    <div className={"mt-4 flex justify-end"}>
                        <button
                            type={"button"}
                            className={"btn btn-ghost rounded-md"}
                            onClick={() => setEditingPrompt(null)}
                        >
                            Cancel editing
                        </button>
                    </div>
                ) : null}
            </section>

            <CategoryManager
                categories={categories}
                onCreate={handleCreateCategory}
                onDelete={handleDeleteCategory}
                isCreating={creatingCategory}
            />

            <PromptFilter
                filters={filters}
                categories={categories}
                onApply={handleApplyFilters}
            />

            {loadingCategories ? (
                <LoadingState message={"Loading categories..."}/>
            ) : null}

            {loadingPrompts ? (
                <LoadingState message={"Loading prompts..."}/>
            ) : (
                <PromptList
                    prompts={prompts}
                    onEdit={handleEditPrompt}
                    onDelete={handleAskDeletePrompt}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}

            <ConfirmModal
                isOpen={Boolean(deleteTarget)}
                title={"Delete prompt"}
                message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                confirmText={"Delete"}
                onConfirm={handleConfirmDeletePrompt}
                onCancel={() => setDeleteTarget(null)}
                isLoading={deletingPrompt}
            />
        </div>
    )
}
export default PromptsPage
