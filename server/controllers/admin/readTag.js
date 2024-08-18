import db from "../../models/index.js";

async function readTag(req,res){
    try {
        const tags=await db.Tag.findAll()
        res.status(200).json(tags);
    } catch (error) {
        console.error("Error fetching Tags:", error);
        res.status(500).json({ message: "An error occurred while fetching Tags" });
    }
}
export default readTag;