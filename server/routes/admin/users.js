import express from "express";
import getUsers from "../../controllers/admin/getUsers.js";
import deleteUser from "../../controllers/admin/deleteUsers.js";
import createAdmin from "../../controllers/admin/createAdmin.js";
const router = express.Router();

router.get("/",getUsers);
router.delete("/:id",deleteUser);
router.post("/",createAdmin);


export default router