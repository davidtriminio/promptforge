import User from "../models/User.model.js";
import bcrypt from "bcryptjs"
import {ENV} from "../config/ENV.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import hashToken from "../utils/hashToken.js";
import jwt from "jsonwebtoken";

const ACCESS_COOKIE_MAX_AGE_MS = 15 * 60 * 1000;
const REFRESH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const sanitizeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isDemo: user.isDemo
})

const buildCookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: ENV.COOKIE_SECURE === "true",
    sameSite: ENV.COOKIE_SAME_SITE,
    signed: false,
    path: "/",
    maxAge: maxAge
})

const buildRefreshExpiryDate = () =>
    new Date(Date.now() + REFRESH_COOKIE_MAX_AGE_MS);

const clearAuthCookies = (res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: ENV.COOKIE_SECURE === "true",
        sameSite: ENV.COOKIE_SAME_SITE,
        path: "/"
    }

    res.clearCookie(ENV.ACCESS_COOKIE_NAME, cookieOptions)
    res.clearCookie(ENV.REFRESH_COOKIE_NAME, cookieOptions)
}

const issueAuthCookies = async (res, user) => {
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    user.refreshTokenHash = hashToken(refreshToken)
    user.refreshTokenExpiresAt = buildRefreshExpiryDate()
    user.failedLoginAttempts = 0
    user.lockUntil = null
    await user.save()

    res.cookie(
        ENV.ACCESS_COOKIE_NAME,
        accessToken,
        buildCookieOptions(ACCESS_COOKIE_MAX_AGE_MS)
    )

    res.cookie(
        ENV.REFRESH_COOKIE_NAME,
        refreshToken,
        buildCookieOptions(REFRESH_COOKIE_MAX_AGE_MS)
    )
}

const registerFailedAttempt = async (user) => {
    user.failedLoginAttempts += 1

    if (user.failedLoginAttempts >= ENV.AUTH_MAX_FAILED_ATTEMPTS) {
        user.lockUntil = new Date(
            Date.now() + ENV.AUTH_LOCK_WINDOW_MINUTES * 60 * 1000
        )
        user.failedLoginAttempts = 0
    }

    await user.save()
}


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

    await issueAuthCookies(res, user)

    return res.status(200).json({
        message: "Usuario registrado correctamente.",
        user: sanitizeUser(user)
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

    if (user.lockUntil && user.lockUntil > new Date()) {
        return res.status(429).json({
            message: "Demasiados intentos fallidos. Intenta nuevamente más tarde."
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        await registerFailedAttempt(user)
        return res.status(401).json({
            message: "Correo o contraseña incorrectos."
        })
    }

    await issueAuthCookies(res, user)

    return res.status(200).json({
        message: "Inicio de sesión correcto.",
        user: sanitizeUser(user)
    })
}

export const refreshSession = async (req, res) => {
    const refreshToken = req.cookies?.[ENV.REFRESH_COOKIE_NAME]

    if (!refreshToken) {
        clearAuthCookies(res)
        return res.status(401).json({
            message: "No autorizado. Falta la sesión de renovación."
        })
    }

    try {
        const decoded = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.id)

        if (!user || !user.refreshTokenHash || !user.refreshTokenExpiresAt) {
            clearAuthCookies(res)
            return res.status(401).json({
                message: "No autorizado. La sesión ya no es válida."
            })
        }

        const hashedRefreshToken = hashToken(refreshToken)
        const isStoredTokenValid =
            user.refreshTokenHash === hashedRefreshToken &&
            user.refreshTokenExpiresAt > new Date()

        if (!isStoredTokenValid) {
            clearAuthCookies(res)
            return res.status(401).json({
                message: "No autorizado. La sesión ya no es válida."
            })
        }

        await issueAuthCookies(res, user)

        return res.status(200).json({
            message: "Sesión renovada correctamente.",
            user: sanitizeUser(user)
        })
    } catch {
        clearAuthCookies(res)
        return res.status(401).json({
            message: "No autorizado. La sesión ya no es válida."
        })
    }
}

export const getMe = async (req, res) => {
    return res.status(200).json({
        user: sanitizeUser(req.user)
    })
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies?.[ENV.REFRESH_COOKIE_NAME]

    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET)
            const user = await User.findById(decoded.id)

            if (user) {
                user.refreshTokenHash = null
                user.refreshTokenExpiresAt = null
                await user.save()
            }

        } catch {
        }
    }

    clearAuthCookies(res)

    return res.status(200).json({
        message: "Sesión cerrada correctamente."
    })
}