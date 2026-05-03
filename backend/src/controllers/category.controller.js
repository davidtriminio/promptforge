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
                message: "La categoría ya existe."
            })
        }

        const category = await Category.create({
            user: req.user._id,
            name,
            normalizedName,
            color
        })

        return res.status(201).json({
            message: "Categoría creada correctamente.",
            category
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo crear la categoría."
        })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.user._id
        }).sort({name: 1})

        return res.status(200).json({
            count: categories.length,
            categories
        })
    } catch (e) {
        return res.status(500).json({
            message: `No se pudieron cargar las categorías.`
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "El ID de la categoría no es válido."
            })
        }

        const category = await Category.findOne({
            _id: id,
            user: req.user._id
        })

        if (!category) {
            return res.status(404).json({
                message: "No se encontró la categoría."
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
                    message: "La categoría ya existe."
                })
            }
            category.name = req.body.name
            category.normalizedName = normalizedName
        }

        if (req.body.color) {
            category.color = req.body.color
        }

        await category.save()

        return res.status(200).json({
            message: "Categoría actualizada correctamente."
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo actualizar la categoría."
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "El ID de la categoría no es válido."
            })
        }

        const category = await Category.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!category) {
            return res.status(404).json({
                message: "No se encontró la categoría."
            })
        }

        await Prompt.updateMany({
            user: req.user._id,
            category: id
        }, {
            $unset: {category: ""}
        })

        return res.status(200).json({
            message: "Categoría eliminada correctamente."
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo eliminar la categoría."
        })
    }
}