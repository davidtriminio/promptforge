import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Icon} from "@iconify/react";
import {cn} from "@/lib/utils.ts";

const toneStyles = {
    primary: "border-primary/20 bg-primary/[0.06]",
    neutral: "border-border/70 bg-card",
    success: "border-emerald-500/20 bg-emerald-500/[0.06]",
    warning: "border-amber-500/20 bg-amber-500/[0.07]"
};

const StatsCard = ({
                       label,
                       value,
                       hint,
                       icon,
                       trend,
                       tone = "neutral",
                       featured = false
                   }) => {
    return (
        <Card
            className={cn(
                "border shadow-sm hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-black/20",
                toneStyles[tone],
                featured && "shadow-lg shadow-primary/10"
            )}
        >
            <CardContent className={"space-y-4 py-6"}>
                <div className={"flex items-start justify-between gap-3"}>
                    <div className={"space-y-2"}>
                        <p className={"text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"}>
                            {label}
                        </p>
                        <h3 className={"text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]"}>
                            {value}
                        </h3>
                    </div>

                    {icon ? (
                        <div className={"flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/80 text-foreground"}>
                            <Icon icon={icon} className={"h-5 w-5"}/>
                        </div>
                    ) : null}
                </div>

                <div className={"flex flex-wrap items-center gap-2"}>
                    {trend ? (
                        <Badge
                            variant={"secondary"}
                            className={"h-auto max-w-full whitespace-normal px-2 py-1 text-left leading-5"}
                        >
                            {trend}
                        </Badge>
                    ) : null}
                    {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
                </div>
            </CardContent>
        </Card>
    )
}

export default StatsCard
