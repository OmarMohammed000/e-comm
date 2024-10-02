import db from "../../models/index.js";

async function updateSubcategory(req,res) {
    const id =parseInt( req.params.id);
    const {name,categoryId}=req.body
    if(isNaN(id)){
        return res.status(400).json({message:"Invalid subcategory ID"});
    }
    try {
        const subcategory =await db.Subcategory.findByPk(id);
        
        if (!subcategory) {
           return res.status(404).json({ message: 'Category not found' });
       }
        if (name !== undefined) subcategory.name = name;
        if (categoryId !== undefined) subcategory.category_id = categoryId;

      
        await subcategory.save();

      
       res.status(201).json({ message: 'Subcategory updated successfully', subcategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'An error occurred while updating the category' });
    }
}
export default updateSubcategory;