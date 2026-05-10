import jwt from "jsonwebtoken";
import {ENV} from "../config/ENV.js";
import User from "../models/User.model.js";

const protect = async (req, res, next) => {
    try {
        const token =
            req.cookies?.[ENV.COOKIE_NAME] ||
            (req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
                    : null
            )

        if (!token) {
            return res.status(401).json({
                message: "No autorizado. Falta el token de acceso."
            })
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET)

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(401).json("No autorizado. No se encontró el usuario.")
        }

        req.user = user
        next()
    } catch (e) {
        return res.status(401).json({
            message: "No autorizado. El token no es válido o expiró."
        })
    }
}

export default protect