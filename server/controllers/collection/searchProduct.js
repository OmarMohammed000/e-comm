import db from "../../models/index.js";
import { Op } from "sequelize";

async function searchProduct(req,res) {
    const { product } = req.query; // 'q' is the search query

    if (!product) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const products = await db.Product.findAll({
            where: {
                // op is opreator 
                [Op.or]: [ 
                    {
                        title: {
                            [Op.like]: `%${product}%`, // Case-insensitive search in title
                        },
                    },
                    {
                        description: {
                            [Op.like]: `%${product}%`, // Case-insensitive search in description
                        },
                    },
                ],
            },
            attributes: ['id', 'title', 'description', 'price'], 
            include: {
                model: db.Image, // Include images
                attributes: ['image_location'], // Select the image_location field from the Image model
              },
        });

        res.status(200).json(products);
    } catch (error) {
        console.error("Error searching for products:", error);
        res.status(500).json({ message: "An error occurred while searching for products" });
    }
}
export default searchProduct;