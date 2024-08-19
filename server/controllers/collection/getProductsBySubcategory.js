import db from "../../models/index.js";
async function getProductsBySubcategory (req, res)  {
    const { subcategoryId } = parseInt(req.params);
    if(isNaN(subcategoryId)){
        res.status(403).json({message:"Enter a Vaild ID"})
    }
    try {
      const subcategory = await db.Subcategory.findByPk(subcategoryId, {
        include: {
          model: db.Product,
          attributes: ['id', 'name', 'price'], // Select specific fields from Product
        },
        attributes: ['id', 'name'], // Select specific fields from Subcategory
      });
  
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
  
      res.status(200).json(subcategory.Products);
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
      res.status(500).json({ message: "An error occurred while fetching products" });
    }
  }
export default getProductsBySubcategory;