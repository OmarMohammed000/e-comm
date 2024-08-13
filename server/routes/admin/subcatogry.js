import express from "express";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import readSubcategory from "../../controllers/admin/readSubCategory.js";
import createSubcategory from "../../controllers/admin/createSubcategory.js";
import updateSubcategory from "../../controllers/admin/updateSubcategory.js";
import deleteSubcategory from "../../controllers/admin/deleteSubcategory.js";

const router = express.Router();
router.get("/subcategory",authorizeToken,readSubcategory)
router.post("/subcategory",authorizeToken,createSubcategory)
router.patch("/subcategory/:id",authorizeToken,updateSubcategory)
router.delete("/subcategory/:id",authorizeToken,deleteSubcategory);

export default router;