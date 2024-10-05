import express from "express";
import readSubcategory from "../../controllers/admin/readSubcategory.js";
import createSubcategory from "../../controllers/admin/createSubcategory.js";
import updateSubcategory from "../../controllers/admin/updateSubcategory.js";
import deleteSubcategory from "../../controllers/admin/deleteSubcategory.js";
import addProductToSubcategory from "../../controllers/admin/assignProductstoSubcategory.js";
import removeProductFromSubcategory from "../../controllers/admin/deleteSubcategoriesFromProduct.js";

const router = express.Router();
// assign subcategories to products and removing 
router.post("/assignToProduct",addProductToSubcategory);
router.delete("/deleteFromProduct",removeProductFromSubcategory)
// doing crud on subcategoreies;
router.get("/",readSubcategory)
router.post("/",createSubcategory)
router.patch("/:id",updateSubcategory)
router.delete("/:id",deleteSubcategory);

export default router;