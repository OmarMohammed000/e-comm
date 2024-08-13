import express from "express";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import dashboard from "./dashboard.js"
import db from "../../models/index.js"
import category from "./categories.js"

const router = express.Router();

router.use("/admin",dashboard);
router.use("/admin",category);
router.post("/admin",authorizeToken,(req,res)=>{
    const user=req.user;
    res.status(200).json({message: "authoriztion grandted",user});
})




export default router
