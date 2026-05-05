import User from "../models/User.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email})

    if (existingUser) {
        return res.status(409).json({
            message: "Ya existe una cuenta con ese correo electrónico."
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    const token = generateToken(user._id)

    return res.status(201).json({
        message: "Usuario registrado correctamente.",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}

export const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Correo o contraseña incorrectos."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message: "Correo o contraseña incorrectos."
        })
    }

    const token = generateToken(user._id)
    return res.status(200).json({
        message: "Inicio de sesión correcto.",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}

export const getMe = async(req,res) => {
    return res.status(200).json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    })
}