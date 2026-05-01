import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

const ConfirmModal = ({
                          isOpen,
                          title,
                          message,
                          confirmText = "Confirmar",
                          cancelText = "Cancelar",
                          onConfirm,
                          onCancel,
                          isLoading = false
}) => {

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type={"button"}
                        variant={"outline"}
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        type={"button"}
                        variant={"destructive"}
                        onClick={onConfirm}
                        disabled={isLoading}>
                        {isLoading ? "Procesando..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmModal