import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showSignin } from '../../../app/services/auth/authSlice';
import { showToast } from '../../../app/services/utilities/toastSlice';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/auth/signup', { name, email, password })
      .then(result => {
        console.log(result.data);
        dispatch(showToast({ type: 'success', message: result.data.message }));

        dispatch(showSignin());
        setName('');
        setEmail('')
        setPassword('');
      })
      .catch(err => {
        dispatch(showToast({ type: 'warning', message: err.response?.data?.message || "signup failed, try again" }));

      });
  };

  return (
    <div className="signUp-card">
      <h4>Sign up</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-style" placeholder="Your Full Name" autoComplete="off" onChange={(e) => setName(e.target.value)} />
          <i className="input-icon fa-solid fa-user"></i>
        </div>
        <div className="form-group">
          <input type="email" className="form-style" placeholder="Your Email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
          <i className="input-icon fas fa-at"></i>
        </div>
        <div className="form-group">
          <input type="password" className="form-style" placeholder="Your Password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
          <i className="input-icon fas fa-lock"></i>
        </div>
      </form>
      <button onClick={handleSubmit} className="btn">Register</button>

    </div>
  );
};

export default Signup;
