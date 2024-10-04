import { createSlice } from "@reduxjs/toolkit";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.time = '';
  }
}

const initialState = {
  head: null,
  operationResults: '',
  searchResults: null,
};

const convertNodeToPlainObject = (node) => {
  return {
    value: node.value,
    next: node.next ? convertNodeToPlainObject(node.next) : null,
    time: node.time,
  };
};

const linkedListSlice = createSlice({
  name: 'linkedList',
  initialState: JSON.parse(localStorage.getItem('linkedList')) || initialState,

  reducers: {
    addNode: (state, action) => {
      let time = new Date().getTime()
      const newNode = new Node(action.payload);
      newNode.time = time;

      if (!state.head) {
        state.head = convertNodeToPlainObject(newNode);
      } else {
        let current = state.head;
        while (current.next) {
          current = current.next;
        }
        current.next = convertNodeToPlainObject(newNode);
      }
      state.operationResults = `Node with value ${action.payload.value} added.`;
      state.searchResults = null;
    },

    addNodeAt: (state, action) => {
      const { index, value } = action.payload;
      if (index < 0) {
        state.operationResults = `Index is out of range.`;
        return;
      }
      let time = new Date().getTime()
      const newNode = new Node(value);
      newNode.time = time;

      if (index === 0) {
        newNode.next = state.head;
        state.head = convertNodeToPlainObject(newNode);
        state.operationResults = `Node with value ${value} added at index ${index}.`;
        return;
      }

      let current = state.head;
      let previous = null;
      let currentIndex = 0;

      while (current && currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }

      if (currentIndex === index) {
        newNode.next = convertNodeToPlainObject(current);
        previous.next = convertNodeToPlainObject(newNode);
        state.operationResults = `Node with value ${value} added at index ${index}.`;
      } else {
        state.operationResults = `Index is out of range.`;
      }
    },

    removeNode: (state, action) => {
      const index = action.payload;

      if (!state.head) {
        state.operationResults = `List is Empty`;
        return;
      }

      if (index < 0) {
        state.operationResults = `Index is out of range`;
        return;
      }

      if (index == 0) {
        state.head = state.head.next;
        state.operationResults = `Node removed at index ${index}.`;
        return;
      }

      let current = state.head;
      let previous = null;
      let currentIndex = 0;

      while (current && currentIndex < index) {
        previous = current;
        current = current.next;
        currentIndex++;
      }

      if (current) {
        previous.next = current.next;
        state.operationResults = `Node removed at index ${index}.`;
      } else {
        state.operationResults = `Index is out of range`;
      }
      state.searchResults = null;
    },

    findNode: (state, action) => {
      const value = action.payload;
      let current = state.head;
      let indices = [];
      let currentIndex = 0;

      while (current) {
        if (current.value === value) {
          indices.push(currentIndex);
        }
        current = current.next;
        currentIndex++;
      }
      state.searchResults = indices.length > 0 ? { value, indices } : undefined;
      state.operationResults = indices.length > 0
        ? `Value ${value} found at indices: ${indices.join(', ')}`
        : `Value ${value} not found`;
    },

    getSize: (state) => {
      let current = state.head;
      let listSize = 0;

      while (current) {
        listSize++;
        current = current.next;
      }

      state.operationResults = `Size of list is ${listSize}.`;
    },

    reverseList: (state) => {
      let current = convertNodeToPlainObject(state.head); 
      let previous = null;
      let next = null;

      while(current){
        next = current.next;
        current.next = previous;
        previous = current;
        current = next;
      }

      state.head = convertNodeToPlainObject(previous);
      state.operationResults = "List Reversed Successfully!";
    },


  }
});

export const { addNode, removeNode, findNode, addNodeAt, getSize, reverseList } = linkedListSlice.actions;

export default linkedListSlice.reducer;
