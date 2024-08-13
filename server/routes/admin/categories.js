import authorizeToken from "../../controllers/admin/authorizeToken.js";
import express from "express";
import readCategory from "../../controllers/admin/readCategory.js";
import createCategory from "../../controllers/admin/createCategory.js";
import updateCategory from "../../controllers/admin/updateCategory.js";
import deleteCategory from "../../controllers/admin/deleteCategory.js";

const router = express.Router();
router.get("/category",authorizeToken,readCategory)
router.post("/category",authorizeToken,createCategory)
router.patch("/category/:id",authorizeToken,updateCategory)
router.delete("/category/:id",authorizeToken,deleteCategory);

export default router;