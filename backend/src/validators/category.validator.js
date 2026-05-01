import {body} from "express-validator";

export const createCategoryValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la categoría es obligatorio.")
    .isLength({min: 2, max: 40})
    .withMessage("El nombre de la categoría debe tener entre 2 y 40 caracteres."),

    body("color")
    .optional()
    .trim()
    .matches(/^#([0-9A-F]{3}){1,2}$/i)
    .withMessage("El color debe ser un color hexadecimal válido.")
]

export const updateCategoryValidator = [
    body("name")
    .optional()
    .trim()
    .isLength({min: 2, max: 40})
    .withMessage("El nombre de la categoría debe tener entre 2 y 40 caracteres."),

    body("color")
    .optional()
    .trim()
    .matches(/^#([0-9A-F]{3}){1,2}$/i)
    .withMessage("El color debe ser un color hexadecimal válido.")
]