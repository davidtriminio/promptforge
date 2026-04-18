import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, "Title is required."],
        trim: true,
        minLength: [3, "Title must be at least 3 characters."],
        maxLength: [100, "Title cannot exceed 100 characters."]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: [300, "Description cannot exceed 300 characters."],
        default: ""
    },
    content:{
        type: String,
        required: [true, "Prompt is required."],
        trim: true,
        minLength: [10, "Prompt content must be at least 10 characters."],
        maxLength: [10000, "Prompt cannot exceed 10000 characters."]
    },
    tags: {
        type: [String],
        default: []
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
})

promptSchema.index({user: 1, createdAt: -1})

export const Prompt = mongoose.model("Prompst", promptSchema)

export default Prompt