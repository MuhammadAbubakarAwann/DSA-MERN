// Assuming you are using some kind of authentication middleware (e.g., JWT)

import express from 'express';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';  // Import jsonwebtoken


const router = express.Router();

// Middleware to protect routes (ensure user is authenticated)
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No token or incorrect format");
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];  // Extract token
  console.log("Token received:", token); // Debug log to check if the token is received

  try {
    const decoded = jwt.verify(token, "NOTESAPI");  // Use your secret key here
    req.user = decoded;  // Store decoded token data (e.g., user id, email) in request
    console.log("Decoded user:", req.user); // Log the decoded token payload
    next();
  } catch (error) {
    console.log("Invalid token or error:", error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


