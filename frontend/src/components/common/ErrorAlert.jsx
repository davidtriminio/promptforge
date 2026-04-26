const ErrorAlert = ({message = "Something went wrong."}) => {
    return (
        <div className={"alert alert-error rounded-lg"}>
            <span>{message}</span>
        </div>
    )
}
export default ErrorAlert
