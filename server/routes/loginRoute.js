import express from "express";
import loginApp from "../controllers/login.js";
import getUser from "../controllers/getUser.js";
const router=express.Router();
// login route
router.get('/user',getUser);
router.post('/login',loginApp);
export default router