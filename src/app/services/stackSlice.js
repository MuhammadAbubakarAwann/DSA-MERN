import { createSlice } from '@reduxjs/toolkit';

const stackSlice = createSlice({
  name: 'stack',
  initialState: {
    stack: JSON.parse(localStorage.getItem('stack')) || [],
    operationResults: '',
  },
  reducers: {
    pushToStack: (state, action) => {
      state.stack.push(action.payload);
      state.operationResults = `Value: ${action.payload} pushed at index: ${state.stack.length - 1}`;

    },
    popFromStack: (state) => {
      let popedValue = state.stack.pop();
      if (popedValue) {
        state.operationResults = `Value: ${popedValue} is pop from stack`;
      } else {
        state.operationResults = `Stack is empty`
      }
    },

    peekOfStack: (state) => {
      const peekOfStack = state.stack[state.stack.length - 1];
      if (state.stack.length > 0) {
        state.operationResults = `Peek of stack is ${peekOfStack}`;
      }
      else{
        state.operationResults = `Stack is empty`
      }
    },

    sizeOfStack: (state) => {
      console.log("suze calles")
      const sizeOfStack = state.stack.length;
      state.operationResults = `Size of stack is ${sizeOfStack}`;

    }

  },
});

export const {
  pushToStack,
  popFromStack,
  peekOfStack,
  sizeOfStack
} = stackSlice.actions;

export default stackSlice.reducer;
