import {Router} from "express";
import {loginValidator, registerValidator} from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {demoLogin, getMe, login, logout, refreshSession, register} from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", registerValidator, validate, register)
router.post("/login", loginValidator, validate, login)
router.post("/demo-login", demoLogin)
router.post("/refresh", refreshSession)
router.post("/logout", protect, logout)
router.get("/me", protect, getMe)

export default router