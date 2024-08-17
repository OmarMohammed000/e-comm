import db from "../../models/index.js";

async function readProduct(req,res) {
    try {
        const products =await db.Product.findAll({ include:db.Image })
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching Products:", error);
        res.status(500).json({ message: "An error occurred while fetching Products" });
    }
}
export default readProduct;