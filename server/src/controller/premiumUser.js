import Stripe from 'stripe';
import User from '../model/User.js'; // Import the User model to use later

const stripe = new Stripe('sk_test_51Q3K7pEQcUe0vNSwD1msBDEqaZq2FvqxeaI7X2A2UcvCcDOhUlDCikojfAuocpZOCM4jPKjs9WnHqlBADeOSCF3X00PXu3dHoI'); // Your secret key

export const premiumUpgrade = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this to see the full request body

    const { email } = req.body; // Extract the email from the request body
    console.log('Email received:', email); // Log the email to see if it's correctly passed

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Premium Subscription',
            },
            unit_amount: 1000, // $10.00 in cents
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
    console.error('Error creating Stripe session:', error); // Log errors
    res.status(500).json({ error: error.message });
  }
};



