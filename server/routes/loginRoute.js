import express from "express";
import loginApp from "../controllers/login.js";
import getUserByJwt from "../controllers/getUserByJWT.js";
const router=express.Router();
// login route
router.get('/user',getUserByJwt);
router.post('/login',loginApp);
export default router