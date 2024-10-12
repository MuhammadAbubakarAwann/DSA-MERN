import express from 'express'

import * as authController from '../controller/authController.js';
import { protect } from '../middleware/protect.js';
import { user } from '../controller/userController.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.post('/logout', protect, authController.logout);


router.get('/me', protect, user)



export default router;



