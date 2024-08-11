import jwt from "jsonwebtoken";
import db from "../models/index.js";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

async function logout(req,res,next) {
    const {refreshToken}=req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }
    
      try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const user = await db.User.findByPk(decoded.id);
    
        if (user) {
          // Invalidate the refresh token in the database
          await user.update({ refreshToken: null });
    
          // Use Passport's logout function to end the session
          req.logout((err) => {
            if (err) {
              return next(err); // Handle the error
            }
    
            // Successfully logged out
            res.json({ message: "Logged out successfully" });
          });
        } else {
          // If the user does not exist, return a success response to avoid exposing information
          res.json({ message: "Logged out successfully" });
        }
      } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
}
export default logout;