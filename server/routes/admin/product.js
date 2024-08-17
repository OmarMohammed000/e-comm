import express from "express";
import path, { dirname } from "path";
import multer from "multer";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import createProduct from "../../controllers/admin/createProduct.js";
import { fileURLToPath } from "url";
import readProduct from "../../controllers/admin/readProduct.js";
import updateProductAndImages from "../../controllers/admin/updateProduct.js";
import deleteProduct from "../../controllers/admin/deleteProduct.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../images"));
    },
    filename: (req, file, cb) => {
      const filename= new Date().toISOString().replace(/:/g, '-') + '-'+  file.originalname 
      cb(null, filename);
      req.filename=filename;
    },
  });
const upload = multer({storage}).array('images',5);
router.get("/products",authorizeToken,readProduct);
router.post("/products",authorizeToken,upload,createProduct);
router.patch("/products/:id",authorizeToken,upload,updateProductAndImages);
router.delete("/products/:id",authorizeToken,deleteProduct)
export default router;
