import User from '../model/User.js';

export const user = async (req, res) => {
  try {
    console.log("mee triggered");  
    console.log("user trig:", req.user);  

    const user = await User.findById(req.user.userId);  

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      isPremium: user.isPremium,
    });

  } catch (error) {
    console.error("Error in /me route:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

