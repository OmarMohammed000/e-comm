import express from "express";

import createProduct from "../../controllers/admin/createProduct.js";
import upload from "../../controllers/admin/multer.js";
import readProduct from "../../controllers/admin/readProduct.js";
import updateProductAndImages from "../../controllers/admin/updateProduct.js";
import deleteProduct from "../../controllers/admin/deleteProduct.js";

const router = express.Router();
('images',5);
router.get("/products",readProduct);
router.post("/products",upload,createProduct);
router.patch("/products/:id",upload,updateProductAndImages);
router.delete("/products/:id",deleteProduct)
export default router;
