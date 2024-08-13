import db from "../../models/index.js"
import readCategory from "./readCategory.js";
async function createCategory(req,res) {
   const {name,details}=req.body;
   if(!name){
    res.status(400).json({message:"name can not be empty"});
   }
   await db.Category.create({
        name:name,
        details:details,
   })
   res.json({message:await db.Category.findAll()})
}
export default createCategory;