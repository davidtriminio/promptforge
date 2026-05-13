import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div className={"min-h-screen bg-background text-foreground"}>
            <a href="#main-content"
               className={"sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground"}>
                Saltar al contenido principal
            </a>
            <div
                className={"absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(78,113,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(40,199,111,0.08),transparent_24%)]"}
            />

            <div className={"mx-auto max-w-[1600px] px-4 py-4 lg:px-6 lg:py-6 2xl:px-8"}>
                <div className={"grid min-h-[calc(100vh-2rem)] gap-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-7"}>
                    <div className={"hidden lg:block"}>
                        <div className={"sticky top-6 h-[calc(100vh-3rem)]"}>
                            <Sidebar/>
                        </div>
                    </div>

                    <div
                        className={"min-w-0 overflow-hidden rounded-[30px] border border-border/70 bg-background/90 shadow-xl shadow-black/5 backdrop-blur-xl dark:shadow-black/20"}>
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
