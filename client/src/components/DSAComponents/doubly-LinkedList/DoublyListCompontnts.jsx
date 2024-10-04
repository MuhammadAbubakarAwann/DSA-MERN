import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNode } from '../../../app/services/doublyLinkedListSlice';
import '../../../css/ListComponent.css';
import DoublyListHandler from './subComponents/DoublyListHandler';
import DoublyListContainer from './subComponents/DoublyListContainer';
import ResultContainer from './subComponents/ResultContainer';

const DoublyListComponent = () => {
  const doublyLinkedList = useSelector((state) => state.doublyLinkedList);
  const dispatch = useDispatch();

  useEffect(() => {
    const { searchResults, ...stateToSave } = doublyLinkedList;
    localStorage.setItem('doublyLinkedList', JSON.stringify(stateToSave));
  }, [doublyLinkedList]);

  useEffect(() => {
    if (doublyLinkedList.length === 0) {
      const savedList = localStorage.getItem('doublyLinkedList');
      if (savedList) {
        JSON.parse(savedList).forEach((item) => {
          dispatch(addNode(item));
        });
      }
    }
  }, [dispatch, doublyLinkedList.length]);

  return (
    <div className="list-container">
      <h2>Doubly Linked List</h2>
      <div className='list-handler-wrapper'>
        <DoublyListHandler />

      </div>
      <DoublyListContainer />

      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  )
}

export default DoublyListComponent
