import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableNode } from '../../../app/services/utilities/editableNodeSlice';

const EditNode = () => {
  const dispatch = useDispatch();
  const expandedNode = useSelector((state) => state.expandedNode);
  const editableNode = useSelector((state) => state.editableNode);

  const handleEditAble = () => {
    dispatch(setEditableNode(editableNode === expandedNode ? null : expandedNode));
  };

  return (
    <div> 
      <button className={`edit-button ${expandedNode ? 'visible' : 'hidden'}`} onClick={handleEditAble}>
        <i className="fa fa-edit"></i>
      </button>
    </div>
  );
};

export default EditNode;
