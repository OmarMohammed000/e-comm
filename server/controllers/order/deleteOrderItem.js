import db from "../../models/index.js";

// Route to add a product to an order
async function deleteFromOrder(req, res) {
  const { orderId, productId } = req.params;

  try {
   
    const order = await db.Order.findOne({
      where: {
        id: orderId,
        user_id: req.user.id,
      },
    });

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found or you do not have permission to modify this order.",
      });
    }

    
    const currentTime = new Date();
    const orderTime = new Date(order.time_of_order);
    const timeDifference = (currentTime - orderTime) / (1000 * 60); 

    if (timeDifference > 30) {
      return res.status(403).json({
        message:
          "You cannot modify this order as it was placed more than 30 minutes ago.",
      });
    }

   
    const orderItem = await db.OrderItem.destroy({
      where: {
        order_id: orderId,
        product_id: productId,
      },
    });

    res.status(201).json({ message: "Product Deleted from order", orderItem });
  } catch (error) {
    console.error("Error Deleting product from order:", error);
    res.status(500).json({
      message: "An error occurred while Deleting the product from the order",
    });
  }
}

export default deleteFromOrder;
