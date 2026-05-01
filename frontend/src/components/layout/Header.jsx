import {useAuth} from "../../hooks/useAuth.js";
import {Link} from "react-router-dom";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";
import Sidebar from "@/components/layout/Sidebar.jsx";

const Header = () => {
    const {user, logout} = useAuth()
    return (
        <header className={"sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-xl"}>
            <div className={"mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6"}>
                <div className={"flex items-center gap-3"}>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                            type={"button"}
                            variant={"outline"}
                            size={"icon"}
                            className={"lg:hidden"}
                            >
                                <Icon icon={"solar:hamburger-menu-linear"} className={"h-5 w-5"}/>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side={"left"} className={"w-[320px] border-r p-0"}>
                            <div className={"h-full p-4"}>
                                <Sidebar/>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link to={"/dashboard"} className={"flex items-center gap-3"}>
                        <span className={"flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"}>
                            <Icon icon={"solar:document-add-bold-duotone"}
                                  className={"h-5 w-5"}
                                  />
                        </span>

                        <span className={"min-w-0"}>
                            <span className={"block text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground"}>
                                Espacio de trabajo
                            </span>
                            <span className={"block text-lg font-semibold tracking-tight text-foreground"}>
                                PromptForge
                            </span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <div className={"hidden text-right sm:block"}>
                        <p className={"text-sm font-medium text-foreground"}>{user?.name || "Usuario"}</p>
                        <p className={"text-xs text-muted-foreground"}>{user?.email || "Sin Correo"}</p>
                    </div>
                    
                    <Button type={"button"} variant={"outline"} onClick={logout}>
                        <Icon icon={"solar:logout-2-outline"}
                              className={"mr-2 h-4 w-4"}/>
                            Cerrar Sesión
                    </Button>
                    
                </div>

            </div>
        </header>
    )
}
export default Header
