import {NavLink} from "react-router-dom";

const linkBase =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors"
const getLinkClass = ({isActive}) => isActive ? `${linkBase} bg-slate-900 text-white` : `${linkBase} text-slate-700 hover:bg-slate-200`
const Sidebar = () => {
    return (
        <aside className={"h-fit rounded-lg border bg-white p-4 shadow-sm"}>
            <nav className={"flex flex-col gap-2"}>
                <NavLink to={"/dashboard"} className={getLinkClass}>
                    Dashboard
                </NavLink>
                <NavLink to={"/prompts"} className={getLinkClass}>
                    Prompts
                </NavLink>
            </nav>
        </aside>
    )
}
export default Sidebar
