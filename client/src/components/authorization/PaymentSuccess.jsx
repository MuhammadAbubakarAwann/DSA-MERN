import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginSuccess, upgradeToPremium } from '../../app/services/auth/authSlice';
import { showToast } from '../../app/services/utilities/toastSlice';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  
  const [isUpdating, setIsUpdating] = useState(true);

  const isPremium = useSelector((state) => state.auth.isPremium); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8080/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        const updatedUser = response.data;

        dispatch(loginSuccess({ email: updatedUser.email, token }));
        dispatch(showToast({ type: 'success', message:"Payment Successfull" })); 
        setTimeout(() => {
        dispatch(showToast({ type: 'success', message:"Updraged to premium" })); 
          
        }, 3000)


        if (updatedUser.isPremium) {
          dispatch(upgradeToPremium());
        }
        setIsUpdating(false);

      } catch (error) {
        console.error('Error fetching updated user data:', error);
        alert('Error updating premium status.');
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (isUpdating) {

    return <p>Payment Successful! Your premium status is being updated...</p>;
  }

  return null; 
};

export default PaymentSuccess;
