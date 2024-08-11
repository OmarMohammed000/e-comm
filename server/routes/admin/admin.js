import express from "express";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
import db from "../../models/index.js"

const router = express.Router();

router.post("/admin",authorizeToken,(req,res)=>{
    const user=req.user;
    
  
    res.status(200).json({message: "authoriztion grandted",user})
})


export default router
