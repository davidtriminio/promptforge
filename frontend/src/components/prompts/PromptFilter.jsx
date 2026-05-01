import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@iconify/react";

const defaultFilters = {
    search: "",
    category: "",
    tag: "",
    favorite: "",
    sort: "newest"
}
const PromptFilter = ({filters, categories, onApply}) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const updateFilter = (name, value) => {
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onApply(localFilters)
    }

    const handleReset = () => {
        setLocalFilters(defaultFilters)
        onApply(defaultFilters)
    }

    return (
        <Card className={"border-border/70 shadow-sm"}>
            <CardContent className={"pt-6"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                        <Input
                            placeholder={"Buscar Prompts"}
                            value={localFilters.search}
                            onChange={(event) => updateFilter("search", event.target.value)}/>


                        <Select
                            value={localFilters.category || "__all__"}
                            onValueChange={(value) =>
                        updateFilter("category", value === "__all__" ? "" : value)}>
                            <SelectTrigger className={"w-full"}>
                                <SelectValue placeholder={"Todas las Categorias"}/>
                            </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"__all__"}>Todas las Categorias</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category._id} value={category._id}>
                                    {category.name}
                                        </SelectItem>
                                        ))}
                                </SelectContent>
                        </Select>

                        <Input
                            placeholder={"Filtrar por Etiqueta"}
                            value={localFilters.tag}
                            onChange={(event) => updateFilter("tag", event.target.value)}
                            />

                        <Select
                            value={localFilters.favorite || "__all__"}
                            onValueChange={(value) => updateFilter("favorite", value === "__all__" ? "" : value)}>
                            <SelectTrigger className={"w-full"}>
                                <SelectValue placeholder={"Todos los prompts"}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={"__all__"}>Todos</SelectItem>
                                <SelectItem value={"true"}>Favoritos</SelectItem>
                                <SelectItem value={"false"}>No Favoritos</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={localFilters.sort}
                            onValueChange={(value)=> updateFilter("sort", value)}>
                            <SelectTrigger className={"w-full"}>
                                <SelectValue placeholder={"Ordenar por"}/>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value={"newest"}>Más nuevos</SelectItem>
                                <SelectItem value={"oldest"}>Más antiguos</SelectItem>
                                <SelectItem value={"updated"}>Recientemente Modificados</SelectItem>
                                <SelectItem value={"title_asc"}>Título A-Z</SelectItem>
                                <SelectItem value={"title_desc"}>Título Z-A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={"flex flex-wrap gap-3"}>
                        <Button type={"submit"}>
                            <Icon icon={"solar:filter-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                            Aplicar Filtros
                        </Button>

                        <Button type={"button"} variant={"outline"} onClick={handleReset}>
                            <Icon icon={"solar:restart-bold-duotone"} className={"mr-2 h-4 w-4"}/>
                            Reiniciar Filtros
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
export default PromptFilter
