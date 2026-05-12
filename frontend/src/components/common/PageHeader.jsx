import {cn} from "@/lib/utils.ts";
import {Icon} from "@iconify/react";

const PageHeader = ({
                        title,
                        description,
                        icon,
                        eyebrow,
                        action,
                        meta,
                        className
                    }) => {
    return (
        <header
            className={cn(
                "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",
                className
            )}
        >
            <div className={"space-y-3"}>
                {eyebrow ? (
                    <p className={"text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground"}>
                        {eyebrow}
                    </p>
                ) : null}

                <div className={"flex items-start gap-4"}>
                    {icon ? (
                        <div className={"flex h-12 w-12 items-center justify-center rounded-3xl border border-border/70 bg-card text-foreground shadow-sm"}>
                            <Icon icon={icon} className={"h-5 w-5"}/>
                        </div>
                    ) : null}

                    <div className={"space-y-2"}>
                        <div className={"flex flex-wrap items-center gap-2"}>
                            <h1 className={"text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]"}>
                                {title}
                            </h1>
                            {meta}
                        </div>

                        {description ? (
                            <p className={"max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]"}>
                                {description}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>

            {action ? <div className={"shrink-0 self-start"}>{action}</div> : null}
        </header>
    )
}

export default PageHeader
