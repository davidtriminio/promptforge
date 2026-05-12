import {Link} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import EmptyState from "@/components/common/EmptyState.jsx";

const CategoryBreakdown = ({items = []}) => {
    const total = items.reduce((sum, item) => sum + item.count, 0);

    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardHeader>
                <CardTitle>Desglose por categorías</CardTitle>

                <CardDescription>
                    Observa cómo se distribuye tu biblioteca de prompts entre las categorías.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {!items.length ? (
                    <EmptyState
                        eyebrow="Organización"
                        icon="solar:chart-square-bold-duotone"
                        title="Aún no hay distribución por categorías"
                        description="Una vez que los prompts estén categorizados, este panel te ayudará a detectar concentraciones y espacios vacíos."
                        action={
                            <Button asChild variant={"outline"}>
                                <Link to={"/categories"}>
                                    Crear categoría
                                </Link>
                            </Button>
                        }
                    />
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => {
                            const percentage = total
                                ? Math.round((item.count / total) * 100)
                                : 0;

                            return (
                                <div
                                    key={item._id ?? "uncategorized"}
                                    className={"space-y-2 rounded-3xl border border-border/70 bg-muted/20 p-4"}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span
                                                className="h-3 w-3 rounded-full"
                                                style={{backgroundColor: item.color}}
                                                aria-hidden="true"
                                            />

                                            <span className="truncate text-sm font-semibold text-foreground">
                                                {item.name}
                                            </span>
                                        </div>

                                        <div className={"text-right"}>
                                            <p className="text-sm font-semibold text-foreground">
                                                {item.count}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {percentage}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className={"h-2 overflow-hidden rounded-full bg-muted"}>
                                        <div
                                            className={"h-full rounded-full"}
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: item.color
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default CategoryBreakdown