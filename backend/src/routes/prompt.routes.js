import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
    createPrompt,
    getPromptById,
    getPrompts,
    toggleFavoritePrompt,
    updatePrompt
} from "../controllers/prompt.controller.js";
import {createPromptValidator, updatePromptValidator} from "../validators/prompt.validator.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router()

router.use(protect)

router
.route("/")
.get(getPrompts)
.post(createPromptValidator, validate, createPrompt)

router
.route("/:id")
.get(getPromptById)
.put(updatePromptValidator, validate, updatePrompt)

router
.patch("/:id/favorite", toggleFavoritePrompt)

export default router