import db from "../../models/index.js";
import { saveCartToLocalStorage } from "./localCartStorage.js";

async function addItem(req,res) {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message: "User not authenticated" });
    }
    const { productId, quantity } = req.body;
    const userId = req.user.id; 
    try {
        // Find or create a cart for the user
        let cart = await db.Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            cart = await db.Cart.create({ user_id: userId });
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
            await db.CartItem.create({
                cart_id: cart.id,
                product_id: productId,
                quantity: quantity,
            });
        }
        // Retrieve the updated cart with its items
        const updatedCart = await db.Cart.findOne({
            where: { user_id: userId },
            include: [{ model: db.CartItem, include: [db.Product] }]
        });

        // Convert cart to plain object
        const plainCart = updatedCart.get({ plain: true });

        // Save the updated cart to localStorage
        saveCartToLocalStorage(plainCart);


        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "An error occurred while adding to cart" });
    }
}
export default addItem