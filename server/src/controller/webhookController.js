import Stripe from 'stripe';
import User from '../model/User.js';  // Import the User model
import dotenv from 'dotenv';

dotenv.config();


const stripe = new Stripe('sk_test_51Q3K7pEQcUe0vNSwD1msBDEqaZq2FvqxeaI7X2A2UcvCcDOhUlDCikojfAuocpZOCM4jPKjs9WnHqlBADeOSCF3X00PXu3dHoI');  // Your Stripe secret key

export const handleStripeWebhook = async (req, res) => {
 
  console.log("*****webhook triggered****")

  const sig = req.headers['stripe-signature'];  // Stripe signature
  console.log("signature:",sig)


  let event;

  try {
    // Use the raw body (req.body) for signature verification
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_yOLvfWNZGgi1V4EWC0KBFutWuwp9F34D');
    console.log('Webhook verified successfully');
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email;
    
    try {
      const user = await User.findOneAndUpdate(
        { email: customerEmail },
        { isPremium: true },
        { new: true }
      );
      
      if (user) {
        console.log(`User ${user.email} upgraded to premium.`);
      } else {
        console.log(`User with email ${customerEmail} not found.`);
      }
    } catch (error) {
      console.error(`Error updating user to premium: ${error.message}`);
    }
  }

  res.json({ received: true });
};