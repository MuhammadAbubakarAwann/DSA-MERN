import { createSlice } from "@reduxjs/toolkit";

const isArraySorted = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (Number(array[i].value) > Number(array[i + 1].value)) {
      return false;
    }
  }
  return true;
};

const arraySlice = createSlice({
  name: 'array',
  initialState: {
    array: JSON.parse(localStorage.getItem('array')) || [],
    searchResult: null,
    operationResults: '',
  },
  reducers: {
    insertToArray: (state, action) => {
      let time = new Date().getTime();
      const newObj = {
        value: action.payload,
        time: time
      };
      state.array.push(newObj);
      state.operationResults = `Value: ${action.payload} inserted at index: ${state.array.length - 1}`;
    },
    removeFromArray: (state) => {
      const removedObj = state.array.pop();
      state.operationResults = `Value: ${removedObj.value} removed from index: ${state.array.length}`;
    },
    removeSpecificFromArray: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.array.length) {
        const removedObj = state.array[index];
        state.array.splice(index, 1);
        state.operationResults = `Value: ${removedObj.value} removed from index: ${index}`;
      } else {
        state.operationResults = 'Index out of bounds';
      }
    },
    updateValueInArray: (state, action) => {
      const { index, newValue } = action.payload;
      if (index < 0 || index >= state.array.length) {
        state.operationResults = 'Index out of bounds';
        return;
      }
      const oldObj = state.array[index];
      let time = new Date().getTime();
      const newObj = {
        value: newValue,
        time: time
      };
      state.array[index] = newObj;
      state.operationResults = `Value at index ${index} updated from ${oldObj.value} to ${newValue}`;
    },
    bubbleSortArray: (state) => {
      let len = state.array.length;
      if (!len) {
        state.operationResults = 'Array is empty';
        return;
      }
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          if (Number(state.array[j].value) > Number(state.array[j + 1].value)) {
            const temp = state.array[j];
            state.array[j] = state.array[j + 1];
            state.array[j + 1] = temp;
          }
        }
      }
      state.operationResults = 'Array has been sorted using bubble sort';
    },
    selectionSortArray: (state) => {
      let len = state.array.length;
      if (!len) {
        state.operationResults = 'Array is empty';
        return;
      }
      for (let i = 0; i < len - 1; i++) {
        let min_Index = i;
        for (let j = i + 1; j < len; j++) {
          if (Number(state.array[j].value) < Number(state.array[min_Index].value)) {
            min_Index = j;
          }
        }
        if (min_Index !== i) {
          let temp = state.array[min_Index];
          state.array[min_Index] = state.array[i];
          state.array[i] = temp;
        }
      }
      state.operationResults = 'Array has been sorted using selection sort';
    },
    searchInArray: (state, action) => {
      const value = action.payload;
      let len = state.array.length;
      if (!len) {
        state.operationResults = 'Array is empty';
        return;
      }
      const indices = state.array.reduce((acc, obj, index) => {
        if (obj.value === value) acc.push(index);
        return acc;
      }, []);
      state.searchResult = indices.length > 0 ? { value, indices } : null;
      state.operationResults = indices.length > 0
        ? `Value ${value} found at indices: ${indices.join(', ')}`
        : `Value ${value} not found`;
    },
    binarySearchInArray: (state, action) => {
      const value = action.payload;
      let len = state.array.length;
      if (!len) {
        state.operationResults = 'Array is empty';
        return;
      }
      if (!isArraySorted(state.array)) {
        state.operationResults = 'Array is not sorted';
        return;
      }
      let firstIndex = 0;
      let lastIndex = len - 1;
      let found = false;

      while (firstIndex <= lastIndex) {
        let middleIndex = Math.floor((lastIndex + firstIndex) / 2);
        if (Number(state.array[middleIndex].value) == value) {
          state.operationResults = `Value ${value} found at index: ${middleIndex}`;
          found = true;
          break;
        } else if (Number(state.array[middleIndex].value) < value) {
          firstIndex = middleIndex + 1;
        } else {
          lastIndex = middleIndex - 1;
        }
      }
      if (!found) {
        state.operationResults = `Value ${value} not found`;
      }
    },
  }
});

export const {
  insertToArray,
  removeFromArray,
  removeSpecificFromArray,
  updateValueInArray,
  bubbleSortArray,
  searchInArray,
  selectionSortArray,
  binarySearchInArray
} = arraySlice.actions;

export default arraySlice.reducer;
