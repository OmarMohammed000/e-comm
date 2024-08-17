import db from "../../models/index.js"

async function createCategory(req,res) {
   const {name,details}=req.body;
   try {
        if(!name){
        res.status(400).json({message:"name can not be empty"});
       }
       const category=await db.Category.create({
            name:name,
            details:details,
       })
       res.status(201).json({message:await db.Category.findAll()})
   } catch (error) {
        console.error("Error creating Category:", error);
        res.status(500).json({ message: "An error occurred while creating the Category" });
   }
  
}
export default createCategory;