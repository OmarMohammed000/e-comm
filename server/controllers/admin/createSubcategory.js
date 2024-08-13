import db from "../../models/index.js";

async function createSubcategory(req,res) {
    const {name,categoryId}=req.body;
    try {
        if(!name || !categoryId){
            res.status(400).json({message:"Name and category ID is required"});
        }
        const subcategory= await db.Subcategory.create({
            name:name,
            category_id:categoryId,
        })
        res.status(201).json({ message: "Subcategory created successfully", subcategory });
    } catch (error) {
        console.error("Error creating subcategory:", error);
        res.status(500).json({ message: "An error occurred while creating the subcategory" });
    
    }
}
export default createSubcategory;