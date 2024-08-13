import db from "../../models/index.js";

async function deleteSubcategory(req,res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    try {
        const result = await db.Subcategory.destroy({ where: { id } });
        if (result === 0) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        res.status(500).json({ message: "An error occurred while deleting the subcategory" });
    }
}
export default deleteSubcategory;