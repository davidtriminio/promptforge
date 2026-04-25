import {validationResult} from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    return res.status(400).json({
        message: "Validation error",
        errors: errors.array().map((error) => ({
            field: error,
            message: error.msg
        }))
    })
}

export default validate