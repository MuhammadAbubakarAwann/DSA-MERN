import React, { useEffect } from 'react';
import HashContainer from './subComponents/HashContainer';
import HashHandler from './subComponents/HashHandler';
import '../../css/HashComponent.css'
import ResultContainer from './subComponents/ResultContainer';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../../app/services/hashingSlice';

const HashComponent = () => {

  const hashTable = useSelector((state) => state.hashTable.table);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('hashTable', JSON.stringify(hashTable));
  }, [hashTable]);

  useEffect(() => {
    if (hashTable.length === 0) {
      const savedArray = localStorage.getItem('hashTable');
      if (savedArray) {
        JSON.parse(savedArray).forEach((item) => {
          dispatch(set(item.key ,item.value));  
        });
      }
    }
  }, [dispatch, hashTable.length]);

  return (
    <div className="hashTable-container">
      
      <HashContainer />
      <div className='hashTable-handler-wrapper'>
        <HashHandler />
      </div>

      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>

  );
};

export default HashComponent;
