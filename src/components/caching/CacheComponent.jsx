import React, { useEffect } from 'react';
import '../../css/HashComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { put } from '../../app/services/cacheSlice';
import CacheContainer from './subComponents/CacheContainer';
import CacheHandler from './subComponents/CacheHandler';
import ResultContainer from './subComponents/ResultContainer';

const CacheComponent = () => {

  const cache = useSelector((state) => state.cache.table);
  const dispatch = useDispatch();


  useEffect(() => {
    const savedCache = JSON.parse(localStorage.getItem('cache'));
    if (savedCache) {
      savedCache.forEach(([key, value]) => {
        dispatch(put({ key, value })); // Correct payload format
      });
    }
  }, [dispatch]);



  useEffect(() => {
    localStorage.setItem('cache', JSON.stringify(cache));
  }, [cache]);

  return (
    <div className="hashTable-container">
      
      <CacheContainer />
      <div className='hashTable-handler-wrapper'>
        <CacheHandler />
      </div>

      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>

  );
};

export default CacheComponent;
