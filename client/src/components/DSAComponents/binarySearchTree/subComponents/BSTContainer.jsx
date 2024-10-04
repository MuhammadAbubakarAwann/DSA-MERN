// BSTContainer.js
import React from 'react';
import { useSelector } from 'react-redux';
import BSTElement from './BSTElement';

const BSTContainer = () => {
  const root = useSelector(state => state.binarySearchTree.root);
  return (
    <div className="tree-container">
      {root ? (
        <BSTElement node={root} />
      ) : (
        <p>No root node</p>
      )}
    </div>
  );
};

export default BSTContainer;
