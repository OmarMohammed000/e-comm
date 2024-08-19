import db from "../../models/index.js";

async function getProductsBySubcategoryAndTags (req, res) {
    const { subcategoryId } =parseInt( req.params);
    if(isNaN(subcategoryId)){
        res.status(403).json({message:"Enter a Vaild ID"})
    };
    const { tags } = req.query; 
  
    if (!tags) {
      return res.status(400).json({ message: "Tags are required" });
    }
  
    const tagList = tags.split(','); // Convert the comma-separated string into an array
  
    try {
      const products = await db.Product.findAll({
        where: { subcategory_id: subcategoryId },
        include: [
          {
            model: db.Tag,
            where: { name: tagList },
            attributes: ['id', 'name'],
            through: { attributes: [] } // Exclude the ProductTag join table fields
          }
        ],
        attributes: ['id', 'name', 'price'],
      });
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for this subcategory and tags" });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products by subcategory and tags:", error);
      res.status(500).json({ message: "An error occurred while fetching products" });
    }
  }
export default getProductsBySubcategoryAndTags
