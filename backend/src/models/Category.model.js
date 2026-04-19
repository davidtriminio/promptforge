import mongoose, {mongo} from "mongoose";

const categorySchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        name: {
            type: String,
            required: [true, "Category name is required."],
            trim: true,
            minLength: [2, "Category name must be at least 2 characters."],
            maxLength: [40, "Category name cannot exceed 40 characters."]
        },
        normalizedName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        color: {
            type: String,
            default: "#6366f1",
            match: [/^#([(0-9A-F)]{3}){1,2}$/i, "Please provide a valid hex color"],
        }
    }, {
        timestamps: true
    }
)

categorySchema.index({user: 1, normalizedName: 1}, {unique: true})

const Category = new mongoose.Model("Category", categorySchema)

export default Category