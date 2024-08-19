import db from "../models/index.js";

async function getCategoriesWithSubcategories(req, res) {
    try {
        const categories = await db.Category.findAll({
            include: {
                model: db.Subcategory,
                attributes: ['id', 'name'],
            },
            attributes: ['id', 'name'],
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
        res.status(500).json({ message: "An error occurred while fetching categories" });
    }
}
export default getCategoriesWithSubcategories;