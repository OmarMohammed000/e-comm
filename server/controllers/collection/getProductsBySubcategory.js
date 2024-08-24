import db from "../../models/index.js";
async function getProductsBySubcategory (req, res)  {
    const  subcategoryId = parseInt(req.params.subcategoryId);
    console.log(subcategoryId);
    if(isNaN(subcategoryId)){
      return  res.status(403).json({message:"Enter a Vaild ID"})
    }
    try {
      const subcategory = await db.Subcategory.findByPk(subcategoryId, {
        include: {
          model: db.Product,
          attributes: ['id', 'title', 'price'], // Select specific fields from Product
        },
        attributes: ['id', 'name'], // Select specific fields from Subcategory
      });
  
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
  
      return res.status(200).json(subcategory.Products);
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
      return res.status(500).json({ message: "An error occurred while fetching products" });
    }
  }
export default getProductsBySubcategory;