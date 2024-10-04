import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFlipped: false,
  token: null,
  isAuthenticated: false,
  isPremium: false,
  email: null, 
};

const persistedToken = localStorage.getItem('token');
const persistedEmail = localStorage.getItem('email');
const persistedIsPremium = localStorage.getItem('isPremium') === 'true';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    token: persistedToken || null,
    email: persistedEmail || null,
    isPremium: persistedIsPremium || false,
    isAuthenticated: !!persistedToken,  // If there's a token, the user is authenticated
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.isPremium = action.payload.isPremium || false; // Set isPremium from the payload
    
      // Save token, email, and isPremium to localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('isPremium', action.payload.isPremium ? 'true' : 'false'); // Persist isPremium
    
      const tokenExpiration = new Date().getTime() + action.payload.expiresIn * 1000;
      localStorage.setItem('tokenExpiration', tokenExpiration);
    
      console.log("User logged in:", state.email);
    },
    
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;

      // Clear the localStorage on logout
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('isPremium');
    },
    upgradeToPremium: (state) => {
      state.isPremium = true;
      localStorage.setItem('isPremium', 'true'); // Persist premium status


      console.log("premium aya:", state.isPremium)
    },
    flipCard: (state) => {
      state.isFlipped = !state.isFlipped;
    },
    showSignin: (state) => {
      state.isFlipped = false;
    },
    showSignup: (state) => {
      state.isFlipped = true;
    },
  },
});

export const { flipCard, showSignin, showSignup, loginSuccess, logout, upgradeToPremium } = authSlice.actions;
export default authSlice.reducer;
