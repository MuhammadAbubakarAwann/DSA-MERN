import { createSlice } from "@reduxjs/toolkit";

// Node class for the circular linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
    this.time = '';
  }
}

// Initial state for the Redux slice
const initialState = {
  head: null,
  tail: null,
  operationResults: '',
  searchResults: null,
};

const convertNodeToPlainObject = (node) => {
  return {
    value: node.value,
    next: node.next ? convertNodeToPlainObject(node.next) : null,
    previous: node.previous ? convertNodeToPlainObject(node.previous) : null,
    time: node.time,
  };
};

const circularLinkedListSlice = createSlice({
  name: 'circularLinkedList',
  initialState: JSON.parse(localStorage.getItem('circularLinkedList')) || initialState,

  reducers: {
    addNode: (state, action) => {
      const time = new Date().getTime();
      const newNode = new Node(action.payload);
      newNode.time = time;

      if (!state.head) {
        state.head= convertNodeToPlainObject(newNode);
        state.tail= convertNodeToPlainObject(newNode);
        newNode.next= convertNodeToPlainObject(newNode);  // Circular linkage
        newNode.previous= convertNodeToPlainObject(newNode);
      } else {
        newNode.previous = state.tail;
        newNode.next = state.head;
        state.tail.next= convertNodeToPlainObject(newNode);
        state.head.previous= convertNodeToPlainObject(newNode);
        state.tail= convertNodeToPlainObject(newNode);
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
        if (state.head) {
          newNode.next = state.head;
          newNode.previous = state.tail;
          state.head.previous= convertNodeToPlainObject(newNode);
          state.tail.next= convertNodeToPlainObject(newNode);
        }
        state.head= convertNodeToPlainObject(newNode);
        if (!state.tail) {
          state.tail= convertNodeToPlainObject(newNode);
          newNode.next= convertNodeToPlainObject(newNode);
          newNode.previous= convertNodeToPlainObject(newNode);
        }
        state.operationResults = `Node with value ${value} added at index ${index}.`;
        return;
      }

      let current = state.head;
      let currentIndex = 0;

      do {
        if (currentIndex === index) {
          newNode.next = current;
          newNode.previous = current.previous;
          if (current.previous) {
            current.previous.next= convertNodeToPlainObject(newNode);
          }
          current.previous= convertNodeToPlainObject(newNode);
          state.operationResults = `Node with value ${value} added at index ${index}.`;
          return;
        }
        current = current.next;
        currentIndex++;
      } while (current !== state.head);

      state.operationResults = `Index is out of range.`;
    },

    removeNode: (state, action) => {
      const index = action.payload;

      if (!state.head) {
        state.operationResults = `List is empty.`;
        return;
      }

      if (index < 0) {
        state.operationResults = `Index is out of range.`;
        return;
      }

      if (index === 0) {
        if (state.head === state.tail) {
          state.head = null;
          state.tail = null;
        } else {
          state.head = state.head.next;
          state.head.previous = state.tail;
          state.tail.next = state.head;
        }
        state.operationResults = `Node removed at index ${index}.`;
        return;
      }

      let current = state.head;
      let currentIndex = 0;

      do {
        if (currentIndex === index) {
          if (current.previous) {
            current.previous.next = current.next;
          }
          if (current.next) {
            current.next.previous = current.previous;
          }
          if (current === state.tail) {
            state.tail = current.previous;
          }
          state.operationResults = `Node removed at index ${index}.`;
          return;
        }
        current = current.next;
        currentIndex++;
      } while (current !== state.head);

      state.operationResults = `Index is out of range.`;
      state.searchResults = null;
    },

    findNode: (state, action) => {
      const value = action.payload;
      let current = state.head;
      let indices = [];
      let currentIndex = 0;

      if (current) {
        do {
          if (current.value === value) {
            indices.push(currentIndex);
          }
          current = current.next;
          currentIndex++;
        } while (current !== state.head);
      }

      state.searchResults = indices.length > 0 ? { value, indices } : undefined;
      state.operationResults = indices.length > 0
        ? `Value ${value} found at indices: ${indices.join(', ')}`
        : `Value ${value} not found.`;
    },

    getSize: (state) => {
      let current = state.head;
      let listSize = 0;

      if (current) {
        do {
          listSize++;
          current = current.next;
        } while (current !== state.head);
      }

      state.operationResults = `Size of list is ${listSize}.`;
    },

   
  },
});

export const { addNode, removeNode, findNode, addNodeAt, getSize } = circularLinkedListSlice.actions;

export default circularLinkedListSlice.reducer;