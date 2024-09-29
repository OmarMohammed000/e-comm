import jwt from 'jsonwebtoken';
import db from '../models/index.js'; 

const JWT_SECRET = process.env.JWT_SECRET;

async function getUser(req, res) {
  // Check if the user is authenticated using JWT or Session

  // 1. First, check for a JWT token in the Authorization header
  if (req.headers['authorization']) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Fetch user from the database using the decoded user ID from the token
      const user = await db.User.findByPk(decoded.id, {
        attributes: ['id', 'email', 'user_name', 'isAdmin', 'phone', 'address'] // Only return safe fields
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user data
      return res.json({ user });
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }

  // 2. If no JWT token, check if the user is authenticated using a session (non-admin users)
  if (req.isAuthenticated && req.isAuthenticated()) {
    try {
      // Fetch the authenticated user from the session
      const user = await db.User.findByPk(req.user.id, {
        attributes: ['id', 'email', 'user_name', 'isAdmin', 'phone', 'address'] // Only return safe fields
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user data
      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching user from session' });
    }
  }

  // If no JWT or session authentication, return unauthorized
  return res.status(401).json({ message: 'Not authenticated' });
}

export default getUser;
