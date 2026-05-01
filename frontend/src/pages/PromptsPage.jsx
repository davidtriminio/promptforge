import {useEffect, useMemo, useState} from "react";
import {
    createPromptRequest,
    deletePromptRequest,
    getPromptRequest,
    toggleFavoritePromptRequest,
    updatePromptRequest
} from "../api/promptApi.js";
import {getCategoriesRequest} from "../api/categoryApi.js";
import ErrorAlert from "../components/common/ErrorAlert.jsx";
import PromptForm from "../components/prompts/PromptForm.jsx";
import PromptFilter from "../components/prompts/PromptFilter.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import PromptList from "../components/prompts/PromptList.jsx";
import ConfirmModal from "../components/common/ConfirmModal.jsx";
import PromptToolbar from "@/components/prompts/PromptToolbar.jsx";

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

    const formTitle = useMemo(() => {
        return editingPrompt ? "Editar prompt" : "Crear prompt"
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
            setError(e.response?.data?.message || "No se pudieron cargar los prompts.")
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
            setError(e.response?.data?.message || "No se pudieron cargar las categorías.")
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
            setError(e.response?.data?.message || "No se pudo guardar el prompt.")
        } finally {
            setSavingPrompt(false)
        }
    }

    const handleEditPrompt = (prompt) => {
        setEditingPrompt(prompt)
        document.getElementById("prompt-form-section")
        ?.scrollIntoView({behavior: "smooth", block: "start"})
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
            setError(e.response?.data?.message || "No se pudo eliminar el prompt.")
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
            setError(e.response?.data?.message || "No se pudo actualizar el favorito.")
        }
    }

    const handleScrollToForm = () => {
        document.getElementById("prompt-form-section")
        ?.scrollIntoView({behavior: "smooth", block: "start"})
    }

    return (
        <div className="space-y-6">
            <PromptToolbar
                isEditing={Boolean(editingPrompt)}
                onCancelEditing={()=> setEditingPrompt(null)}
                onScrollToForm={handleScrollToForm}
                />

            {error ? <ErrorAlert message={error}/> : null}

            <section
                id={"prompt-form-section"}
                className={"rounded-lg border bg-white p-6 shadow-sm"}>
                <h2 className={"text-lg font-semibold text-slate-900"}>{formTitle}</h2>
                <p className={"mt-1 text-sm text-slate-600"}>
                    {editingPrompt ? "Actualizar prompt seleccionado." : "Agregar nuevo prompt a tu Espacio de trabajo."}
                </p>

                <div className={"mt-5"}>
                    <PromptForm
                        initialValues={editingPrompt}
                        categories={categories}
                        onSubmit={handleSubmitPrompt}
                        submitLabel={editingPrompt ? "Actualizar prompt" : "Crear prompt"}
                        isSubmitting={savingPrompt}
                    />
                </div>
            </section>

            <PromptFilter
                filters={filters}
                categories={categories}
                onApply={handleApplyFilters}
                />

            {loadingCategories ? (
                <LoadingState message={"Cargando categorías..."}/>
            ) : null}

            {loadingPrompts ? (
                <LoadingState message={"Cargando prompts..."}/>
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
                title={"Borrar prompt"}
                message={`¿Seguro que quieres borrar el prompt "${deleteTarget?.title}"? Esta acción no se puede deshacer.`}
                confirmText={"Delete"}
                onConfirm={handleConfirmDeletePrompt}
                onCancel={() => setDeleteTarget(null)}
                isLoading={deletingPrompt}
            />
        </div>
    )
}
export default PromptsPage
