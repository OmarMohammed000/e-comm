import db from "../../models/index.js";
export const getCategoryAndSubcategoryByProductId = async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Find the product with its associated subcategories and their categories
      const product = await db.Product.findOne({
        where: { id: productId },
        include: {
          model: db.Subcategory,
          include: {
            model: db.Category,
            attributes: ['name'], // Only return category name
          },
          attributes: ['name'], // Only return subcategory name
        },
        attributes: ['id'] // Only need the product ID for identification
      });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Map over the subcategories to get the category and subcategory names
      const result = product.Subcategories.map(subcategory => ({
        categoryName: subcategory.Category.name,
        subcategoryName: subcategory.name,
      }));
  
      res.status(200).json({ productId, categories: result });
    } catch (error) {
      console.error("Error fetching category and subcategory by product ID:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  