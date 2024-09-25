
import express from "express";
import readCategory from "../../controllers/admin/readCategory.js";
import createCategory from "../../controllers/admin/createCategory.js";
import updateCategory from "../../controllers/admin/updateCategory.js";
import deleteCategory from "../../controllers/admin/deleteCategory.js";

const router = express.Router();
router.get("/",readCategory)
router.post("/",createCategory)
router.patch("/:id",updateCategory)
router.delete("/:id",deleteCategory);


export default router;