import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { flipCard, showSignin, showSignup } from '../../app/services/auth/authSlice';
import Signin from './signin/Signin';
import Signup from './signup/Signup';
import '../../css/Auth.css';
import { useDispatch, useSelector } from 'react-redux';


const Auth = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const dispatch = useDispatch();

  const isFlipped = useSelector((state) => state.auth.isFlipped)

  
  useEffect(() => {
    if (location.pathname === '/signup') {
      dispatch(showSignup()) 
    } else {
      dispatch(showSignin()) 
    }
  }, [location.pathname]);

  
  const handleToggle = () => {
    if (isFlipped) {
      navigate('/signin');
    } else {
      navigate('/signup');
    }
    dispatch(flipCard())
  };

  return (
    <div className="auth-wrapper">
      <div className="toggle-handlers">
        <h6 className="labels">
          <span>Log In</span>
          <span>Sign Up</span>
        </h6>
        <div className={`text-${isFlipped ? 'signin' : 'signup'}`} id="auth-toggler">
          <input
            className="checkbox"
            type="checkbox"
            onClick={handleToggle} 
            id="reg-log"
            name="reg-log"
            checked={isFlipped} 
          />
          <label htmlFor="reg-log"></label>
        </div>
      </div>

      <div className="auth-card">
        <div className={`card-container ${isFlipped ? 'flipped' : ''}`}> 
          <div className="front">
            <div className="signin-wrapper">
              <Signin /> 
            </div>
          </div>
          <div className="back">
            <div className="signup-wrapper">
              <Signup /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
