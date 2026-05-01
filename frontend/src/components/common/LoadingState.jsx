import {Card, CardContent} from "@/components/ui/card.tsx"
import {cn} from "@/lib/utils.ts";

const LoadingState = ({message = "Cargando...", variant = "inline", className}) => {
       const spinner = (
           <div className={"h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary border-r-primary"} />
       )

    if(variant === "fullscreen") {
        return (
            <Card className={cn(
                "flex min-h-screen items-center justify-center bg-muted/35 px-4",
                className
            )}>
                <div
                    className={"flex items-center gap-3 rounded-2xl border border-border/70 bg-background/95 px-5 py-4 shadow-sm"}>
                    {spinner}
                    <p className={"text-sm text-muted-foreground"}>{message}</p>
                </div>
            </Card>
        )
    }
    return(
        <Card className={cn("border-border/70 shadow-sm", className)}>
            <CardContent className={"flex items-center gap-3 py-5"}>
                {spinner}
                <p className={"text-sm text-muted-foreground"}>{message}</p>
            </CardContent>
        </Card>
    )
}
export default LoadingState
