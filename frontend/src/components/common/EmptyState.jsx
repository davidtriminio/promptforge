import {Card, CardContent} from "@/components/ui/card.tsx";
import {Icon} from "@iconify/react";

const EmptyState = ({
                        title,
                        description,
                        action,
                        icon = "solar:folder-open-bold-duotone",
                        eyebrow
                    }) => {
    return (
        <Card className="border-dashed border-border/70 bg-muted/20 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-border/70 bg-background/80 text-foreground">
                    <Icon icon={icon} className={"h-7 w-7"}/>
                </div>

                {eyebrow ? (
                    <p className={"mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"}>
                        {eyebrow}
                    </p>
                ) : null}

                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                    {title}
                </h3>

                <p className={"mt-2 max-w-md text-sm leading-6 text-muted-foreground"}>
                    {description}
                </p>

                {action ? <div className={"mt-5"}>{action}</div> : null}
            </CardContent>
        </Card>
    )
}

export default EmptyState