import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import EmptyState from "@/components/common/EmptyState.jsx";

const RecentPrompts = ({items = []}) => {
    return (<Card className={"border-border/70 shadow-sm"}>
            <CardHeader>
                <CardTitle>Recent Prompts</CardTitle>
                <CardDescription>
                    Los últimos prompts creados en tu workspace.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {items.length === 0 ? (
                    <EmptyState
                        icon="solar:clock-circle-bold-duotone"
                        title="Aún no hay prompts recientes"
                        description="Cuando empieces a crear prompts, aquí verás los más nuevos."/>
                ) : (
                    <div className="space-y-4">
                        {items.map((prompt) => (<div
                            key={prompt._id}
                            className="rounded-2xl border border-border/70 bg-muted/20 p-4"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className={"space-y-1"}>
                                    <h3 className={"font-medium text-foreground"}>
                                        {prompt.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {prompt.description || "No hay descripción disponible."}
                                    </p>
                                </div>

                                {prompt.isFavorite ? (<Badge variant={"secondary"}>Favorite</Badge>) : null}
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>
                  {new Date(prompt.createdAt).toLocaleDateString()}
                </span>
                                <span>
                  {prompt.category?.name || "Sin Categoría"}
                </span>
                            </div>
                        </div>))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
export default RecentPrompts
