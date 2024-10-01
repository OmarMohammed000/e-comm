import db from "../../models/index.js";
export const getCategoryAndSubcategoryByProductId = async (req, res) => {
    try {
      const { productId } = req.params;
  
     
      const product = await db.Product.findOne({
        where: { id: productId },
        include: {
          model: db.Subcategory,
          include: {
            model: db.Category,
            attributes: ['name','id'],
          },
          attributes: ['name','id'], 
        },
        attributes: ['id']
      });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      
      const result = product.Subcategories.map(subcategory => ({
        categoryName: subcategory.Category.name,
        categoryId: subcategory.Category.id,
        subcategoryName: subcategory.name,
        subcategoryId: subcategory.id,
      }));
  
      res.status(200).json({ productId, categories: result });
    } catch (error) {
      console.error("Error fetching category and subcategory by product ID:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  