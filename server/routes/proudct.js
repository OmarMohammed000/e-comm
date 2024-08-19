import express from "express";
import getProductsBySubcategory from "../controllers/collection/getProductsBySubcategory";
import readProduct from "../controllers/admin/readProduct";
import getProductsBySubcategoryAndTags from "../controllers/collection/getProductsBySubcategoryAndTags";
import searchProduct from "../controllers/collection/searchProduct";

const router= express.Router();
router.get("/products",readProduct);
router.get("/products/subcategory/:subcategoryId",getProductsBySubcategory);
router.get("/product/subcategory/:subcategoryId/filter",getProductsBySubcategoryAndTags);
router.get("/product/search",searchProduct);