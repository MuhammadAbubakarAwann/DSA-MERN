// src/components/BinaryTreeComponent.js

import React from 'react';
import '../../css/BinaryTreeComponent.css';
import ElementContainer from './subComponents/ElementContainer';
import BinaryTreeHandlers from './subComponents/BinaryTreeHandlers';
import ResultContainer from './subComponents/ResultContainer';
import EditNode from './subComponents/EditNode';
import DeleteNode from './subComponents/DeleteNode';

const BinaryTreeComponent = () => {
  return (
    <div className="list-container">
      <h2>Binary Tree</h2>
      <div className='element-wrapper'>
        <ElementContainer />
      </div>
      <div>
        <EditNode />
        <DeleteNode/>
      </div>
      <div className="tree-handler-wrapper">
        <BinaryTreeHandlers />
      </div>
      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  );
};

export default BinaryTreeComponent;
