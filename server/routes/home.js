import express from "express";
import getCategoriesWithSubcategories from "../controllers/getCategoriesWithSubcategories.js";
import readProduct from "../controllers/admin/readProduct.js";

const router = express.Router();

router.get("/",getCategoriesWithSubcategories);

export default router;