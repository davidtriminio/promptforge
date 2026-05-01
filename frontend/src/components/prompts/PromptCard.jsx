import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";

const PromptCard = ({
                        prompt,
                        onEdit,
                        onDelete,
                        onToggleFavorite
                    }) => {
    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardHeader className={"gap-4"}>
                <div className={"space-y-2"}>
                    <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className={"text-lg"}>{prompt.title}</CardTitle>
                        {prompt.isFavorite ? (
                            <Badge variant={"secondary"}>Favorito</Badge>
                        ) : null}
                    </div>

                    <CardDescription>
                        {prompt.description || "Sin descripción."}
                    </CardDescription>
                </div>

                <CardAction className={"flex flex-wrap gap-2"}>
                    <Button
                        type={"button"}
                        variant={prompt.isFavorite ? "default" : "outline"}
                        size={"sm"}
                        onClick={() => onToggleFavorite(prompt)}
                    >
                        <Icon
                            icon={prompt.isFavorite
                                ? "solar:star-bold-duotone"
                                : "solar:star-outline"}
                            className={"mr-2 h-4 w-4"}
                        />
                        {prompt.isFavorite ? "Quitar Favoritos" : "Marcar Favorito"}
                    </Button>
                    
                    <Button
                    type={"button"}
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => onEdit(prompt)}
                    >
                        <Icon icon={"solar:pen-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                        Editar
                    </Button>
                    
                    <Button
                        type={"button"}
                        variant={"ghost"}
                        size={"sm"}
                        onClick={()=>onDelete(prompt)}>
                        <Icon icon={"solar:trash-bin-trash-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                            Eliminar
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className={"line-clamp-5 whitespace-pre-wrap text-sm leading-6 text-muted-foreground"}>
                    {prompt.content}
                </p>
            </CardContent>

            <CardFooter className={"flex flex-wrap items-center gap-2"}>
                <Badge variant={"outline"}>
                    {prompt.category?.name || "Sin categoría"}
                </Badge>

                {prompt.tags?.map((tag) => (
                    <Badge key={tag} variant={"secondary"}>
                        #{tag}
                    </Badge>
                ))}
            </CardFooter>
        </Card>
    );
}
export default PromptCard