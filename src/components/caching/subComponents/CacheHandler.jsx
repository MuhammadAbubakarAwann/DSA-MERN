import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, put, setCapacity } from '../../../app/services/cacheSlice';

const CacheHandler = () => {
  const dispatch = useDispatch();

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const containerRef = useRef(null);
  const liRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [liHeight, setLiHeight] = useState(0);
  const [setInputVisible, setSetInputVisible] = useState(false);
  const [getInputVisible, setGetInputVisible] = useState(false);
  const [capacityInputVisible, setCapacityInputVisible] = useState(false);

  const [value, setValue] = useState('');
  const [key, setKey] = useState('');
  const [keyToGet, setKeyToGet] = useState('');
  const [cacheCapacity, setCacheCapacity] = useState('');

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }

    if (liRef.current) {
      setLiHeight(liRef.current.scrollHeight);
    }
  }, [setInputVisible]);

  const toggleVisibility = () => {
    setBtnsIsVisible(!btnsIsVisible);
    setSetInputVisible(false);
    setGetInputVisible(false);
    setCapacityInputVisible(false);
  };

  const handlePutVisibility = () => {
    setSetInputVisible(!setInputVisible);
    setGetInputVisible(false);
    setCapacityInputVisible(false);

  };
  const handleGetVisibility = () => {
    setGetInputVisible(!getInputVisible);
    setSetInputVisible(false);
    setCapacityInputVisible(false);

  };
  const handleSetCapacityVisibility = () => {
    setCapacityInputVisible(!capacityInputVisible);
    setSetInputVisible(false);
    setGetInputVisible(false);


  };

  const handlePut = () => {
    if (key && value) {

      dispatch(put({ key, value }));
      setValue('');
      setKey('');
    }
  };

  const handleGet = () => {
    if (keyToGet) {
      const key = keyToGet;
      dispatch(get(key))
    }
    setKeyToGet('');
  }
  const handleCapacity = () => {
    if (cacheCapacity) {
      dispatch(setCapacity(cacheCapacity))
    }
    setCacheCapacity('');
  }

  return (
    <div className="array-handler-container">
      <button
        className="toggle-button"
        style={{ height: containerHeight }}
        onClick={toggleVisibility}
      >
        {btnsIsVisible ? '<' : '>'}
      </button>
      <div
        ref={containerRef}
        className={`array-btns-container ${btnsIsVisible ? 'slide-in' : 'slide-out'}`}
      >
        <ul>
          <li ref={liRef}>
            <div className={`input-container ${setInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={key} onChange={(e) => setKey(e.target.value)} className='input-field' id='insert-value' placeholder="Enter Key:" />
              <input type="text" style={{ height: liHeight }} value={value} onChange={(e) => setValue(e.target.value)} className='input-field' id='insert-value' placeholder="Enter value" />
              <button style={{ height: liHeight }} onClick={handlePut} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handlePutVisibility}>Put</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${getInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={keyToGet} onChange={(e) => setKeyToGet(e.target.value)} className='input-field' id='insert-value' placeholder="Enter Key to get:" />
              <button style={{ height: liHeight }} onClick={handleGet} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleGetVisibility}>Get</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${capacityInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={cacheCapacity} onChange={(e) => setCacheCapacity(e.target.value)} className='input-field' id='insert-value' placeholder="Enter cache capacity:" />
              <button style={{ height: liHeight }} onClick={handleCapacity} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleSetCapacityVisibility}>set capacity</button>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default CacheHandler;
