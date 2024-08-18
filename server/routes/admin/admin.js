import express from "express";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import dashboard from "./dashboard.js";
import category from "./categories.js";
import subcategory from "./subcatogry.js";
import users from "./users.js";
import product from "./product.js"
import tag from "./tag.js";

const router = express.Router();
router.use("/admin",authorizeToken,subcategory)
router.use("/admin",authorizeToken,dashboard);
router.use("/admin",authorizeToken,category);
router.use("/admin",authorizeToken,users);
router.use("/admin",authorizeToken,product);
router.use("/admin",authorizeToken,tag)

router.post("/admin",authorizeToken,(req,res)=>{
    const user=req.user;
    res.status(200).json({message: "authoriztion grandted",user});
})




export default router
