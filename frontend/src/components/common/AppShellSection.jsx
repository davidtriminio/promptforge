import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {cn} from "@/lib/utils.ts";

const AppShellSection = ({
    title,
    description,
    children,
    className,
    contentClassName
}) => {
    return (
        <Card className={cn("border-border/70 shadow-sm", className)}>
            {title || description ? (
                <CardHeader>
                    {title ? <CardTitle className={"text-base"}>{title}</CardTitle> : null}
                    {description ? (
                        <CardDescription>{description}</CardDescription>
                    ) : null}
                </CardHeader>
            ) : null}
            <CardContent className={contentClassName}>{children}</CardContent>
        </Card>
    )
}
export default AppShellSection
