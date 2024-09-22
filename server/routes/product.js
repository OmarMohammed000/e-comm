import express from "express";
import getProductsBySubcategory from "../controllers/collection/getProductsBySubcategory.js";
import readProduct from "../controllers/admin/readProduct.js";
import getProductsBySubcategoryAndTags from "../controllers/collection/getProductsBySubcategoryAndTags.js";
import searchProduct from "../controllers/collection/searchProduct.js";
import getProductByTag from "../controllers/collection/getProductByTag.js";

const router= express.Router();
router.get("/products",readProduct);
router.get("/products/subcategory/:subcategoryId",getProductsBySubcategory);
router.get("/product/subcategory/:subcategoryId/filter",getProductsBySubcategoryAndTags);
router.get("/product/filter",getProductByTag)
router.get("/product/search",searchProduct);

export default router;