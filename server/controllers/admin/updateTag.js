import db from "../../models/index.js";

async function updateTag(req,res) {
    const id=parseInt( req.params.id);
    const {tag_name}=req.body;
    console.log(id);
    if(isNaN(id)){
        return res.status(400).json({message:"Invalid Tag ID"});
    }
    try {
        if(!tag_name){
            return res.status(400).json({ message: "Tag name is required" });
        }
        const tag =await db.Tag.findByPk(id);
        
         if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
         tag.tag_name = tag_name;
        await tag.save();
        res.json({ message: 'Tag updated successfully', tag });

    } catch (error) {
        console.error('Error updating Tag:', error);
        res.status(500).json({ message: 'An error occurred while updating the tag' });
    }
}
export default updateTag;