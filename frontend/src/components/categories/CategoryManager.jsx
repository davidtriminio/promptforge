import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";

const CategoryManager = ({
                             categories,
                             onCreate,
                             onDelete,
                             isCreating = false
}) => {
    const [name, setName] = useState("")
    const [color, setColor] = useState("#6366f1")

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name.trim()) return

        onCreate({
            name: name.trim(),
            color
        })

        setName("")
        setColor("#6366f1")
    }

    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardHeader>
                <CardTitle>Categorías</CardTitle>
                <CardDescription>
                    Crea y administra las categorías que organizan tu biblioteca.
                </CardDescription>
            </CardHeader>

            <CardContent className={"space-y-5"}>
                <form onSubmit={handleSubmit} className={"flex flex-col gap-3 md:flex-row"}>
                    <Input
                        type={"text"}
                        placeholder={"Nombre de la categoría"}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        type={"color"}
                        className={"h-10 w-full rounded-md border border-input bg-background px-1 md:w-16"}
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                    />
                    <Button
                        type={"submit"}
                        disabled={isCreating}
                    >
                        <Icon icon={"solar:add-circle-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                        {isCreating ? "Creando..." : "Agregar"}
                    </Button>
                </form>

                <div className={"flex flex-wrap gap-2"}>
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className={"flex items-center gap-2 rounded-xl border border-border/70 bg-muted/30 px-3 py-2"}
                        >
                            <span className={"h-3 w-3 rounded-full"} style={{backgroundColor: category.color}}/>
                            <span className={"text-sm text-foreground"}>{category.name}</span>
                            <Button
                                type={"button"}
                                variant={"ghost"}
                                size={"sm"}
                                onClick={() => onDelete(category)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
export default CategoryManager
