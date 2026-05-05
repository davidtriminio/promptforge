import mongoose from "mongoose"
import Prompt from "../models/Prompt.model.js"
import Category from "../models/Category.model.js"

const normalizeTags = (tags = []) => {
    return [...new Set(
        tags
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    )]
}

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id)

export const validateCategoryOwnership = async (categoryId, userId) => {
    if (!categoryId) {
        return true
    }

    const category = await Category.findOne({
        _id: categoryId,
        user: userId
    })

    return Boolean(category)
}

export const createPrompt = async (req, res) => {
    try {
        const {title, description, content, tags, category} = req.body

        const isCategoryValid = await validateCategoryOwnership(
            category,
            req.user._id
        )

        if (!isCategoryValid) {
            return res.status(400).json({
                message: "La categoría seleccionada no es válida"
            })
        }

        const prompt = await Prompt.create({
            user: req.user._id,
            category: category || null,
            title,
            description,
            content,
            tags: normalizeTags(tags)
        })

        return res.status(201).json({
            message: "Prompt creado correctamente.",
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo crear el prompt."
        })
    }
}

export const getPrompts = async (req, res) => {
    try {
        const {
            search = "",
            category,
            tag,
            favorite,
            sort = "newest",
            page = 1,
            limit = 10
        } = req.query

        const query = {
            user: req.user._id
        }

        if (search.trim()) {
            query.$or = [
                {title: {$regex: search.trim(), $options: "i"}},
                {description: {$regex: search.trim(), $options: "i"}},
                {content: {$regex: search.trim(), $options: "i"}}
            ]
        }

        if (category) {
            if (!isValidId(category)) {
                return res.status(400).json({
                    message: "El ID de la categoría no es válido."
                })
            }

            const isCategoryValid = await validateCategoryOwnership(
                category,
                req.user._id
            )

            if (!isCategoryValid) {
                return res.status(400).json({
                    message: "La categoría seleccionada no es válida."
                })
            }

            query.category = category
        }

        if (tag) {
            query.tags = tag.trim().toLowerCase()
        }

        if (favorite !== undefined) {
            if (favorite !== "true" && favorite !== "false") {
                return res.status(400).json({
                    message: "El valor de favorito debe ser true o false."
                })
            }

            query.isFavorite = favorite === "true"
        }

        const allowedSorts = {
            newest: {createdAt: -1},
            oldest: {createdAt: 1},
            updated: {updatedAt: -1},
            titleAsc: {title: 1},
            titleDesc: {title: -1},
            title_asc: {title: 1},
            title_desc: {title: -1}
        }

        const sortOptions = allowedSorts[sort] || allowedSorts.newest

        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        if (
            !Number.isInteger(pageNumber) ||
            pageNumber < 1 ||
            !Number.isInteger(limitNumber) ||
            limitNumber < 1 ||
            limitNumber > 100
        ) {
            return res.status(400).json({
                message: "Page y limit deben ser enteros positivos válidos."
            })
        }

        const skip = (pageNumber - 1) * limitNumber

        const [prompts, total] = await Promise.all([
            Prompt.find(query)
            .populate("category", "name color")
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber),
            Prompt.countDocuments(query)
        ])

        const totalPages = Math.ceil(total / limitNumber)

        return res.status(200).json({
            count: prompts.length,
            pagination: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages,
                hasNextPage: pageNumber < totalPages,
                hasPrevPage: pageNumber > 1
            },
            filters: {
                search,
                category: category || null,
                tag: tag || null,
                favorite: favorite ?? null,
                sort
            },
            prompts
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudieron cargar los prompts."
        })
    }
}

export const getPromptById = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "El ID del prompt no es válido."
            })
        }

        const prompt = await Prompt.findOne({
            _id: id,
            user: req.user._id
        }).populate("category", "name color")

        if (!prompt) {
            return res.status(404).json({
                message: "No se encontró el prompt."
            })
        }

        return res.status(200).json({
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo cargar el prompt."
        })
    }
}

export const updatePrompt = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "El ID del prompt no es válido."
            })
        }

        const updateData = {...req.body}

        if (updateData.tags) {
            updateData.tags = normalizeTags(updateData.tags)
        }

        if (updateData.category === null) {
            updateData.$unset = {category: ""}
            delete updateData.category
        }

        if (updateData.category) {
            const isCategoryValid = await validateCategoryOwnership(
                updateData.category,
                req.user._id
            )

            if (!isCategoryValid) {
                return res.status(400).json({
                    message: "La categoría seleccionada no es válida"
                })
            }
        }

        const prompt = await Prompt.findOneAndUpdate({
                _id: id,
                user: req.user._id
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).populate("category", "name color")

        if (!prompt) {
            return res.status(404).json({
                message: "No se encontró el prompt."
            })
        }

        return res.status(200).json({
            message: "Prompt actualizado correctamente.",
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo actualizar el prompt."
        })
    }
}

export const deletePrompt = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "El ID del prompt no es válido."
            })
        }

        const prompt = await Prompt.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!prompt) {
            return res.status(404).json({
                message: "No se encontró el prompt"
            })
        }

        return res.status(200).json({
            message: "Prompt eliminado correctamente."
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo eliminar el prompt."
        })
    }
}

export const toggleFavoritePrompt = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "El ID del prompt no es válido."
            })
        }

        const prompt = await Prompt.findOne({
            _id: id,
            user: req.user._id
        })

        if (!prompt) {
            return res.status(404).json({
                message: "No se encontró el prompt."
            })
        }

        prompt.isFavorite = !prompt.isFavorite

        await prompt.save()

        return res.status(200).json({
            message: "El estado de favorito se actualizó correctamente.",
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "No se pudo actualizar el estado de favorito."
        })
    }
}