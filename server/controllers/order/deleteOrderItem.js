import db from "../../models/index.js";

// Route to add a product to an order
async function deleteFromOrder(req, res) {
  const { orderId, productId } = req.params;

  try {
    // Find the order and ensure it belongs to the logged-in user
    const order = await db.Order.findOne({
      where: {
        id: orderId,
        user_id: req.user.id, // Ensure the order belongs to the logged-in user
      },
    });

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found or you do not have permission to modify this order.",
      });
    }

    // Check if the order is within the 30-minute modification window
    const currentTime = new Date();
    const orderTime = new Date(order.time_of_order);
    const timeDifference = (currentTime - orderTime) / (1000 * 60); // Time difference in minutes

    if (timeDifference > 30) {
      return res.status(403).json({
        message:
          "You cannot modify this order as it was placed more than 30 minutes ago.",
      });
    }

    // Add the product to the order
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
