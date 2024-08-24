
import express from "express";
import readCategory from "../../controllers/admin/readCategory.js";
import createCategory from "../../controllers/admin/createCategory.js";
import updateCategory from "../../controllers/admin/updateCategory.js";
import deleteCategory from "../../controllers/admin/deleteCategory.js";

const router = express.Router();
router.get("/categories",readCategory)
router.post("/categories",createCategory)
router.patch("/categories/:id",updateCategory)
router.delete("/categories/:id",deleteCategory);


export default router;