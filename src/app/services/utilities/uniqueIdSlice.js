import { createSlice } from '@reduxjs/toolkit';

export const uniqueIdSlice = createSlice({
  name: 'uniqueId',
  initialState: JSON.parse(localStorage.getItem('uniqueId')),
  reducers: {
    incrementUniqueId: (state) => {
      const newState = state + 1;
    localStorage.setItem('uniqueId', JSON.stringify(newState));
    return newState;
  },
  setUniqueId: (state, action) => {
    localStorage.setItem('uniqueId', JSON.stringify(action.payload)); 
    return action.payload;
  },
  },
});

export const { incrementUniqueId, setUniqueId } = uniqueIdSlice.actions;
export default uniqueIdSlice.reducer;