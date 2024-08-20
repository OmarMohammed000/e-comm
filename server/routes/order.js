import express from "express";
import isAuthenticated from "../controllers/isAuthenticated";
import getOrders from "../controllers/order/getOrders";
import addToOrder from "../controllers/order/addToOrder";
import deleteFromOrder from "../controllers/order/deleteOrderItem";
const router = express.Router();

router.get("/previousOrders",isAuthenticated,getOrders);
router.post("/orders/:orderId/add-product",isAuthenticated,addToOrder);
router.delete("/orders/:orderId/remove-product/:productId",isAuthenticated,deleteFromOrder);

export default router;