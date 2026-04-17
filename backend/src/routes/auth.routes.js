import {Router} from "express";
import {loginValidator, registerValidator} from "../middlewares/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {getMe, login, register} from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", registerValidator, validate, register)
router.post("/login", loginValidator, validate, login)
router.post("/me", protect, getMe)

export default router