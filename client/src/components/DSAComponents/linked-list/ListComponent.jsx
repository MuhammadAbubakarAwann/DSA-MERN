import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNode } from '../../../app/services/listSlice';
import '../../../css/ListComponent.css';
import ListHandler from './subComponents/ListHandler';
import ListContainer from './subComponents/ListContainer';
import ResultContainer from './subComponents/ResultContainer';

const ListComponent = () => {
  const linkedList = useSelector((state) => state.linkedList);
  const dispatch = useDispatch();

  useEffect(() => {
    const { searchResults, ...stateToSave } = linkedList;
    localStorage.setItem('linkedList', JSON.stringify(stateToSave));
  }, [linkedList]);

  useEffect(() => {
    if (linkedList.length === 0) {
      const savedList= localStorage.getItem('linkedList');
      if (savedList) {
        JSON.parse(savedList).forEach((item) => {
          dispatch(addNode(item));
        });
      }
    }
  }, [dispatch, linkedList.length]);

  return (
    <div className="list-container">
      <h2>Linked List</h2>
      <div className='list-handler-wrapper'>
        <ListHandler />

      </div>
      <ListContainer  />

      <div className='result-container-wrapper'>
        <ResultContainer/>
      </div>
    </div>
  )
}

export default ListComponent
