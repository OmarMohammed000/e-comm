import express from "express";
import getCategoriesWithSubcategories from "../controllers/getCategoriesWithSubcategories.js";


const router = express.Router();

router.get("/",getCategoriesWithSubcategories);

export default router;