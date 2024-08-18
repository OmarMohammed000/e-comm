import express from "express";
import readSubcategory from "../../controllers/admin/readSubCategory.js";
import createSubcategory from "../../controllers/admin/createSubcategory.js";
import updateSubcategory from "../../controllers/admin/updateSubcategory.js";
import deleteSubcategory from "../../controllers/admin/deleteSubcategory.js";

const router = express.Router();
router.get("/subcategories",readSubcategory)
router.post("/subcategories",createSubcategory)
router.patch("/subcategories/:id",updateSubcategory)
router.delete("/subcategories/:id",deleteSubcategory);

export default router;