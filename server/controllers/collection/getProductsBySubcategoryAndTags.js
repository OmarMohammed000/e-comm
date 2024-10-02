import { Op } from "sequelize";
import db from "../../models/index.js";

async function getProductsBySubcategoryAndTags (req, res) {
    const  subcategoryId  =parseInt( req.params.subcategoryId);
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
        where: {
          [Op.and]: [
            { '$Subcategories.id$': subcategoryId },
            { '$Tags.tag_name$': { [Op.in]: tagList } } 
          ],
        },
        include: [
          {
            model: db.Subcategory,
            through: { attributes: [] },
            attributes: [], 
          },
          {
            model: db.Tag,
            through: { attributes: [] },
            attributes: [],
          },
          {
            model: db.Image, 
            attributes: ['image_location'],
          },
        ],
        attributes: ['id', 'title', 'price'],
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
