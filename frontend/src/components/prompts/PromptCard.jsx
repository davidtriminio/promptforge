import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";
import {useState} from "react";

const PromptCard = ({
                        prompt,
                        onEdit,
                        onDelete,
                        onToggleFavorite
                    }) => {


    const [copyState, setCopyState] = useState("idle")

    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(prompt.content)
            setCopyState("copied")
            window.setTimeout(() => setCopyState("idle"), 1800)
        } catch {
            setCopyState("error")
            window.setTimeout(() => setCopyState("idle", 1800))
        }
    }

    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardHeader className={"gap-4"}>
                <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className={"min-w-0 break-all text-lg"}>{prompt.title}</CardTitle>
                    {prompt.isFavorite ? (
                        <Badge variant={"secondary"}>Favorito</Badge>
                    ) : null}
                </div>
            </CardHeader>

            <CardContent>
                <CardDescription className={"whitespace-pre-wrap break-all"}>
                    {prompt.description || "Sin descripción."}
                </CardDescription>

                <div className={"space-y-2"}>
                    <div className={"flex items-center gap-2 my-2"}>
                        <Icon icon={"solar:document-text-bold-duotone"} className={"h-4 w-4"} />

                        <p className={"text-sm font-semibold text-foreground"}>
                            Contenido del prompt
                        </p>
                    </div>
                    <div className={"max-h-[26rem] overflow-auto rounded-2xl bg-muted/35 p-4 lg:max-h-[32rem]"}>
                        <p className={"whitespace-pre-wrap break-all text-sm leading-6 text-foreground/90"}>
                            {prompt.content}
                        </p>
                    </div>
                </div>

                <div className={"flex flex-wrap gap-2 pt-2"}>
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
                        onClick={handleCopyPrompt}
                    >
                        <Icon
                            icon={
                                copyState === "copied"
                                    ? "solar:check-circle-bold-duotone"
                                    : "solar:copy-bold-duotone"
                            }
                            className={"mr-2 h-4 w-4"}
                        />
                        {copyState === "copied"
                            ? "Copiado"
                            : copyState === "error"
                                ? "No se pudo copiar"
                                : "Copiar prompt"}
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
                        onClick={() => onDelete(prompt)}>
                        <Icon icon={"solar:trash-bin-trash-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                        Eliminar
                    </Button>

                </div>
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
    )
        ;
}
export default PromptCard