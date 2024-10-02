
import dashboardNums from "../../controllers/admin/numberOfeachTable.js";
import express from "express";

const router = express.Router();

router.get("/",dashboardNums);

export default router;