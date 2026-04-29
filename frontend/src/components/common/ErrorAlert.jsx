import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Icon} from "@iconify/react";

const ErrorAlert = ({message = "Algo salió Mal."}) => {
    return (
        <Alert variant={"destructive"}>
            <Icon icon={"solar:danger-triangle-bold-duotone"} className={"h-4 w-4"}/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
export default ErrorAlert
