
import dashboardNums from "../../controllers/admin/numberOfeachTable.js";
import express from "express";

const router = express.Router();
// Dashboard route with token authorization middleware

router.get("/dashboard",dashboardNums);

export default router;