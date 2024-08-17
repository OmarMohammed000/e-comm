import express from "express";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import dashboard from "./dashboard.js";
import category from "./categories.js";
import subcategory from "./subcatogry.js";
import users from "./users.js";
import product from "./product.js"

const router = express.Router();
router.use("/admin",subcategory)
router.use("/admin",dashboard);
router.use("/admin",category);
router.use("/admin",users);
router.use("/admin",product);

router.post("/admin",authorizeToken,(req,res)=>{
    const user=req.user;
    res.status(200).json({message: "authoriztion grandted",user});
})




export default router
