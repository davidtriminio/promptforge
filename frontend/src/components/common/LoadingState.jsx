import {Card, CardContent} from "@/components/ui/card.tsx";
import {Icon} from "@iconify/react";

const LoadingState = ({message = "Cargando..."}) => {
    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardContent className={"flex items-center gap-3 py-5"}>
                <Icon icon={"solar:refresh-circle-bold-duotone"}
                      className={"h-5 w-5 animate-spin text-primary"}
                />
                <p className={"text-sm text-muted-foreground"}>{message}</p>
            </CardContent>
        </Card>
    )
}
export default LoadingState
