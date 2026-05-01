import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import EmptyState from "@/components/common/EmptyState.jsx";

const CategoryBreakdown = ({items = []}) => {
    return(
<Card className={"border-border/70 shadow-sm"}>
    <CardHeader>
        <CardTitle>Prompts por categoría</CardTitle>
        <CardDescription>
            Distribución actual de prompts por categoría.
        </CardDescription>
    </CardHeader>

    <CardContent>
        {items.length === 0 ? (<p className="text-sm text-muted-foreground">
            <EmptyState
                icon="solar:chart-square-bold-duotone"
                title="Sin distribución todavía"
                description="Cuando clasifiques prompts con categorías, aquí verás su distribución."
            />
        </p>) : (<div className="mt-5 space-y-4">
            {items.map((item) => (<div
                key={item._id ?? "uncategorized"}
                className="flex items-center justify-between gap-4"
            >
                <div className="flex items-center gap-3">
                <span
                    className="h-3 w-3 rounded-full"
                    style={{backgroundColor: item.color}}
                />
                    <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
                </div>

                <span className="text-sm text-muted-foreground">{item.count}</span>
            </div>))}
        </div>)}
    </CardContent>
</Card> )
}
export default CategoryBreakdown
