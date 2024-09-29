import db from "../../models/index.js"
async function ChangeItemCount(req, res) {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    // Find the user's cart
    let cart = await db.Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the cart item
    let cartItem = await db.CartItem.findOne({
      where: { cart_id: cart.id, product_id: productId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();
    
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error});
  }
}
export default ChangeItemCount;