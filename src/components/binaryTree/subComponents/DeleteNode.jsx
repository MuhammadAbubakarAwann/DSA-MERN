import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../../app/services/binaryTreeSlice';
import { clearDeleteNodeKey } from '../../../app/services/utilities/deleteNodeKeySlice'; 

const DeleteNode = () => {
  const dispatch = useDispatch();
  const expandedNode = useSelector((state) => state.expandedNode);

  const deleteNodeKey = useSelector((state) => state.deleteNodeKey);

  const handleDeleteNode = () => {
    if (deleteNodeKey) {
      dispatch(remove(deleteNodeKey));
      dispatch(clearDeleteNodeKey());
    }
  };

  return (
    <div>
      <button className={`delete-button ${expandedNode ? 'visible' : 'hidden'}`} onClick={handleDeleteNode}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  );
};

export default DeleteNode;
