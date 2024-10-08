import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token from Bearer header
  const token = authHeader.split(' ')[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};