import {NavLink} from "react-router-dom";
import {workspaceNavigation} from "@/config/navigation.js";
import {cn} from "@/lib/utils.ts";
import {Icon} from "@iconify/react";

const Sidebar = ({onNavigate}) => {
    return (
        <aside className={"flex h-full flex-col rounded-3xl border border-border/70 bg-card/95 p-4 shadow-sm backdrop-blur"}>
            <div className={"border-b border-border/60 px-2 pb-4"}>
                <p className={"text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"}>Workspace</p>
                <h2 className={"mt-2 text-lg font-semibold tracking-tight text-foreground"}>PromptForge</h2>
                <p className={"mt-1 text-sm text-muted-foreground"}>Tu sistema privado para guardar y reutilizar prompts.</p>
            </div>
            <nav className={"mt-4 flex flex-1 flex-col gap-2"}>
                {workspaceNavigation.map((item) => (
                    <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onNavigate}
                    className={({isActive}) =>
                    cn(
                        "group flex items-start gap-3 rounded-2xl px-3 py-3 transition-all",
                        isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    >
                        {({isActive}) => (
                            <>
                            <span
                                className={cn(
                                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
                                    isActive
                                        ? "border-white/15 bg-white/10 text-primary-foreground"
                                        : "border-border/60 bg-background text-foreground group-hover:bg-card"
                                )}
                                >
                                <Icon icon={item.icon} className={"h-5 w-5"}/>
                            </span>
                                <span className={"min-w-0"}>
                                    <span className={cn(
                                        "block text-sm font-medium",
                                        isActive ? "text-primary-foreground" : "text-foreground"
                                    )}>
                                        {item.label}
                                    </span>
                                    <span
                                        className={cn(
                                            "mt-0.5 block text-xs",
                                            isActive
                                                ? "text-primary-foreground/80"
                                                : "text-muted-foreground"
                                        )}>
                                        {item.description}
                                    </span>
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className={"mt-4 rounded-2xl border border-dashed border-border/70 bg-muted/40 p-3"}>
                <p className={"text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"}>Estado</p>
                <p className={"mt-2 text-sm text-foreground"}>
                    Base del workspace lista para seguir con el refactor visual.
                </p>
            </div>

        </aside>
    )
}
export default Sidebar
