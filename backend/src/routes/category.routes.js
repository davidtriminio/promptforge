import express from "express";
import {createCategory, deleteCategory, getCategories, updateCategory} from "../controllers/category.controller.js";
import {createCategoryValidator, updateCategoryValidator} from "../validators/category.validator.js";
import validate from "../middlewares/validate.middleware.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router()
router.use(protect)

router
.route("/")
.get(getCategories)
.post(createCategoryValidator, validate, createCategory)

router
.route("/:id")
.put(updateCategoryValidator, validate, updateCategory)
.delete(deleteCategory)

export default router