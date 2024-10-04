import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster, toast } from 'sonner';
import { hideToast } from '../app/services/utilities/toastSlice';

const GlobalToaster = () => {
  const { type, message } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type && message) {
      toast[type](message);

      setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
    }
  }, [type, message, dispatch]);

  return (
    <Toaster
      richColors
      position="bottom-center"
      toastOptions={{
        style: {
          marginBottom: '-20px',
          marginLeft: '-25px'  // Adjust this value to move it closer to the bottom
        },
      }}
    />
  );
};

export default GlobalToaster;
