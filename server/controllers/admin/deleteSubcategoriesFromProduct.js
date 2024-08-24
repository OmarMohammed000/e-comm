import db from "../../models/index.js";

async function removeProductFromSubcategory (req, res)  {
  const { productId, subcategoryId } = req.body;
  console.log(productId)
  try {
    // Check if the product exists
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the subcategory exists
    const subcategory = await db.Subcategory.findByPk(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Check if the relationship exists
    const productSubcategory = await db.ProductSubcategory.findOne({
      where: {
        product_id: productId,
        subcategory_id: subcategoryId,
      },
    });

    if (!productSubcategory) {
      return res.status(404).json({ message: "Product is not in the specified subcategory" });
    }

    // Remove the product from the subcategory
    await productSubcategory.destroy();

    res.status(200).json({ message: "Product removed from subcategory successfully" });
  } catch (error) {
    console.error("Error removing product from subcategory:", error);
    res.status(500).json({ message: "An error occurred while removing the product from the subcategory" });
  }
};

export default removeProductFromSubcategory;
