import {Card, CardContent} from "@/components/ui/card.tsx";
import {Icon} from "@iconify/react";

const EmptyState = ({title, description, action, icon = "solar:folder-open-bold-duotone"}) => {
    return (
        <Card className="border-dashed border-border/70 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-foreground">
                    <Icon icon={icon} className={"h-7 w-7"}/>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {title}
                </h3>

                <p className={"mt-2 max-w-md text-sm text-muted-foreground"}>
                    {description}
                </p>

                {action ? <div className={"mt-5"}>{action}</div> : null}
            </CardContent>
        </Card>
    )
}
export default EmptyState
