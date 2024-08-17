import  db from "../../models/index.js";

async function getUsers(req,res){
    try {
        const users= await db.User.findAll({
            attributes:["id","user_name","email","isAdmin"]
        })
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "An error occurred while fetching Users" });
    }
} 
export default getUsers