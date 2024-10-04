import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginSuccess, upgradeToPremium } from '../../app/services/auth/authSlice';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  
  // Track whether the premium status is still being updated
  const [isUpdating, setIsUpdating] = useState(true);

  const isPremium = useSelector((state) => state.auth.isPremium);  // Get the premium status from Redux

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8080/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token correctly
          },
        });

        const updatedUser = response.data;

        // Dispatch user data to update Redux store
        dispatch(loginSuccess({ email: updatedUser.email, token }));

        // Update premium status if the user is premium
        if (updatedUser.isPremium) {
          dispatch(upgradeToPremium());
        }

        // After update is complete, stop showing the loading text
        setIsUpdating(false);

      } catch (error) {
        console.error('Error fetching updated user data:', error);
        alert('Error updating premium status.');
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (isUpdating) {
    // Show loading text only while the status is being updated
    return <p>Payment Successful! Your premium status is being updated...</p>;
  }

  return null; // Returning null will remove the text once the premium content is loaded
};

export default PaymentSuccess;
