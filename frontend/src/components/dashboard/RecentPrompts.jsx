import {Link} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import EmptyState from "@/components/common/EmptyState.jsx";
import {Icon} from "@iconify/react";

const RecentPrompts = ({items = []}) => {
    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardHeader>
                <CardTitle>Prompts recientes</CardTitle>

                <CardDescription>
                    Resume el trabajo más reciente agregado a tu espacio de trabajo de PromptForge.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {items.length === 0 ? (
                    <EmptyState
                        eyebrow="Comenzando"
                        icon="solar:clock-circle-bold-duotone"
                        title="Aún no hay prompts recientes"
                        description="Tus últimos prompts aparecerán aquí tan pronto como comiences a construir la biblioteca."
                        action={
                            <Button asChild>
                                <Link to={"/prompts"}>
                                    Crear tu primer Prompt
                                </Link>
                            </Button>
                        }
                    />
                ) : (
                    <div className="space-y-3">
                        {items.map((prompt) => (
                            <div
                                key={prompt._id}
                                className="rounded-3xl border border-border/70 bg-muted/20 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-accent/60 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className={"space-y-2"}>
                                        <div className={"flex flex-wrap items-center gap-2"}>
                                            <h3 className={"min-w-0 text-sm font-semibold text-foreground sm:text-base"}>
                                                {prompt.title}
                                            </h3>

                                            {prompt.isFavorite ? (
                                                <Badge variant={"secondary"}>
                                                    Favorito
                                                </Badge>
                                            ) : null}
                                        </div>

                                        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                                            {prompt.description || "Aún no hay descripción disponible."}
                                        </p>
                                    </div>

                                    <Icon
                                        icon={"solar:arrow-right-up-linear"}
                                        className={"mt-1 h-4 w-4 text-muted-foreground"}
                                    />
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant={"outline"}>
                                        {prompt.category?.name || "Sin categoría"}
                                    </Badge>

                                    <span>
                                        {new Date(prompt.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default RecentPrompts