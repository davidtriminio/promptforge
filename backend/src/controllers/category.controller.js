import mongoose from "mongoose";
import Category from "../models/Category.model.js";
import Prompt from "../models/Prompt.model.js";

const normalizeCategoryName = (name) => name.trim().toLowerCase()

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id)

export const createCategory = async (req, res) => {
    try {
        const {name, color} = req.body
        const normalizedName = normalizeCategoryName(name)

        const existingCategory = await Category.findOne({
            user: req.user._id,
            normalizedName
        })

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exist."
            })
        }

        const category = await Category.create({
            user: req.user._id,
            name,
            normalizedName,
            color
        })

        return res.status(201).json({
            message: "Category created successfully."
        })
    } catch (e) {
        return res.status(500).json({
            message: `Error creating category.`
        })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = Category.find({
            user: req.user._id
        }).sort({name: 1})

        return res.status.json({
            count: categories.length,
            categories
        })
    } catch (e) {
        return res.status(500).json({
            message: "Failed fetching categories."
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "Invalid category ID."
            })
        }

        const category = await Category.findOne({
            id: id,
            user: req.user._id
        })

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            })
        }

        if (req.body.name) {
            const normalizedName = normalizeCategoryName(req.body.name)

            const duplicatedCategory = await Category.findOne({
                _id: {$ne: id},
                user: req.user._id,
                normalizedName
            })

            if (duplicatedCategory) {
                return res.status(409).json({
                    message: "Category already exists."
                })
            }
            category.name = req.body.name
            category.normalizedName = normalizedName
        }

        if (req.body.color) {
            category.color = req.body.color
        }

        await category.save()

        return res.status(200).message({
            message: "Category updated successfully."
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error updating category."
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "Invalid category ID."
            })
        }

        const category = await Category.findOne({
            _id: id,
            user: req.user._id
        })

        if (!category) {
            return res.status(404).json({
                message: "Category not found."
            })
        }

        await Prompt.updateMany({
            user: req.user._id,
            category: id
        }, {
            $unset: {category: ""}
        })

        return res.status(200).json({
            message: "Category deleted successfully."
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error deleting category."
        })
    }
}