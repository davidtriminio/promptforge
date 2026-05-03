import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div className={"min-h-screen bg-muted/35 text-foreground"}>
            <a href="#main-content"
               className={"sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground"}>
                Saltar al contenido principal
            </a>
            <div
                className={"absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.05),transparent_26%)]"}/>

            <div className={"mx-auto max-w-[1600px] px-4 py-4 lg:px-6 lg:py-6 2xl:px-8"}>
                <div className={"grid min-h-[calc(100vh-2rem)] gap-4 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-6"}>
                    <div className={"hidden lg:block"}>
                        <div className={"sticky top-6 h-[calc(100vh-3rem)]"}>
                            <Sidebar/>
                        </div>
                    </div>

                    <div
                        className={"min-w-0 overflow-hidden rounded-[28px] border border-border/60 bg-background/90 shadow-sm backdrop-blur"}>
                        <Header/>

                        <main id="main-content" className={"min-w-0 px-4 py-6 sm:px-6 lg:px-8"}>
                            <Outlet/>
                        </main>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default AppLayout
