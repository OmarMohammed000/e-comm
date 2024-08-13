import authorizeToken from "../../controllers/admin/authorizeToken.js";
import dashboardNums from "../../controllers/admin/numberOfeachTable.js";
import express from "express";

const router = express.Router();
// Dashboard route with token authorization middleware

router.get("/dashboard",authorizeToken,dashboardNums);

export default router;