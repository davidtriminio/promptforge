const PROMPT_DRAFT_TTL_MS = 1000 * 60 * 60 * 72

const hasDraftContent = (values) =>
    Object.values(values || {}).some((value) => String(value || "").trim() !== "")

export const readPromptDraft = (draftKey) => {
    if(!draftKey) return null

    const rawDraft = localStorage.getItem(draftKey)
    if (!rawDraft) return  null

    try {
        const parsedDraft = JSON.parse(rawDraft)
        const values = parsedDraft?.values

        if(!values || typeof values !== "object"){
            localStorage.removeItem(draftKey)
            return  null
        }

        const savedAt = Number(parsedDraft?.savedAt || 0)
        const isExpired = !savedAt || Date.now() - savedAt > PROMPT_DRAFT_TTL_MS

        if(isExpired){
            localStorage.removeItem(draftKey)
            return null
        }

        return {
            values,
            savedAt
        }
    } catch{
        localStorage.removeItem(draftKey)
        return  null
    }
}

export const writePromptDraft = (draftKey, values) => {
    if(!draftKey) return null

    if(!hasDraftContent(values)){
        localStorage.removeItem(draftKey)
        return null
    }

    const payload = {
        values,
        savedAt: Date.now()
    }

    localStorage.setItem(draftKey, JSON.stringify(payload))
    return payload
}

export const clearPromptDraft = (draftKey) => {
    if(!draftKey) return
    localStorage.removeItem(draftKey)
}

export const formatPromptDraftDate = (savedAt) => {
    if(!savedAt) return ""

    return new Intl.DateTimeFormat("es-HN", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(new Date(savedAt))
}