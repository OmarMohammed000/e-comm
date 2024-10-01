import db from "../../models/index.js";
async function addProductToSubcategory(req, res)  {
    const { productId, subcategoryId } = req.body;
    
  
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
  
      // Add the product to the subcategory
      await db.ProductSubcategory.create({
        product_id: productId,
        subcategory_id: subcategoryId,
      });
  
      res.status(201).json({ message: "Product added to subcategory successfully" });
    } catch (error) {
      console.error("Error adding product to subcategory:", error);
      res.status(500).json({ message: "An error occurred while adding the product to the subcategory" });
    }
  };
  
  export default addProductToSubcategory;