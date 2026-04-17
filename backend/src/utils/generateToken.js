import jwt from "jsonwebtoken"
import {ENV} from "../config/ENV.js";

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        ENV.JWT_SECRET,
        {
            expiresIn: ENV.JWT_EXPIRES_IN || "7d"
        }
    )
}

export default generateToken