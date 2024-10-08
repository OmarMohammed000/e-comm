import db from "../../models/index.js";
async function getOrders(req, res) {
  const  userId  = req.user.id;

  try {
    const orders = await db.Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: db.OrderItem,
          include: [
            {
              model: db.Product,
              attributes: ["id", "title"], 
            },
          ],
          attributes: ["id", "product_id","quantity"], 
        },
      ],
      attributes: ["id", "time_of_order", "to_address", "to_city"], 
      order: [["time_of_order", "DESC"]], 
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching orders" });
  }
}
export default getOrders;