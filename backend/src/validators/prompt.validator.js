import {body} from "express-validator";

export const createPromptValidator = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({min: 3, max: 100})
    .withMessage("Title must be between 3 and 100 characters."),

    body("description")
    .optional()
    .trim()
    .isLength({max: 300})
    .withMessage("Description cannot exceed 300 characters."),

    body("content")
    .trim()
    .notEmpty()
    .withMessage("Prompt content is required.")
    .isLength({min: 10, max: 10000})
    .withMessage("Prompt content must be between 10 and 10000 characters."),

    body("tags")
    .optional()
    .isArray()
    .withMessage("Tag must be an array."),

    body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be String.")
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage("Each tag must be between 1 and 30 characters."),
]

export const updatePromptValidator = [
    body("title")
    .optional()
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage("Title must be between 3 and 100 characters."),

    body("description")
    .optional()
    .trim()
    .isLength({max: 300})
    .withMessage("Description cannot exceed 300 characters."),

    body("content")
    .optional()
    .trim()
    .isLength({min: 10, max: 10000})
    .withMessage("Prompt content must be between 10 and 10000 characters."),

    body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be array."),

    body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be String.")
    .trim()
    .isLength({min: 1, max: 300})
    .withMessage("")
]