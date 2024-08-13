import db from "../../models/index.js";

async function readSubcategory(req,res) {
    try {
        const subcategories =await db.Subcategory.findAll({ include:db.Category })
        res.status(200).json(subcategories);
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "An error occurred while fetching subcategories" });
    }
}
export default readSubcategory;