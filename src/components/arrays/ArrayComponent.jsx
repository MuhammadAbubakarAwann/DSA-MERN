import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertToArray } from '../../app/services/arraySlice';
import ArrayHandler from './subComponents/ArrayHandler';
import ArrayContainer from './subComponents/ArrayContainer';
import ResultContainer from './subComponents/ResultContainer';
import '../../css/ArrayHandler.css';
import '../../css/ArrayComponent.css';

const ArrayComponent = () => {
  const array = useSelector((state) => state.array.array);
  const dispatch = useDispatch();
  const highlightedIndices = useSelector((state) => state.array.highlightedIndices || []);

 

  useEffect(() => {
    if (array.length === 0) {
      const savedArray = localStorage.getItem('array');
      if (savedArray) {
        JSON.parse(savedArray).forEach((item) => {
          dispatch(insertToArray(item.value));  
        });
      }
    }
  }, [dispatch, array.length]);
  useEffect(() => {
    localStorage.setItem('array', JSON.stringify(array));
  }, [array]);

  return (
    <div className="array-container">
      <h2>Array</h2>

      <ArrayContainer array={array} highlightedIndices={highlightedIndices} />
      <div className='array-handler-wrapper'>
        <ArrayHandler />
      </div>
      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  );
};

export default ArrayComponent;
