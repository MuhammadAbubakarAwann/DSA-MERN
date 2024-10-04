import React from 'react';
import { useSelector } from 'react-redux';
import TreeElement from './TreeElement';
import { Xwrapper } from 'react-xarrows';

const ElementContainer = () => {
  const root = useSelector(state => state.binaryTree.root);

  return (
    <div className="tree-container">
      {root ? (
        <Xwrapper>
          <TreeElement node={root}  />
        </Xwrapper>
      ) : (
        <p>No root node</p>
      )}
    </div>
  );
};

export default ElementContainer;
