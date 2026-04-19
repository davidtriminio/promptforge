import {body} from "express-validator";

export const createCategoryValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({min: 2, max: 40})
    .withMessage("Category name must be between 2 and 40 characters."),

    body("color")
    .optional()
    .trim()
    .matches(/^#([0-9A-F]{3}){1,2}$/i)
    .withMessage("Color must be a valid hex color.")
]

export const updateCategoryValidator = [
    body("name")
    .optional()
    .trim()
    .isLength({min: 2, max: 40})
    .withMessage("Category name must be between 2 and 40 characters."),

    body("color")
    .optional()
    .trim()
    .matches(/^#([0-9A-F]{3}){1,2}$/i)
    .withMessage("Color must be a valid hex color.")
]