
import jwt from 'jsonwebtoken';
import db from '../models/index.js'; 


const JWT_SECRET = process.env.JWT_SECRET;

async function getUserByJwt (req, res)  {
  // Get token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("k")
    // Fetch user from the database using the decoded user ID from the token
    const user = await db.User.findByPk(decoded.id, {
      attributes: ['id', 'email', 'user_name', 'isAdmin','phone','address'] // Only return safe fields
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.json({ user });
  } catch (error) {
    res.status(403).json({ message:error });
  }
};

export default getUserByJwt;
