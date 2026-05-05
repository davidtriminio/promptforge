import jwt from "jsonwebtoken";
import {ENV} from "../config/ENV.js";
import User from "../models/User.model.js";

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No autorizado. Falta el token de acceso."
            })
        }

        const token = authHeader.split(" ")[1]

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