
import db from "../../models/index.js";

async function updateCategory(req,res) {
    const id = parseInt(req.params.id);
    const {name,details}=req.body;
    if(isNaN(id)){
        return res.status(400).json({message:"Invalid category ID"});
    }
    try {
        const category =await db.Category.findByPk(id);
         // If the category is not found, send a 404 response
         if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update the category's fields
        if (name !== undefined) category.name = name;
        if (details !== undefined) category.details = details;

        // Save the changes to the database
        await category.save();

        // Send a success response with the updated category
        res.json({ message: 'Category updated successfully', category });

    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'An error occurred while updating the category' });
    }
}

export default updateCategory;