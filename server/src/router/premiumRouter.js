import express from 'express';
import { premiumUpgrade } from '../controller/premiumUser.js';
import { handleStripeWebhook } from '../controller/webhookController.js';

const router = express.Router();

// Create checkout session route uses express.json()
router.post('/create-checkout-session', premiumUpgrade);

// Webhook route uses express.raw() middleware for the raw body
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
