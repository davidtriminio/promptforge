import EmptyState from "../common/EmptyState.jsx";
import PromptCard from "./PromptCard.jsx";

const PromptList = ({
                        prompts,
                        onEdit,
                        onDelete,
                        onToggleFavorite
}) => {
    if (!prompts.length)
        return (
            <EmptyState
                title={"No se encontraron prompts."}
                description={"Prueba a cambiar los filtros o a crear tu primer Prompt."}
            />
        )

    return (
        <div className={"space-y-4"}>
            {prompts.map((prompt) => (
                <PromptCard
                    key={prompt._id}
                    prompt={prompt}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    )
}
export default PromptList
