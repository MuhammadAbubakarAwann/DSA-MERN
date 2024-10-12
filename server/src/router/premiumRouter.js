import express from 'express';
import { premiumUpgrade } from '../controller/premiumUser.js';
import { handleStripeWebhook } from '../controller/webhookController.js';

const router = express.Router();

router.post('/create-checkout-session', premiumUpgrade);
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
