import { createSlice } from '@reduxjs/toolkit';

class BinaryTreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.id = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

const initialState = {
  root: JSON.parse(localStorage.getItem('Binary Tree')) || null,
  operationResults: '',
  searchedKey: null,
  visitedNodes: [],
};

function inOrderTraversal(node, nodes = []) {
  if (!node) return nodes;
  if (node.left) inOrderTraversal(node.left, nodes);
  nodes.push(node);
  if (node.right) inOrderTraversal(node.right, nodes);
  return nodes;
}

function postOrderTraversal(node, nodes = []) {
  if (!node) return nodes;
  if (node.left) postOrderTraversal(node.left, nodes);
  if (node.right) postOrderTraversal(node.right, nodes);
  nodes.push(node);
  return nodes;
}

function preOrderTraversal(node, nodes = []) {
  if (!node) return nodes;
  nodes.push(node);
  if (node.left) preOrderTraversal(node.left, nodes);
  if (node.right) preOrderTraversal(node.right, nodes);
  return nodes;
}

function findNode(root, key) {
  const nodes = preOrderTraversal(root);
  const visitedNodes = [];
  for (let node of nodes) {
    visitedNodes.push(node.key);
    if (node.key === key) {
      return { node, visitedNodes };
    }
  }
  return { node: null, visitedNodes }
}

function insertNode(root, parentNodeKey, key, value, left, right, id) {
  const { node: parentNode } = findNode(root, parentNodeKey); 
  if (!parentNode) return false; 

  const canInsertLeft = left && parentNode.left === null;
  const canInsertRight = right && parentNode.right === null;

  if (canInsertLeft) {
    parentNode.left = new BinaryTreeNode(key, value, parentNode);
    parentNode.left.id = id;
    return true;
  }
  if (canInsertRight) {
    parentNode.right = new BinaryTreeNode(key, value, parentNode);
    parentNode.right.id = id;
    return true;
  }

  return false;
}

function findDeepestRightMostNode(root) {
  let queue = [root];
  let node = null;

  while (queue.length > 0) {
    node = queue.shift();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return node;
}

function deleteDeepestRightMostNode(root, dNode) {
  let queue = [root];
  let node;

  while (queue.length > 0) {
    node = queue.shift();
    if (node === dNode) {
      if (node.parent.left === dNode) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      return;
    }
    if (node.right) {
      if (node.right === dNode) {
        node.right = null;
        return;
      } else {
        queue.push(node.right);
      }
    }
    if (node.left) {
      if (node.left === dNode) {
        node.left = null;
        return;
      } else {
        queue.push(node.left);
      }
    }
  }
}

function removeNode(root, key) {
  if (!root) return null;

  let keyNode = null;
  let queue = [root];
  let node;

  while (queue.length > 0) {
    node = queue.shift();
    if (node.key === key) keyNode = node;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  if (!keyNode) return root;

  if (!keyNode.left && !keyNode.right) {
    if (keyNode.parent) {
      if (keyNode.parent.left === keyNode) keyNode.parent.left = null;
      else keyNode.parent.right = null;
    } else {
      root = null;
    }
  } else if (keyNode.left && !keyNode.right) {
    if (keyNode.parent) {
      if (keyNode.parent.left === keyNode) keyNode.parent.left = keyNode.left;
      else keyNode.parent.right = keyNode.left;
    } else {
      root = keyNode.left;
    }
    keyNode.left.parent = keyNode.parent;
  } else if (!keyNode.left && keyNode.right) {

    if (keyNode.parent) {
      if (keyNode.parent.left === keyNode) keyNode.parent.left = keyNode.right;
      else keyNode.parent.right = keyNode.right;
    } else {
      root = keyNode.right;
    }
    keyNode.right.parent = keyNode.parent;
  } else {
    const deepestRightMostNode = findDeepestRightMostNode(root);
    if (deepestRightMostNode) {
      keyNode.key = deepestRightMostNode.key;
      keyNode.value = deepestRightMostNode.value;
      deleteDeepestRightMostNode(root, deepestRightMostNode);
    }
  }
  return root;
}

function updateNodeValue(root, key, newValue) {
  const node = findNode(root, key);
  if (node) {
    node.value = newValue;
    node.key = newValue;
    return true;
  }
  return false;
}

function serializeNode(node) {
  if (!node) return null;
  return {
    key: node.key,
    value: node.value,
    id: node.id,
    left: serializeNode(node.left),
    right: serializeNode(node.right),
  };
}

function deserializeNode(data, parent = null) {
  if (!data) return null;
  const node = new BinaryTreeNode(data.key, data.value, parent);
  node.id = data.id;
  node.left = deserializeNode(data.left, node);
  node.right = deserializeNode(data.right, node);
  return node;
}

const binaryTreeSlice = createSlice({
  name: 'binaryTree',
  initialState,
  reducers: {
    insert(state, action) {
      const { parentNodeKey, key, value, left, right, id } = action.payload;
      if (!state.root) {
        const rootNode = new BinaryTreeNode(key, value, null);
        rootNode.id = id;
        state.root = serializeNode(rootNode);
      } else {
        const rootNode = deserializeNode(state.root);
        const result = insertNode(rootNode, parentNodeKey, key, value, left, right, id);
        state.root = serializeNode(rootNode);
        state.operationResults = result ? `Inserted node with key: ${key}` : `Failed to insert node with key: ${key}`;
      }
      localStorage.setItem('Binary Tree', JSON.stringify(state.root));
    },
    remove(state, action) {
      const key = action.payload;
      const rootNode = deserializeNode(state.root);
      const result = removeNode(rootNode, key);
      state.root = serializeNode(result);
      state.operationResults = result ? `Removed node with key: ${key}` : `Failed to remove node with key: ${key}`;
      localStorage.setItem('Binary Tree', JSON.stringify(state.root));
    },
    find(state, action) {
      const key = action.payload;
      const rootNode = deserializeNode(state.root);
      const {node, visitedNodes} = findNode(rootNode, key);
      state.searchedKey = node ? key : null;
      state.visitedNodes = visitedNodes;
    },
    traverse(state, action) {
      const type = action.payload;
      const rootNode = deserializeNode(state.root);
      let nodes = [];
      let visitedNodes = [];
      switch (type) {
        case 'inOrder':
          nodes = inOrderTraversal(rootNode, visitedNodes);
          state.operationResults = `In-order traversal: ${nodes.map(node => node.key).join(', ')}`;
          break;
        case 'postOrder':
          nodes = postOrderTraversal(rootNode, visitedNodes);
          state.operationResults = `Post-order traversal: ${nodes.map(node => node.key).join(', ')}`;
          break;
        case 'preOrder':
          nodes = preOrderTraversal(rootNode, visitedNodes);
          state.operationResults = `Pre-order traversal: ${nodes.map(node => node.key).join(', ')}`;
          break;
        default:
          nodes = [];
      }
      state.visitedNodes = visitedNodes.map(node => node.key);
    },
    update(state, action) {
      const { key, newValue } = action.payload;
      const rootNode = deserializeNode(state.root);
      const result = updateNodeValue(rootNode, key, newValue);
      state.root = serializeNode(rootNode);
      state.operationResults = result ? `Updated node with key: ${key} to new value: ${newValue}` : `Failed to update node with key: ${key}`;
      localStorage.setItem('Binary Tree', JSON.stringify(state.root));
    },

    setUtilStatesFalse: (state, action) => {
      const { traverStatus, searchedKey } = action.payload;
      state.traversalSuccess = traverStatus;
      state.searchedKey = searchedKey;
    },
  },
});

export const { insert, remove, find, traverse, update, setUtilStatesFalse } = binaryTreeSlice.actions;

export default binaryTreeSlice.reducer;
