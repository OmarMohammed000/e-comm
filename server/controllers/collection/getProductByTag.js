
import db from "../../models/index.js";

async function getProductByTag(req, res) {
  const { tags} = req.query;

  if (!tags) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  try {
    const products = await db.Product.findAll({
      include: [
        {
          model: db.Tag,
          through: { attributes: [] },
          where: {
            tag_name: tags, // Filter by the provided tag name
          },
          attributes: [], // No need to return tag data
        },
        {
          model: db.Image, // Include images for each product
          attributes: ['image_location'],
        },
      ],
      attributes: ['id', 'title', 'price'],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this tag" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by tag:", error);
    return res.status(500).json({ message: "An error occurred while fetching products" });
  }
}

export default getProductByTag;
