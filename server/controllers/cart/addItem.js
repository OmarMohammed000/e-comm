import { where } from "sequelize";
import db from "../../models/index.js";


async function addItem(req,res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id; 
    if(!productId || !quantity || quantity ===0){
        return res.status(403).json({
            message:" invaild product Id or quantity"
        })
    }
    try {
        // Find or create a cart for the user
        let cart = await db.Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            cart = await db.Cart.create({ user_id: userId });
        }
        
        // Check if the product exists
        const product = await db.Product.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(403).json({ message: "Product not found" });
        }
        
        // Find or create the cart item
        let cartItem = await db.CartItem.findOne({
            where: { cart_id: cart.id, product_id: productId },
        });

        if (cartItem) {
            // Update quantity if the item already exists
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Add new item to cart
            cartItem = await db.CartItem.create({
                cart_id: cart.id,
                product_id: productId,
                quantity: quantity,
            });
        }

        // Fetch the updated cart item including the product details
        const updatedCartItem = await db.CartItem.findOne({
            where: { id: cartItem.id },
            include: [{ model: db.Product }] // Include the Product model
        });

        res.status(200).json(updatedCartItem); // Return the updated cart item with product details

    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "An error occurred while adding to cart" });
    }
}
export default addItem