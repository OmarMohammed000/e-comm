import express from "express";
import isAuthenticated from "../controllers/isAuthenticated.js";
import getOrders from "../controllers/order/getOrders.js";
import addToOrder from "../controllers/order/addToOrder.js";
import deleteFromOrder from "../controllers/order/deleteOrderItem.js";
import createOrder from "../controllers/order/createOrder.js";
const router = express.Router();

router.get("/orders",isAuthenticated,getOrders);
router.post("/orders",isAuthenticated,createOrder);
router.patch("/orders/:orderId",isAuthenticated,addToOrder);
router.delete("/orders/:orderId/remove-product/:productId",isAuthenticated,deleteFromOrder);

export default router;