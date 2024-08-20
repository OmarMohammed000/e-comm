async function deleteItem(req, res)  {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        // Find the user's cart
        const cart = await db.Cart.findOne({ where: { user_id: userId } });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find and delete the cart item
        const cartItem = await db.CartItem.findOne({
            where: { cart_id: cart.id, product_id: productId },
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cartItem.destroy();
        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "An error occurred while removing from cart" });
    }
}
export default deleteItem;