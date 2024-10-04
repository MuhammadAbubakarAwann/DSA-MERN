

import { createSlice } from '@reduxjs/toolkit';

export const expandedNodeSlice = createSlice({
  name: 'expandedNode',
  initialState: null,
  reducers: {
    setExpandedNode: (state, action) => action.payload,
    
  },
});

export const { setExpandedNode } = expandedNodeSlice.actions;
export default expandedNodeSlice.reducer;
