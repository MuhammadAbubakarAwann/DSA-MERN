import React from 'react';
import '../../../css/Logout.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../../app/services/auth/authSlice';
import axios from 'axios';
import { showToast } from '../../../app/services/utilities/toastSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(showToast({ type: 'success', message: response.data.message })); 


      setTimeout(() => {

        dispatch(logout());

      }, 3000)
    } catch (error) {
      dispatch(showToast({ type: 'error', message: error.response?.data?.message })); 

    }
  };
  return (
    <div className="logout-container">
      <button className="btn btn-danger logout-button" onClick={handleLogout}>
        <div className="button-content">
          <span className="icon-section">
            <i className='fa fa-power-off'></i>
          </span>
          <span className="text-section">Logout</span>
        </div>
      </button>
    </div>
  );
};

export default Logout;
