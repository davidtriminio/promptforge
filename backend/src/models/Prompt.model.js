import mongoose from "mongoose"

const promptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
        index: true
    },
    title: {
        type: String,
        required: [true, "El título es obligatorio."],
        trim: true,
        minLength: [3, "El título debe tener al menos 3 caracteres."],
        maxLength: [100, "El título no puede superar los 100 caracteres."]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [300, "La descripción no puede superar los 300 caracteres."],
        default: ""
    },
    content: {
        type: String,
        required: [true, "El prompt es obligatorio."],
        trim: true,
        minLength: [10, "El contenido del prompt debe tener al menos 10 caracteres."],
        maxLength: [10000, "El prompt no puede superar los 10000 caracteres."]
    },
    tags: {
        type: [String],
        default: [],
        validate: [
            {
                validator: (tags) => tags.length <= 10,
                message: "Solo puedes guardar hasta 10 etiquetas."
            },
            {
                validator: (tags) =>
                    tags.every((tag) => tag.trim().length <= 30),
                message: "Cada etiqueta no puede superar los 30 caracteres."
            }
        ]
    },
    currentVersion: {
        type: Number,
        default: 1,
        min: 1
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

promptSchema.index({user: 1, createdAt: -1})

export const Prompt = mongoose.model("Prompt", promptSchema)

export default Prompt