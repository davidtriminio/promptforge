import {Router} from "express";
import {loginValidator, registerValidator} from "../middlewares/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {login, register} from "../controllers/auth.controller.js";

const router = Router()

router.post("/register", registerValidator, validate, register)
router.post("/login", loginValidator, validate, login)

export default router