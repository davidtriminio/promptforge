import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";
import PageHeader from "@/components/common/PageHeader.jsx";

const PromptToolbar = ({
                           isEditing = false,
                           onCancelEditing,
                           onScrollToForm
}) => {
    const action = (
        <div className={"flex flex-wrap gap-2"}>
            <Button type={"button"} onClick={onScrollToForm}>
                <Icon
                    icon={"solar:add-circle-bold-duotone"}
                    className={"mr-2 h-4 w-4"}/>
                {isEditing ? "Ir al formulario" : "Nuevo Prompt"}
            </Button>

            {isEditing ? (
                <Button type={"button"} variant={"outline"} onClick={onCancelEditing}>
                    <Icon icon={"solar:close-circle-bold-duotone"}
                          className={"mr-2 h-4 w-4"}
                    />
                    Cancelar Edición
                </Button>
            ) : null}
        </div>
    )
    return (
        <PageHeader
            eyebrow={"Espacio De Trabajo"}
            title={"Prompts"}
            description={"Crea, organiza, filtra y reutiliza tu biblioteca privada de prompts."}
            icon={"solar:document-text-bold-duotone"}
            action={action}
        />
    )
}
export default PromptToolbar
