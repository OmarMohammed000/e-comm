import { where } from "sequelize";
import db from "../../models/index.js";
import { saveCartToLocalStorage } from "./localCartStorage.js";

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
        if( !await db.Product.findOne({where:{id: productId}})){
            res.status(403).json({message:"Product not found"})
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
        // UNCOMMENT IN PRODUCTION
        // Retrieve the updated cart with its items
        // const updatedCart = await db.Cart.findOne({
        //     where: { user_id: userId },
        //     include: [{ model: db.CartItem, include: [db.Product] }]
        // });

        // // Convert cart to plain object
        // const plainCart = updatedCart.get({ plain: true });

        // // Save the updated cart to localStorage
        // saveCartToLocalStorage(plainCart);


        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "An error occurred while adding to cart" });
    }
}
export default addItem