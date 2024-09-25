
import dashboardNums from "../../controllers/admin/numberOfeachTable.js";
import express from "express";

const router = express.Router();
// Dashboard route with token authorization middleware

router.get("/",dashboardNums);

export default router;