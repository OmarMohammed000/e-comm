import db from "../../models/index.js"

async function readCategory(req,res) {
    const category=await db.Category.findAll();
    return res.json(category)
}
export default readCategory