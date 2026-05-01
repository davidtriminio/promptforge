import {body} from "express-validator";

export const registerValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({min: 2, max: 50})
    .withMessage("El nombre debe tener entre 2 y 50 caracteres."),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("Por favor ingrese un correo electrónico válido.")
    .normalizeEmail(),

    body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({min: 6})
    .withMessage("La contraseña debe tener al menos 6 caracteres.")
]

export const loginValidator = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio.")
    .isEmail()
    .withMessage("Por favor ingrese un correo electrónico válido.")
    .normalizeEmail(),

    body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
]