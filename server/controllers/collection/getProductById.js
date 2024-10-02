import db from "../../models/index.js"
export const getProductById = async (req, res) => {
  const  id = parseInt(req.params.productId);
  if(isNaN(id)){  
    return  res.status(403).json({message:"Enter a Vaild ID"})
  }
  try {
  
    console.log("correct route")
    const product = await db.Product.findByPk(id, {
      include: [
        {
          model: db.Image,
          attributes: ['id', 'image_location'], 
        },
      ],
    });

   
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};