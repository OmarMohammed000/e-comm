import db from "../../models/index.js"

async function deleteCategory(req,res) {
    const id = parseInt(req.params.id);
    try {
        await db.Category.destroy({ // Corrected spelling
            where: {
                id
            }
        });
        res.status(200).json({ message: "Category Deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error); // Optional: Log the error for debugging
        res.status(500).json({ message: "An error occurred while deleting the category" });
    }
}
export default deleteCategory;