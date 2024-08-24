import express from "express";
import readSubcategory from "../../controllers/admin/readSubCategory.js";
import createSubcategory from "../../controllers/admin/createSubcategory.js";
import updateSubcategory from "../../controllers/admin/updateSubcategory.js";
import deleteSubcategory from "../../controllers/admin/deleteSubcategory.js";
import addProductToSubcategory from "../../controllers/admin/assignProductstoSubcategory.js";
import removeProductFromSubcategory from "../../controllers/admin/deleteSubcategoriesFromProduct.js";

const router = express.Router();
// assign subcategories to products and removing 
router.post("/subcategories/assignToProduct",addProductToSubcategory);
router.delete("/subcategories/deleteFromProduct",removeProductFromSubcategory)
// doing crud on subcategoreies;
router.get("/subcategories",readSubcategory)
router.post("/subcategories",createSubcategory)
router.patch("/subcategories/:id",updateSubcategory)
router.delete("/subcategories/:id",deleteSubcategory);

export default router;