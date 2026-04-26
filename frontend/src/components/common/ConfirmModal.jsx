const ConfirmModal = ({
                          isOpen,
                          title,
                          message,
                          confirmText = "Confirm",
                          cancelText = "Cancel",
                          onConfirm,
                          onCancel,
                          isLoading = false
                      }) => {
    if (!isOpen) return null

    return (<dialog className={"modal modal-open"}>
            <div className={"modal-box rounded-lg"}>
                <h3 className={"text-lg font-semibold"}>{title}</h3>
                <p className={"mt-2 text-sm text-slate-600"}>{message}</p>

                <div className={"modal-action"}>
                    <button
                        type={"button"}
                        className={"btn btn-ghost"}
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        type={"button"}
                        className={"btn btn-error"}
                        onClick={onConfirm}
                        disabled={isLoading}>
                        {isLoading ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </dialog>)
}

export default ConfirmModal