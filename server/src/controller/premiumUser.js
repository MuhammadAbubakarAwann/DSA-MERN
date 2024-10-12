import Stripe from 'stripe';
import User from '../model/User.js';

const stripe = new Stripe('sk_test_51Q3K7pEQcUe0vNSwD1msBDEqaZq2FvqxeaI7X2A2UcvCcDOhUlDCikojfAuocpZOCM4jPKjs9WnHqlBADeOSCF3X00PXu3dHoI'); // Your secret key

export const premiumUpgrade = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { email } = req.body;
    console.log('Email received:', email);

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Premium Subscription',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment-success',
      cancel_url: 'http://localhost:3000/payment-cancel',
      customer_email: email,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
};



