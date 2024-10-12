import express from 'express';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import Blacklist from '../model/BlackListToken.js';

const router = express.Router();

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No token or incorrect format");
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token received:", token);

  try {

    const blacklistedToken = await Blacklist.findOne({ token });
    if (blacklistedToken) {
      return sendResponse(res, false, 'You are blacklisted is blacklisted', 403);
    }

    const decoded = jwt.verify(token, "NOTESAPI");
    req.user = decoded;
    console.log("Decoded user:", req.user);
    next();
  } catch (error) {
    console.log("Invalid token or error:", error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


