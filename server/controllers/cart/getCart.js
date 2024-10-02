import db from "../../models/index.js";

async function getCart(req, res) {
  const userId = req.user.id; // Assuming `req.user` contains the logged-in user's info

  try {
    // Find the user's cart and include the associated cart items and products
    const cart = await db.Cart.findOne({
      where: { user_id: userId },
      include: [
        {
          model: db.CartItem,
          include: [
            {
              model: db.Product,
              include: [
                {
                  model: db.Image, 
                  attributes: ['id', 'image_location'], 
                },
              ],
            },
          ],
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Calculate the total price
    let totalPrice = 0;
    cart.CartItems.forEach((cartItem) => {
      totalPrice += cartItem.quantity * cartItem.Product.price;
    });

    res.status(200).json({
      cartItems: cart.CartItems,
      totalPrice: totalPrice.toFixed(2), 
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the cart" });
  }
}

export default getCart;
