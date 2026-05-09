import {useEffect, useMemo, useState} from "react";
import {
    createPromptRequest,
    deletePromptRequest,
    getPromptRequest,
    toggleFavoritePromptRequest,
    updatePromptRequest
} from "../api/promptApi.js";
import {createCategoryRequest, getCategoriesRequest} from "../api/categoryApi.js";
import ErrorAlert from "../components/common/ErrorAlert.jsx";
import PromptForm from "../components/prompts/PromptForm.jsx";
import PromptFilter from "../components/prompts/PromptFilter.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import PromptList from "../components/prompts/PromptList.jsx";
import ConfirmModal from "../components/common/ConfirmModal.jsx";
import PromptToolbar from "@/components/prompts/PromptToolbar.jsx";
import AppShellSection from "@/components/common/AppShellSection.jsx";
import {getApiErrorMessage} from "@/utils/getApiErrorMessage.js";
import {cn} from "@/lib/utils.ts";
import useDocumentTitle from "@/hooks/useDocumentTitle.js";
import {readPromptDraft} from "@/utils/promptDraftStorage.js";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";

const PROMPT_DRAFT_KEY = "promptforge_prompt_draft"
const DESKTOP_PROMPT_FORM_QUERY = "(min-width: 1280px)"

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
        () => typeof window !== "undefined" && window.matchMedia(query).matches
    )

    useEffect(() => {
        const media = window.matchMedia(query)
        const handleChange = (event) => setMatches(event.matches)

        setMatches(media.matches)
        media.addEventListener("change", handleChange)
        return () => media.removeEventListener("change", handleChange)
    }, [query])

    return matches
}

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
    const [creatingCategory, setCreatingCategory] = useState(false)

    const [deleteTarget, setDeleteTarget] = useState(null)
    const [deletingPrompt, setDeletingPrompt] = useState(false)

    const [isFormOpen, setIsFormOpen] = useState(false)

    const formTitle = useMemo(
        () => (editingPrompt ? "Editar prompt" : "Crear prompt"), [editingPrompt]
    )

    const sortCategoriesByName = (itenms) =>
        [...itenms].sort((a, b) =>
            a.name.localeCompare(b.name, "es", {sensitivity: "base"})
        )

    useDocumentTitle("Prompts")

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
            setError(getApiErrorMessage(e, "No se pudieron cargar los prompts."))
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
            setError(getApiErrorMessage(e, "No se pudieron cargar las categorías."))
        } finally {
            setLoadingCategories(false)
        }
    }


    const isDesktopPromptLayout = useMediaQuery(DESKTOP_PROMPT_FORM_QUERY)
    const isFormVisible = isFormOpen || Boolean(editingPrompt)

    useEffect(() => {
        const savedDraft = readPromptDraft(PROMPT_DRAFT_KEY)
        if (savedDraft && window.matchMedia(DESKTOP_PROMPT_FORM_QUERY).matches) {
            setIsFormOpen(true)
        }
    }, []);

    const scrollToPromptForm = () => {
        if (!isDesktopPromptLayout) return

        window.requestAnimationFrame(() => {
            document.getElementById("prompt-form-section")
            ?.scrollIntoView({behavior: "smooth", block: "start"})
        })
    }


    useEffect(() => {
        loadPrompts(defaultFilters)
        loadCategories()
    }, []);

    const handleApplyFilters = (nextFilters) => {
        setFilters(nextFilters)
        loadPrompts(nextFilters)
    }

    const handleQuickCreateCategory = async (payload) => {
        try {
            setCreatingCategory(true)
            setError("")

            const data = await createCategoryRequest(payload)
            const createdCategory = data.category

            setCategories((prev) => sortCategoriesByName([...prev, createdCategory]))
            return createdCategory
        } finally {
            setCreatingCategory(false)
        }
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
            setIsFormOpen(false)
            await loadPrompts()
        } catch (e) {
            setError(getApiErrorMessage(e, "No se pudo guardar el prompt."))
        } finally {
            setSavingPrompt(false)
        }
    }

    const handleEditPrompt = (prompt) => {
        setEditingPrompt(prompt)
        setIsFormOpen(true)
        scrollToPromptForm()
    }

    const formDescription = editingPrompt
        ? "Actualiza el prompt seleccionado."
        : "Agrega un nuevo prompt a la biblioteca"

    const promptFormContent = (
        <PromptForm
            initialValues={editingPrompt}
            categories={categories}
            onSubmit={handleSubmitPrompt}
            submitLabel={editingPrompt ? "Actualizar prompt" : "Crear prompt"}
            isSubmitting={savingPrompt}
            onCreateCategory={handleQuickCreateCategory}
            isCreatingCategory={creatingCategory}
            draftKey={editingPrompt ? null : PROMPT_DRAFT_KEY}
        />
    )

    const handleConfirmDeletePrompt = async () => {
        if (!deleteTarget) return

        try {
            setDeletingPrompt(true)
            setError("")
            await deletePromptRequest(deleteTarget._id)
            setDeleteTarget(null)
            await loadPrompts()
        } catch (e) {
            setError(getApiErrorMessage(e, "No se pudo eliminar el prompt."))
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
            setError(getApiErrorMessage(e, "No se pudo actualizar el favorito."))
        }
    }

    const handleOpenCreateForm = () => {
        setEditingPrompt(null)
        setIsFormOpen(true)
        scrollToPromptForm()
    }


    const handleCloseForm = () => {
        setEditingPrompt(null)
        setIsFormOpen(false)
    }


    if (loadingCategories) {
        return <LoadingState message={"Cargando categorías..."}/>
    }

    return (
        <div className="space-y-6">
            <PromptToolbar
                isEditing={Boolean(editingPrompt)}
                isFormOpen={isFormOpen}
                onCancelEditing={handleCloseForm}
                onToggleForm={() => setIsFormOpen((prev) => !prev)}
                onCreatePrompt={handleOpenCreateForm}
                onScrollToForm={() => {
                    setIsFormOpen(true)
                    scrollToPromptForm()
                }}
            />


            {error ? <ErrorAlert message={error}/> : null}

            {!isDesktopPromptLayout ? (
                <Sheet open={isFormVisible} onOpenChange={(open) => !open && handleCloseForm()}>
                    <SheetContent
                        side={"right"}
                        className={"h-[100dvh] w-full sm:max-w-none md:w-[720px] overflow-y-auto border-l p-0"}
                    >
                        <SheetHeader className={"border-b border-border/60 px-4 py-4 text-left sm:px-6"}>
                            <SheetTitle>{formTitle}</SheetTitle>
                            <SheetDescription>{formDescription}</SheetDescription>
                        </SheetHeader>

                        <div className={"px-4 py-5 sm:px-6"}>
                            {promptFormContent}
                        </div>
                    </SheetContent>
                </Sheet>
            ) : null}

            <div
                className={cn(
                    "grid gap-6",
                    isFormVisible && isDesktopPromptLayout
                        ? "xl:grid-cols-[380px_minmax(0,1fr)] 2xl:grid-cols-[420px_minmax(0,1fr)]"
                        : "grid-cols-1"
                )}
            >
                {isFormVisible && isDesktopPromptLayout ? (
                    <div
                        id={"prompt-form-section"}
                        className={"self-start xl:sticky xl:top-24"}
                    >
                        <AppShellSection
                            title={formTitle}
                            description={formDescription}
                        >
                            {promptFormContent}
                        </AppShellSection>
                    </div>
                ) : null}

                <div className={"min-w-0 space-y-6"}>
                    <PromptFilter
                        filters={filters}
                        categories={categories}
                        onApply={handleApplyFilters}
                    />

                    {loadingPrompts ? (
                        <LoadingState message={"Cargando prompts..."}/>
                    ) : (
                        <PromptList
                            prompts={prompts}
                            onEdit={handleEditPrompt}
                            onDelete={setDeleteTarget}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen={Boolean(deleteTarget)}
                title={"Eliminar prompt"}
                message={
                    <>
                        ¿Seguro que quieres eliminar el prompt {" "}
                        <span className={"font-medium break-all"}>{deleteTarget?.title}</span>?
                        {" "}Esta acción no se puede deshacer.
                    </>
                }
                confirmText={"Eliminar"}
                cancelText={"Cancelar"}
                onConfirm={handleConfirmDeletePrompt}
                onCancel={() => setDeleteTarget(null)}
                isLoading={deletingPrompt}
            />
        </div>
    )
}
export default PromptsPage
