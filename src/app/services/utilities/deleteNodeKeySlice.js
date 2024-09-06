import { createSlice } from '@reduxjs/toolkit';

const deleteNodeKeySlice = createSlice({
  name: 'deleteNodeKey',
  initialState: null,
  reducers: {
    setDeleteNodeKey: (state, action) => action.payload,
    clearDeleteNodeKey: () => null,
  },
});

export const { setDeleteNodeKey, clearDeleteNodeKey } = deleteNodeKeySlice.actions;

export default deleteNodeKeySlice.reducer;
