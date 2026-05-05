import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";
import PageHeader from "@/components/common/PageHeader.jsx";

const PromptToolbar = ({
                           isEditing = false,
                           isFormOpen = false,
                           onCancelEditing,
                           onToggleForm,
                           onCreatePrompt,
                           onScrollToForm
                       }) => {
    const action = (
        <div className={"flex flex-wrap gap-2"}>
            <Button
                type={"button"}
                onClick={() => {
                    if (isEditing) {
                        onScrollToForm?.()
                        return
                    }

                    if (isFormOpen) {
                        onToggleForm?.()
                        return
                    }

                    onCreatePrompt?.()
                }}
            >
                <Icon
                    icon={"solar:add-circle-bold-duotone"}
                    className={"mr-2 h-4 w-4"}
                />
                {isEditing
                    ? "Ir al formulario"
                    : isFormOpen
                        ? "Ocultar formulario"
                        : "Crear prompt"}
            </Button>


            {isEditing ? (
                <Button type={"button"} variant={"outline"} onClick={onCancelEditing}>
                    <Icon icon={"solar:close-circle-bold-duotone"}
                          className={"mr-2 h-4 w-4"}
                    />
                    Cancelar edición
                </Button>
            ) : null}
        </div>
    )
    return (
        <PageHeader
            eyebrow={"Espacio de trabajo"}
            title={"Prompts"}
            description={"Crea, organiza, filtra y reutiliza tu biblioteca privada de prompts."}
            icon={"solar:document-text-bold-duotone"}
            action={action}
        />
    )
}
export default PromptToolbar
