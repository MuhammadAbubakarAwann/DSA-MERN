import { createSlice } from '@reduxjs/toolkit';


const createNode = (key, value = key, parent = null) => ({
  key: key,
  value: value,
  parent: parent ? parent.key : null,
  left: null,
  right: null,
  id: null,
})


const initialState = {
  root: JSON.parse(localStorage.getItem('Binary-Search-Tree')) || null,
  operationResults: '',
}

function insertNode(root, key, value, id) {
  const newNode = createNode(key, value);
  newNode.id = id;
  if (!root) return newNode;

  let currentNode = root;
  while (true) {
    if (Number(key) < Number(currentNode.key)) {
      if (!currentNode.left) {
        currentNode.left = newNode;
        newNode.parent = currentNode.key;
        break;
      }
      else {
        currentNode = currentNode.left;
      }
    } else if (Number(key) > Number(currentNode.key)) {
      if (!currentNode.right) {
        currentNode.right = newNode;
        newNode.parent = currentNode.key
        break;
      } else {
        currentNode = currentNode.right;
      }
    } else {
      currentNode.value = value;
      break;
    }
  }
  return root;
}
function findMinNode(node) {
  while (node.left) {
    node = node.left
  }
  return node;
}

function findNode(root, key) {
  const visitedNodes = [];
  let currentNode = root;

  while (currentNode) {
    visitedNodes.push(currentNode.key)
    if (key === currentNode.key) {
      return { node: currentNode, visitedNodes }
    } else if (key < currentNode.key) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right
    }
  }
  return { node: null, visitedNodes }
}

function removeNode(root, key) {
  if (!root) return null;

  if (key < root.key) {
    root.left = removeNode(root.left, key);
  } else if (key > root.key) {
    root.right = removeNode(root.right, key);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    const minNode = findMinNode(root.left);
    root.key = minNode.key;
    root.value = minNode.value;
    root.right = removeNode(root.right, minNode.key);
  }
  return root;
}
function updateNode(root, key, newValue) {

  const { node } = findNode(root, key);

  if (!node) return false;
  node.value = newValue
  node.key = newValue;
  return true;


}

const binarySearchTreeSlice = createSlice({
  name: 'binarySearchTree',
  initialState,
  reducers: {
    insert: (state, action) => {
      const { value, key, id } = action.payload;
      const rootNode = state.root;
      const insertionResult = insertNode(rootNode, key, value, id);
      state.root = insertionResult;
      state.operationResults = insertionResult ? `Inserted Node with key: ${key}` : `Failed to insert Node with Key : ${key}`;
      localStorage.setItem('Binary-Search-Tree', JSON.stringify(state.root))
    },
    remove: (state, action) => {

      const key = action.payload;
      const res = removeNode(state.root, key)
      state.root = res;
      state.operationResults = res != null ? `Removed node with key: ${key}` : `Failed to remove node with key: ${key}`;
      localStorage.setItem('Binary-Search-Tree', JSON.stringify(state.root));
    },
    update: (state, action) => {
      const { key, newVal } = action.payload;
      const res = updateNode(state.root, key, newVal)
      state.operationResults = res ? `Updated Node with key: ${key} => ${newVal}`: `Node with key : ${key} not updated`
      localStorage.setItem('Binary-Search-Tree', JSON.stringify(state.root));
    }
  }
})

export const { insert, remove, update } = binarySearchTreeSlice.actions
export default binarySearchTreeSlice.reducer;
