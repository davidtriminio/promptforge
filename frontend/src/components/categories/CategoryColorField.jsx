import React from 'react'
import {cn} from "@/lib/utils.ts";

const CategoryColorField = ({
    id,
    label = "Color",
    value,
    onChange,
    className,
    showHelperText = true
}) => {
    return (
        <div className={cn("space-y-2", className)}>
            <label htmlFor={id} className={"text-sm font-medium text-foreground"}>
                {label}
            </label>

            <div className={"relative"}>
                <div
                    className={
                        "flex h-11 items-center gap-3 rounded-md border border-input bg-background px-3 shadow-sm transition-colors"
                    }
                >
                    <span className={"h-5 w-5 shrink-0 rounded-full border border-black/10 ring-1 ring-black/5"}
                        style={{backgroundColor: value}}/>

                    <div className={"min-w-0"}>
                        <p className={"text-sm font-medium text-foreground"}>
                            Seleccionar color
                        </p>
                        <p className={"text-xs uppercase tracking-[0.12em] text-muted-foreground"}>
                            {value}
                        </p>
                    </div>
            </div>

                <input
                    id={id}
                    type={"color"}
                    className={"absolute inset-0 h-full w-full cursor-pointer opacity-0"}
                    value={value}
                    onChange={onChange}
                    aria-describedby={showHelperText ? `${id}-help` : undefined}/>
            </div>

            {showHelperText ? (
                <p id={`${id}-help`} className={"text-xs leading-5 text-muted-foreground"}>
                    Pulsa aquí para elegir o cambiar el color de la categoría.
                </p>
            ) : null}

        </div>
    )
}
export default CategoryColorField
