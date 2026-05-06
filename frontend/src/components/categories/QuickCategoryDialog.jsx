import React, {useEffect, useState} from 'react'
import {getApiErrorMessage} from "@/utils/getApiErrorMessage.js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import CategoryColorField from "@/components/categories/CategoryColorField.jsx";

const QuickCategoryDialog = ({
                                 isOpen,
                                 onOpenChange,
                                 onCreate,
                                 isCreating = false
                             }) => {
    const [name, setName] = useState("")
    const [color, setColor] = useState("#6366f1")
    const [formError, setFormError] = useState("")
    const [serverError, setServerError] = useState("")

    useEffect(() => {
        if (!isOpen) {
            setName("")
            setColor("#6366f1")
            setFormError("")
            setServerError("")
        }
    }, [isOpen])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const trimmedName = name.trim()

        if (!trimmedName) {
            setFormError("Escribe un nombre para la categoría.")
            return
        }

        if (trimmedName.length < 2 || trimmedName.length > 40) {
            setFormError("El nombre de la categoría debe tener entre 2 y 40 caracteres.")
            return
        }

        setFormError("")
        setServerError("")

        try {
            await onCreate({
                name: trimmedName,
                color
            })
            onOpenChange(false)
        } catch (e) {
            setServerError(getApiErrorMessage(e, "No se pudo crear la categoría."))
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva categoría</DialogTitle>
                    <DialogDescription>
                        Crea una categoría rápida sin salir del formulario del prompt.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className={"space-y-4"}>
                    <div className={"space-y-2"}>
                        <label htmlFor={"quick-category-name"} className={"text-sm font-medium text-foreground"}>
                            Nombre
                        </label>
                        <Input
                            id="quick-category-name"
                            type={"text"}
                            maxLength={40}
                            placeholder={"Ej. Marketing"}
                            value={name}
                            aria-invalid={Boolean(formError)}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <CategoryColorField
                        id="quick-category-color"
                        label="Color"
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                    />

                    {formError ? (
                        <p className={"text-sm text-destructive"} role={"alert"}>
                            {formError}
                        </p>
                    ) : null}

                    {serverError ? (
                        <p className={"text-sm text-destructive"} role={"alert"}>
                            {serverError}
                        </p>
                    ) : null}

                    <DialogFooter>
                        <Button
                            type={"button"}
                            variant={"outline"}
                            onClick={() => onOpenChange(false)}
                            disabled={isCreating}
                        >
                            Cancelar
                        </Button>
                        <Button type={"submit"}
                                disabled={isCreating}
                        >
                            {isCreating ? "Creando..." : "Crear categoría"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default QuickCategoryDialog
