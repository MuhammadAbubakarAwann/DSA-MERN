import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { loginSuccess, upgradeToPremium } from '../../app/services/auth/authSlice';

const stripePromise = loadStripe('pk_test_51Q3K7pEQcUe0vNSwtVEOFWzkisc8NqDCyBoz3u8JLCXsI4iOvUgZ4rCtqEX65rFbM69K1HpUmY58leUAcdIXw1yp00G7HNTt5w');

const PremiumUpgrade = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);

  const handlePaymentClick = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await axios.post('http://localhost:8080/api/premium/create-checkout-session', {
        email: userEmail,
      });
  
      const { sessionId } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId });
  
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <button onClick={handlePaymentClick} className="btn btn-success" disabled={loading}>
        {loading ? 'Processing...' : 'Upgrade Now'}
      </button>
    </div>
  );
};

export default PremiumUpgrade;
