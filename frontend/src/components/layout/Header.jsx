import {useAuth} from "../../hooks/useAuth.js";
import {Link} from "react-router-dom";

const Header = () => {
    const {user, logout} = useAuth()
    return (
        <header className={"border-b bg-white"}>
            <div className={"mx-auto flex max-w-7xl items-center justify-between px-4 py-4"}>
                <Link to={"/dashboard"} className={"text-xl font-semibold text-slate-900"}>
                    PromptForge
                </Link>

                <div className={"flex items-center gap-3"}>
                    <div className={"hidden text-right sm:block"}>
                        <p className={"text-sm font-medium text-slate-800"}>{user?.name}</p>
                        <p className={"text-xs text-slate-500"}>{user?.email}</p>
                    </div>

                    <button
                        onClick={logout}
                        className={"btn btn-sm rounded-md"}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}
export default Header
