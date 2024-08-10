import express from "express";
import loginApp from "../controllers/login.js";
const router=express.Router();
// login route

router.post('/login',loginApp);
export default router