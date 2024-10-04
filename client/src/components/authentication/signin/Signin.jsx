// src/components/signin/Signin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../app/services/auth/authSlice';
import { showToast } from '../../../app/services/utilities/toastSlice';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogInClick = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/auth/signin', { email, password })
      .then(result => {
        dispatch(showToast({ type: 'success', message: result.data.message })); 

        const { token } = result.data.token;
        setEmail('');
        setPassword('');
        setTimeout(() => {
          dispatch(loginSuccess({
            token: result.data.token,
            email: result.data.data.user.email,
            isPremium: result.data.data.user.isPremium
          }));


          navigate('/');
        }, 3000); 

      })
      .catch(err => {
        dispatch(showToast({ type: 'warning', message: err.response?.data?.message || "Login failed, try again" })); // Dispatch error toast
      });
  };

  return (
    <div className='signIn-card'>
      <h4>Log In</h4>
      <form action="">
        <div className='form-group'>
          <input
            type="email"
            className='form-style'
            placeholder='Your Email'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="input-icon fas fa-at"></i>
        </div>
        <div className='form-group'>
          <input
            type="password"
            className='form-style'
            placeholder='Your Password'
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="input-icon fas fa-lock"></i>
        </div>
      </form>

      <button type="submit" className="btn" onClick={handleLogInClick}>Login</button>
      <h6>Forgot Your Password?</h6>
    </div>
  );
};

export default Signin;
