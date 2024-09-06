import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: JSON.parse(localStorage.getItem('hashTable')) || [],
  size: 50,
  operationResults: '',
  searchResults: null,
};

const hashFunction = (key, tableSize) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i)) % tableSize;
  }
  return hash;
};

const hashingSlice = createSlice({
  name: "hashTable",
  initialState,

  reducers: {
    set: (state, action) => {
      const { key, value } = action.payload;
      const index = hashFunction(key, state.size);

      if (!state.table[index]) {
        state.table[index] = [];
      }

      for (let i = 0; i < state.table[index].length; i++) {
        if (state.table[index][i][0] === key) {
          state.table[index][i][1] = value;
          state.operationResults = `Updated value: ${value} for key: ${key} at index: ${index}`;
          return;
        }
      }
      state.table[index].push([key, value]);
      state.operationResults = `Inserted value: ${value} with key: ${key} at index: ${index}`;
    },

    get: (state, action) => {
      const key = action.payload;
      const index = hashFunction(key, state.size);
      if (state.table[index]) {
        for (let i = 0; i < state.table[index].length; i++) {
          if (state.table[index][i][0] === key) {
            const value = state.table[index][i][1];
            state.operationResults = `Found value: ${value} for key: ${key} at index: ${index}`;
            state.searchResults = value;
            return;
          }
        }
      }
      state.operationResults = `No key-value pair found for key: ${key}`;
      state.searchResults = null;
    },

    remove: (state, action) => {
      const key = action.payload;
      console.log("key:",key)
      const index = hashFunction(key, state.size);
      if (state.table[index]) {
        for (let i = 0; i < state.table[index].length; i++) {
          if (state.table[index][i][0] === key) {
            const value = state.table[index][i][1];
            state.table[index].splice(i, 1);
            state.operationResults = `Key: ${key} with value: ${value} removed from index: ${index}`;
            return;  
          }
        }
      }
      state.operationResults = `Key: ${key} not found in the table.`;
    }
  },
});

export const { set, get, remove } = hashingSlice.actions;
export default hashingSlice.reducer;
