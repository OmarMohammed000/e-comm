import db from "../../models/index.js"

async function readCategory(req,res) {
   try {
       const category=await db.Category.findAll();
       return res.status(200).json(category)
   } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "An error occurred while fetching Categories" });
   }
}
export default readCategory