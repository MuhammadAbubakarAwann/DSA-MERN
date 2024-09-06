// BSTElement.js
import React from 'react';

const BSTElement = ({ node }) => {
  if (!node) return null;

  return (
    <div className="h-item">
      <div>{JSON.stringify(node, null, 2)}</div>
      <div className="bst-children">
        {node.left && <BSTElement node={node.left} />}
        {node.right && <BSTElement node={node.right} />}
      </div>
    </div>
  );
};

export default BSTElement;
