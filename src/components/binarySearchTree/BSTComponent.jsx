import React from 'react';
import '../../css/BinaryTreeComponent.css';

import BSTHandler from './subComponents/BSTHandler';
import BSTContainer from './subComponents/BSTContainer';
import ResultContainer from './subComponents/ResultContainer';

const BSTComponent = () => {
  return (
    <div className="list-container">
      <h2>Binary Search Tree</h2>
      <div className='element-wrapper'>
        <BSTContainer />
      </div>
      {/* <div>
        <EditNode />
        <DeleteNode/>
      </div> */}
      <div className="tree-handler-wrapper">
        <BSTHandler />
      </div>
      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  );
};

export default BSTComponent;
