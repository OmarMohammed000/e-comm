import express from "express";
import isAuthenticated from "../controllers/isAuthenticated.js";
import getCart from "../controllers/cart/getCart.js";
import addItem from "../controllers/cart/addItem.js";
import deleteItem from "../controllers/cart/deleteItem.js";
import changeItemCount from "../controllers/cart/changeItemCount.js";

const router = express.Router();
router.get("/cart",isAuthenticated,getCart);
router.patch("/cart",isAuthenticated,changeItemCount);
router.post("/cart",isAuthenticated,addItem);
router.delete("/cart",isAuthenticated,deleteItem);
export default router