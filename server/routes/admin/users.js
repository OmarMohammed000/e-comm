import authorizeToken from "../../controllers/admin/authorizeToken.js";
import express from "express";
import getUsers from "../../controllers/admin/getUsers.js";
import deleteUser from "../../controllers/admin/deleteUsers.js";
import createAdmin from "../../controllers/admin/createAdmin.js";
const router = express.Router();

router.get("/users",authorizeToken,getUsers);
router.delete("/users/:id",authorizeToken,deleteUser);
router.post("/users",authorizeToken,createAdmin);


export default router