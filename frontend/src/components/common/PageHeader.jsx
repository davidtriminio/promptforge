import {cn} from "@/lib/utils.ts";
import {Icon} from "@iconify/react";

const PageHeader = ({
                        title,
                        description,
                        icon,
                        eyebrow,
                        action,
                        className
}) => {
    return (
        <header
            className={cn(
                "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
                className
            )}>
            <div className={"space-y-3"}>
                {eyebrow ? (
                    <p className={"text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"}>{eyebrow}</p>
                ) : null}

                <div className={"flex items-start gap-3"}>{icon ? (
                    <div
                        className={"flex h-11 w-11 items-center justify-center rounded-2xl border bg-card text-foreground shadow-sm"}>
                        <Icon icon={icon} className={"h-5 w-5"}/>
                    </div>
                ) : null}
                    <div className={"space-y-1"}>
                        <h1 className={"text-2xl font-semibold tracking-tight text-foreground"}>{title}</h1>
                        {description ? (
                            <p className={"max-w-2xl text-sm text-muted-foreground"}>{description}</p>
                        ) : null}
                    </div>
                </div>
            </div>
            {action ? <div className={"shrink-0"}>{action}</div> : null}
        </header>
    )
}
export default PageHeader
