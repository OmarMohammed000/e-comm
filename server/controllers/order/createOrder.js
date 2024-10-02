import db from "../../models/index.js";
import getCart from "../cart/getCart.js";
async function createOrder(req, res) {
    const { to_address, to_city } = req.body; 
    const userId = req.user.id;
    const{items}= req.body // items: [{ product_id, quantity }] what the get cart returns
    console.log(items)
    if (!items || !items.length) {
        return res.status(400).json({ message: "No items to order" });
    }

    try {
       
        const order = await db.Order.create({
            user_id: userId,
            time_of_order: new Date(),
            to_address: to_address,
            to_city: to_city,
        });

       
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
        }));

        await db.OrderItem.bulkCreate(orderItems);

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "An error occurred while creating the order" });
    }
}

export default createOrder;
