// React component for rendering the linked list
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNode} from '../../../app/services/circularLinkedListSlice';
import '../../../css/ListComponent.css';
import ResultContainer from './subComponents/ResultContainer';
import CircularListHandler from './subComponents/CircularListHandler';
import CircularListContainer from './subComponents/CircularListContainer';

const CircularListComponent = () => {
  const linkedList = useSelector((state) => state.circularLinkedList);
  const dispatch = useDispatch();

  useEffect(() => {
    const { searchResults, ...stateToSave } = linkedList;
    localStorage.setItem('CircularLinkedList', JSON.stringify(stateToSave));
  }, [linkedList]);

  useEffect(() => {
    if (linkedList.length === 0) {
      const savedList= localStorage.getItem('CircularLinkedList');
      if (savedList) {
        JSON.parse(savedList).forEach((item) => {
          dispatch(addNode(item));
        });
      }
    }
  }, [dispatch, linkedList.length]);

  return (
    <div className="list-container">
      <h2>Circular Linked List</h2>
      <div className='list-handler-wrapper'>
        <CircularListHandler />
      </div>
      <CircularListContainer />
      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  );
};

export default CircularListComponent;