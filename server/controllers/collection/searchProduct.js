import db from "../../models";

async function searchProduct(req,res) {
    const { q } = req.query; // 'q' is the search query

    if (!q) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const products = await db.Product.findAll({
            where: {
                // op is opreator 
                [Op.or]: [ 
                    {
                        title: {
                            [Op.like]: `%${q}%`, // Case-insensitive search in title
                        },
                    },
                    {
                        description: {
                            [Op.like]: `%${q}%`, // Case-insensitive search in description
                        },
                    },
                ],
            },
            attributes: ['id', 'title', 'description', 'price'], 
        });

        res.status(200).json(products);
    } catch (error) {
        console.error("Error searching for products:", error);
        res.status(500).json({ message: "An error occurred while searching for products" });
    }
}
export default searchProduct;