const EmptyState = ({title, description, action}) => {
    return (
        <div className={"rounded-lg border border-dashed bg-white p-8 text-center"}>
            <h3 className={"text-lg font-semibold text-slate-900"}>{title}</h3>
            <p className={"mt-2 text-sm text-slate-600"}>{description}</p>
            {action ? <div className={"mt-4"}>{action}</div> : null}
        </div>
    )
}
export default EmptyState
