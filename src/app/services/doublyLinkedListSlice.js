import { createSlice } from "@reduxjs/toolkit";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
    this.time = '';
  }
}

const initialState = {
  head: null,
  tail: null,
  operationResults: '',
  searchResults: null,
};

const convertNodeToPlainObject = (node) => {
  if (node === null) return null;
  return {
    value: node.value,
    next: node.next ? convertNodeToPlainObject(node.next) : null,
    previous: node.previous ? convertNodeToPlainObject(node.previous) : null,
    time: node.time,
  };
};

const doublyLinkedListSlice = createSlice({
  name: 'doublyLinkedList',
  initialState: JSON.parse(localStorage.getItem('doublyLinkedList')) || initialState,

  reducers: {
    addNode: (state, action) => {
      const time = new Date().getTime();
      const newNode = new Node(action.payload);
      newNode.time = time;

      if (!state.head) {
        state.head = convertNodeToPlainObject(newNode);
        state.tail = convertNodeToPlainObject(newNode);
      } else {
        newNode.previous = state.tail;
        state.tail.next = convertNodeToPlainObject(newNode);
        state.tail = state.tail.next;
      }
    },

    addNodeAt: (state, action) => {
      const { index, value } = action.payload;
      if (index < 0) {
        state.operationResults = `Index is out of range.`;
        return;
      }
      const time = new Date().getTime();
      const newNode = new Node(value);
      newNode.time = time;

      if (index === 0) {
        const newHead = {
          ...newNode,
          next: state.head,
          previous: null
        };
        if (state.head) {
          state.head = {
            ...state.head,
            previous: newHead
          };
        }
        state.head = newHead;
        if (!state.tail) {
          state.tail = newHead;
        }
        state.operationResults = `Node with value ${value} added at index ${index}.`;
        return;
      }

      let current = state.head;
      let currentIndex = 0;

      while (current && currentIndex < index) {
        current = current.next;
        currentIndex++;
      }

      if (currentIndex === index && current) {
        const newCurrent = {
          ...newNode,
          next: current,
          previous: current.previous
        };
        if (current.previous) {
          current.previous = {
            ...current.previous,
            next: newCurrent
          };
        }
        current.previous = newCurrent;
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

      if (index === 0) {
        const newHead = state.head.next;
        if (newHead) {
          state.head = { ...newHead, previous: null };
        } else {
          state.head = null;
          state.tail = null;
        }
        state.operationResults = `Node removed at index ${index}.`;
        return;
      }

      let current = state.head;
      let currentIndex = 0;

      while (current && currentIndex < index) {
        current = current.next;
        currentIndex++;
      }

      if (current) {
        if (current.previous) {
          current.previous = { ...current.previous, next: current.next };
        }
        if (current.next) {
          current.next = { ...current.next, previous: current.previous };
        }
        if (!current.next) {
          state.tail = current.previous;
        }
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
    }
  }
});

export const { addNode, removeNode, findNode, addNodeAt, getSize } = doublyLinkedListSlice.actions;

export default doublyLinkedListSlice.reducer;
