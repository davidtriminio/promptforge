const LoadingState = ({message = "Loading..."}) => {
    return (
        <div className={"flex items-center gap-3 rounded-lg border bg-white px-4 py-4 text-sm text-slate-600"}>
            <span className={"loading loading-spinner loading-sm"}>
                <span>{message}</span>
            </span>
        </div>
    )
}
export default LoadingState
