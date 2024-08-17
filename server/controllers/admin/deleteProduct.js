import { where } from "sequelize";
import db from "../../models/index.js";

async function deleteProduct(req,res){
    const id = req.params.id;
    
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }
    try {
        await db.Product.destroy({where : {id}});
        await db.Image.destroy({where:{
            productId:id
        }})
        res.status(201).json({message:"Product deleted succesfully"});
    } catch (error) {
        console.error("Error deleting Produc:", error);
        res.status(500).json({ message: "An error occurred while deleting the Product" });
    }
}

export default deleteProduct