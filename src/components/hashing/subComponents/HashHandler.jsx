import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, remove, set } from '../../../app/services/hashingSlice';

const HashHandler = () => {
  const dispatch = useDispatch();

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const containerRef = useRef(null);
  const liRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [liHeight, setLiHeight] = useState(0);
  const [setInputVisible, setSetInputVisible] = useState(false);
  const [getInputVisible, setGetInputVisible] = useState(false);
  const [removeInputVisible, setRemoveInputVisible] = useState(false);

  const [value, setValue] = useState('');
  const [key, setKey] = useState('');
  const [keyToGet, setKeyToGet] = useState('');
  const [keyToRemove, setKeyToRemove] = useState('');

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
    setRemoveInputVisible(false);


  };

  const handleSetVisibility = () => {
    setSetInputVisible(!setInputVisible);
    setGetInputVisible(false);
    setRemoveInputVisible(false);


  };
  const handleGetVisibility = () => {
    setGetInputVisible(!getInputVisible);
    setSetInputVisible(false);
    setRemoveInputVisible(false);

  };
  const handleRemoveVisibility = () => {
    setRemoveInputVisible(!removeInputVisible);
    setSetInputVisible(false);
    setGetInputVisible(false);


  };

  const handleSet = () => {
    if (key && value) {

      dispatch(set({ key, value }));
      setValue('');
      setKey('');
    }
  };

  const handleGet = () =>{
     if(keyToGet){
      const key = keyToGet;
      dispatch(get(key))
     }
     setKeyToGet('');
  }
  const handleRemove = () =>{
     if(keyToRemove){
      const key = keyToRemove;
      dispatch(remove(key))
     }
     setKeyToRemove('');
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
              <button style={{ height: liHeight }} onClick={handleSet} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleSetVisibility}>Set</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${getInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={keyToGet} onChange={(e) => setKeyToGet(e.target.value)} className='input-field' id='insert-value' placeholder="Enter Key to get:" />
             <button style={{ height: liHeight }} onClick={handleGet} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleGetVisibility}>Get</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${removeInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={keyToRemove} onChange={(e) => setKeyToRemove(e.target.value)} className='input-field' id='insert-value' placeholder="Enter Key to get:" />
             <button style={{ height: liHeight }} onClick={handleRemove} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleRemoveVisibility}>Remove</button>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default HashHandler;
