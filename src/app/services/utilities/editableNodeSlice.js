
import { createSlice } from '@reduxjs/toolkit';

export const editableNodeSlice = createSlice({
  name: 'editableNode',
  initialState: null,
  reducers: {
    setEditableNode: (state, action) => action.payload,
  },
});

export const { setEditableNode } = editableNodeSlice.actions;

export default editableNodeSlice.reducer;
