import mongoose from "mongoose";
import Prompt from "../models/Prompt.model.js";

const normalizeTags = (tags = []) => {
    return [...new Set(
        tags
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    )]
}

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id)

export const createPrompt = async (req, res) => {
    try {
        const {title, description, content, tags} = req.body

        const prompt = await Prompt.create({
            user: req.user._id,
            title,
            description,
            content,
            tags: normalizeTags(tags)
        })
        return res.status(201).json({
            message: "Prompt created successfully.",
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error creating prompt"
        })
    }
}

export const getPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find({user: req.user._id})
        .sort({createdAt: -1})

        return res.status(200).json({
            count: prompts.length,
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error fetching prompts."
        })
    }
}

export const getPromptById = async (req, res) => {
    try {
        const {id} = req.para

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "Invalid promptId"
            })
        }

        const prompt = Prompt.findOne({
            _id: id,
            user: req.user._id
        })

        if (!prompt) {
            return res.status(404).json({
                message: "Prompt not found."
            })
        }

        return res.status(200).json({
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error fetching prompt."
        })
    }
}

export const updatePrompt = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "Invalid prompt id."
            })
        }

        const updateData = {...req.body}

        if (updateData.tags) {
            updateData.tags = normalizeTags(updateData.tags)
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
        )

        if (!prompt) {
            return res.status(404).json({
                message: "Prompt not found."
            })
        }

        return res.status(200).json({
            message: "Prompt updated successfully.",
            prompt
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error updating prompt."
        })
    }
}

export const deletePrompt = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "Invalid prompt id."
            })
        }

        const prompt = await Prompt.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!prompt) {
            return res.status(404).json({
                message: "Prompt not found"
            })
        }

        return res.status(200).json({
            message: "Prompt deleted successfully."
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error deleting prompt."
        })
    }
}

export const toggleFavoritePrompt = async (req, res) => {
    try {
        const {id} = req.params

        if (!isValidId(id)) {
            return res.status(400).json({
                message: "Invalid prompt id."
            })
        }

        const prompt = await Prompt.findOne({
            _id: id,
            user: req.user._id
        })

        if (!prompt) {
            return res.status(404).json({
                message: "Prompt not found."
            })
        }

        prompt.isFavorite = !prompt.isFavorite

        await prompt.save()

        return res.status(200).json({
            message: "Favorite status updated successfully."
        })
    } catch (e) {
        return res.status(500).json("Error updating favorite status.")
    }
}