import express from "express";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import dashboard from "./dashboard.js";
import category from "./categories.js";
import subcategory from "./subcatogry.js";
import users from "./users.js";
import product from "./product.js"
import tag from "./tag.js";

const router = express.Router();
router.use("/admin/subcategories", authorizeToken, subcategory);
router.use("/admin/dashboard", authorizeToken, dashboard);
router.use("/admin/categories", authorizeToken, category);
router.use("/admin/users", authorizeToken, users);
router.use("/admin/products", authorizeToken, product);
router.use("/admin",tag)

router.post("/admin",authorizeToken,(req,res)=>{
    const user=req.user;
    res.status(200).json({message: "authoriztion grandted",user});
})




export default router
