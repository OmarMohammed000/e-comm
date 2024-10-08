import db from "../../models/index.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the category and include only the products and images
    const category = await db.Category.findOne({
      where: { id: categoryId },
      include: {
        model: db.Subcategory,
        include: {
          model: db.Product,
          include: {
            model: db.Image,
            attributes: ['image_location'] 
          },
          attributes: ['id', 'title', 'price']
        }
      }
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Extract products from all subcategories in this category
    const products = category.Subcategories.reduce((acc, subcategory) => {
      return acc.concat(subcategory.Products.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        Images: product.Images.map(image => ({
          image_location: image.image_location // Object with image_location field
        })) // Array of image URLs
      })));
    }, []);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error" });
  }
};
