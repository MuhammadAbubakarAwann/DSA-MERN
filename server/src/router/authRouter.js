import express from 'express'
import * as authController from '../controller/authController.js';
import User from '../model/User.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.get('/me', protect, async (req, res) => {
  try {
    console.log("mee triggered");  // Debugging log to confirm route is hit
    console.log("user trig:", req.user);  // Log decoded JWT payload

    // Find user using the `userId` from the JWT
    const user = await User.findById(req.user.userId);  // Use userId from decoded JWT

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return email and isPremium
    res.json({
      email: user.email,
      isPremium: user.isPremium,
    });

   
    
  } catch (error) {
    console.error("Error in /me route:", error);
    res.status(500).json({ message: 'Server error' });
  }
});




export default router;



