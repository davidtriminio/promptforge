import {Card, CardContent} from "@/components/ui/card.tsx";

const StatsCard = ({label, value, hint}) => {
    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardContent className={"space-y-2 py-6"}>
                <p className={"text-sm text-muted-foreground"}>{label}</p>
                <h3 className={"text-3xl font-semibold tracking-tight text-foreground"}>{value}</h3>
                {hint ? <p className="text-sm text-muted-foreground"> {hint} </p> : null}
            </CardContent>
        </Card>
    )
}
export default StatsCard
