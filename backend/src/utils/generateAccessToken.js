import jwt from "jsonwebtoken";
import {ENV} from "../config/ENV.js";

const generateAccessToken = (userId) => {
    return jwt.sign(
        {id: userId},
        ENV.JWT_ACCESS_SECRET,
        {expiresIn: ENV.JWT_ACCESS_EXPIRES_IN}
    )
}

export default generateAccessToken
