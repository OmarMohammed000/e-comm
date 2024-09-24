import db from "../../models/index.js"
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
              attributes: ['image_location'] // Only return image location
            },
            attributes: ['id', 'title', 'price'] // Only return product fields
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
          name: product.name,
          price: product.price,
          images: product.Images.map(image => image.image_location)
        })));
      }, []);
  
      res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  