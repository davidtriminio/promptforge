import jwt from "jsonwebtoken";
import {ENV} from "../config/ENV.js";

const generateRefreshToken = (userId) => {
    return jwt.sign(
        {id: userId},
        ENV.JWT_REFRESH_SECRET,
        {expiresIn: ENV.JWT_REFRESH_EXPIRES_IN}
    )
}

export default generateRefreshToken