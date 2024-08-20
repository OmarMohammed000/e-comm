import express from "express";
import isAuthenticated from "../controllers/isAuthenticated";
import getCart from "../controllers/cart/getCart";
import addItem from "../controllers/cart/addItem";
import deleteItem from "../controllers/cart/deleteItem";

const router = express.Router();
router.get("/cart",isAuthenticated,getCart);
router.post("/cart",isAuthenticated,addItem);
router.delete("/cart",isAuthenticated,deleteItem);