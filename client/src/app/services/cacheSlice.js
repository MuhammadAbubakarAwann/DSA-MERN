import { createSlice } from "@reduxjs/toolkit";

const createNode = (key, value) => ({
  key,
  value,
  prev: null,
  next: null,
});

const initialState = {
  capacity: 5,
  map: {},
  head: null,
  tail: null,
  table: [],
  operationResults: '',
};


const removeNode = (state, node) => {
  if (node.prev !== null) {
    state.map[node.prev].next = node.next;
  } else {
    state.head = node.next;
  }

  if (node.next !== null) {
    state.map[node.next].prev = node.prev;
  } else {
    state.tail = node.prev;
  }

  node.prev = null;
  node.next = null;
};

const addNode = (state, node) => {
  node.next = state.head;
  node.prev = null;

  if (state.head !== null) {
    state.map[state.head].prev = node.key;
  }

  state.head = node.key;

  if (state.tail === null) {
    state.tail = node.key;
  }
};

const updateTable = (state) => {
  state.table = Object.values(state.map).map(node => [node.key, node.value]);
};

const lruCacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    get: (state, action) => {
      const key = action.payload;
      if (!state.map[key]) {
        state.operationResults = `Key: ${key} not found`;
        return;
      }

      const node = state.map[key];
      if (node.key !== state.head) {
        removeNode(state, node);
        addNode(state, node);
      }

      state.operationResults = `Found value: ${node.value} for key: ${key}`;
      updateTable(state);
    },

    put: (state, action) => {
      const { key, value } = action.payload;

      if (state.map[key]) {
        const node = state.map[key];
        node.value = value;
        if (node.key !== state.head) {
          removeNode(state, node);
          addNode(state, node);
        }
        state.operationResults = `Updated key: ${key} with value: ${value}`;
      } else {
        const node = createNode(key, value);
        state.map[key] = node;
        addNode(state, node);

        if (Object.keys(state.map).length > state.capacity) {
          const tailKey = state.tail;
          const tailNode = state.map[tailKey];
          removeNode(state, tailNode);
          delete state.map[tailKey];
        }

        state.operationResults = `Inserted key: ${key} with value: ${value}`;
      }

      updateTable(state);
    },

    setCapacity: (state, action) => {
      state.capacity = action.payload;
      while (Object.keys(state.map).length > state.capacity) {
        const tailKey = state.tail;
        const tailNode = state.map[tailKey];
        removeNode(state, tailNode);
        delete state.map[tailKey];
      }
      state.operationResults = `cache capacity set to : ${state.capacity}`
      updateTable(state);
    }
  },
});

export const { get, put, setCapacity } = lruCacheSlice.actions;
export default lruCacheSlice.reducer;
