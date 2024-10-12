import { configureStore } from '@reduxjs/toolkit';
import stackslice from './services/stackSlice';
import arrayslice from './services/arraySlice';
import objectslice from './services/objectSlice';
import linekdListslice from './services/listSlice';
import binaryTreeslice from './services/binaryTreeSlice';
import uniqueIdGenerator from './services/utilities/uniqueIdSlice.js';
import expandedNodeslice from './services/utilities/expandedNodeSlice.js';
import editableNodeslice from './services/utilities/editableNodeSlice.js';
import deleteNodeKeyslice from './services/utilities/deleteNodeKeySlice.js';
import doublyLinkedListslice from './services/doublyLinkedListSlice.js';
import circularLinkedListslice from './services/circularLinkedListSlice.js';
import hashingslice from './services/hashingSlice.js'
import cacheslice from './services/cacheSlice.js';
import queueslice from './services/queueSlice.js';
import circularQueueslice from './services/circularQueueSlice.js';
import priorityQueueSlice from './services/priorityQueueSlice.js';
import BSTslice from './services/BSTslice.js';
import authSlice from './services/auth/authSlice.js';
import toastSlice from './services/utilities/toastSlice.js';

const store = configureStore({
  reducer: {
    stack: stackslice,
    array: arrayslice,
    object: objectslice,
    linkedList: linekdListslice,
    doublyLinkedList: doublyLinkedListslice,
    circularLinkedList: circularLinkedListslice,
    binaryTree: binaryTreeslice,
    binarySearchTree: BSTslice,
    hashTable: hashingslice,
    cache: cacheslice,
    queue: queueslice,
    circularQueue: circularQueueslice,
    priorityQueue : priorityQueueSlice,

    uniqueID : uniqueIdGenerator,
    expandedNode: expandedNodeslice,
    editableNode: editableNodeslice,
    deleteNodeKey: deleteNodeKeyslice,

    auth: authSlice,

    toast: toastSlice,
  }
});
export default store;
