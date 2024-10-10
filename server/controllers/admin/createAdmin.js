import db from "../../models/index.js";
import bcrypt from "bcryptjs";
async function createAdmin(req,res) {
    const {userName,password,email,isAdmin}=req.body;

    try {
        if(!userName || !password || !email || isAdmin == null ){
            res.status(400).json({message:"User Name , Password , Email and admin property is required"});
        }
        // hashing passowrd put not giving it away
        const hashedPassword = await bcrypt.hash(password, 4);
         await db.User.create({
            user_name:userName,
            password:hashedPassword,
            email:email,
            isAdmin:isAdmin,
        });
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating User:", error);
        res.status(500).json({ message: "An error occurred while creating the User" });
    
    }
}
export default createAdmin;