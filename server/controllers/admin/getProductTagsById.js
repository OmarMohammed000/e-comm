import db from "../../models/index.js";
const getProductTagsById = async (req, res) => {
  const productId = parseInt(req.params.productid);
 
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  try {
    const product = await db.Product.findByPk(productId, {
      include: {
        model: db.Tag,
        through: {
          attributes: [],
        },
        attributes: ["tag_id", "tag_name"],
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      productId: product.id,
      productTitle: product.title,
      tags: product.Tags,
    });
  } catch (error) {
    console.error("Error fetching product tags: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getProductTagsById;
