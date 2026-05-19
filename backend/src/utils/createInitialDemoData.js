import Category from "../models/Category.model.js"
import Prompt from "../models/Prompt.model.js"

const buildNormalizedName = (name) => name.trim().toLowerCase()

export const createInitialDemoData = async (userId) => {
    const categories = await Category.insertMany([
        {
            user: userId,
            name: "Marketing",
            normalizedName: buildNormalizedName("Marketing"),
            color: "#6366f1"
        },
        {
            user: userId,
            name: "Desarrollo",
            normalizedName: buildNormalizedName("Desarrollo"),
            color: "#10b981"
        },
        {
            user: userId,
            name: "Soporte",
            normalizedName: buildNormalizedName("Soporte"),
            color: "#f59e0b"
        }
    ])

    const marketingCategory = categories.find((category) => category.name === "Marketing")
    const developmentCategory = categories.find((category) => category.name === "Desarrollo")
    const supportCategory = categories.find((category) => category.name === "Soporte")

    await Prompt.insertMany([
        {
            user: userId,
            category: marketingCategory?._id ?? null,
            title: "Campaña para lanzamiento de producto",
            description: "Prompt orientado a crear una campaña clara y persuasiva.",
            content: "Actúa como estratega de marketing senior. Diseña una campaña de lanzamiento para un producto SaaS dirigido a equipos pequeños que necesitan organizar prompts y documentación interna.",
            tags: ["marketing", "lanzamiento", "saas"],
            isFavorite: true
        },
        {
            user: userId,
            category: developmentCategory?._id ?? null,
            title: "Generar plan técnico de implementación",
            description: "Prompt para dividir una funcionalidad compleja en pasos de desarrollo.",
            content: "Actúa como staff frontend engineer. Analiza la funcionalidad solicitada, divide el trabajo en bloques pequeños, identifica riesgos y propone una secuencia de implementación realista.",
            tags: ["frontend", "arquitectura", "planificacion"],
            isFavorite: true
        },
        {
            user: userId,
            category: supportCategory?._id ?? null,
            title: "Respuesta profesional para soporte",
            description: "Prompt para responder tickets con tono claro y útil.",
            content: "Actúa como especialista de soporte. Redacta una respuesta breve, empática y profesional para un usuario que reporta un error intermitente al guardar datos en la plataforma.",
            tags: ["soporte", "clientes"],
            isFavorite: false
        },
        {
            user: userId,
            category: null,
            title: "Resumen ejecutivo",
            description: "Prompt general para resumir documentos o ideas extensas.",
            content: "Resume el contenido en formato ejecutivo con conclusiones clave, riesgos principales y próximos pasos recomendados.",
            tags: ["resumen", "general"],
            isFavorite: false
        }
    ])
}

export default createInitialDemoData
