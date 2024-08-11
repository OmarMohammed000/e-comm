import express from "express";
import authorizeToken from "../../controllers/admin/authorizeToken.js";
const router = express.Router();

router.post("/admin",authorizeToken,(req,res)=>{
    res.status(200).json({message: "authoriztion grandted"})
})
export default router
