import {body} from "express-validator";

export const createPromptValidator = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({min: 3, max: 100})
    .withMessage("El título debe tener entre 3 y 100 caracteres."),

    body("description")
    .optional()
    .trim()
    .isLength({max: 300})
    .withMessage("La descripción no puede exceder los 300 caracteres."),

    body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido del prompt es obligatorio.")
    .isLength({min: 10, max: 10000})
    .withMessage("El contenido del prompt debe tener entre 10 y 10000 caracteres."),

    body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un arreglo."),

    body("tags.*")
    .optional()
    .isString()
    .withMessage("Cada etiqueta debe ser una cadena de texto.")
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage("Cada etiqueta debe tener entre 1 y 30 caracteres."),

    body("category")
    .optional({nullable: true})
    .isMongoId()
    .withMessage("La categoría debe ser un ID válido.")
]

export const updatePromptValidator = [
    body("title")
    .optional()
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage("El título debe tener entre 3 y 100 caracteres."),

    body("description")
    .optional()
    .trim()
    .isLength({max: 300})
    .withMessage("La descripción no puede exceder los 300 caracteres."),

    body("content")
    .optional()
    .trim()
    .isLength({min: 10, max: 10000})
    .withMessage("El contenido del prompt debe tener entre 10 y 10000 caracteres."),

    body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben ser un arreglo."),

    body("tags.*")
    .optional()
    .isString()
    .withMessage("Cada etiqueta debe ser una cadena de texto.")
    .trim()
    .isLength({min: 1, max: 300})
    .withMessage("Cada etiqueta debe tener entre 1 y 300 caracteres."),

    body("category")
    .optional({nullable: true})
    .isMongoId()
    .withMessage("La categoría debe ser un ID válido.")
]