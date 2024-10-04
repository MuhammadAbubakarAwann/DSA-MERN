import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { insert, remove, update } from '../../../../app/services/BSTslice';

const BSTHandler = () => {

  const dispatch = useDispatch();

  const [insertValue, setInsertValue] = useState('');
  const [removeValue, setRemoveValue] = useState('');
  const [updateKey, setUpdatekey] = useState('');
  const [newValue, setNewValue] = useState('');

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const [insertInputVisible, setInsertInputVisible] = useState(false);
  const [removeInputVisible, setRemoveInputVisible] = useState(false);
  const [updateInputVisible, setUpdateInputVisible] = useState(false);

  const uniqueID = useSelector((state) => state.uniqueID);
  const [containerHeight, setContainerHeight] = useState(0);
  const [liHeight, setLiHeight] = useState(0);


  const containerRef = useRef(null);
  const liRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }

    if (liRef.current) {
      setLiHeight(liRef.current.scrollHeight);
    }
  }, [insertInputVisible]);

  const toggleVisibility = () => {
    setBtnsIsVisible(!btnsIsVisible);
    setInsertInputVisible(false)
    setRemoveInputVisible(false)
    setUpdateInputVisible(false)
  };
  const handleInsertVisibility = () => {
    setInsertInputVisible(!insertInputVisible);
    setRemoveInputVisible(false)
    setUpdateInputVisible(false)
  }
  const handleRemoveVisibility = () => {
    setRemoveInputVisible(!removeInputVisible);
    setInsertInputVisible(false)
    setUpdateInputVisible(false)
  }
  const handleUpdateVisibility = () => {
    setUpdateInputVisible(!updateInputVisible)
    setRemoveInputVisible(false);
    setInsertInputVisible(false)
  }
  const handleInsert = () => {
    const value = insertValue
    if (value) {
      dispatch(insert({ value, key: value, id: uniqueID }));
      setInsertValue('');
    }
  };
  const handleRemove = () => {
    const key = removeValue
    if (key) {
      dispatch(remove(key));
      setRemoveValue('');
    }
  };
  const handleUpdate = () => {
    const key = updateKey
    const newVal = newValue;
    if (key && newVal) {
      dispatch(update({ key, newVal }));
      setUpdatekey('');
      setNewValue('')
    }
  };

  return (
    <div className='array-handler-container'>
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
            <div className={`input-container ${insertInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={insertValue} onChange={(e) => setInsertValue(e.target.value)} className='input-field' id='push-value' placeholder="Enter value to insert" />
              <button style={{ height: liHeight }} onClick={handleInsert} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleInsertVisibility}>Insert</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${removeInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={removeValue} onChange={(e) => setRemoveValue(e.target.value)} className='input-field' id='push-value' placeholder="Enter value to remove" />
              <button style={{ height: liHeight }} onClick={handleRemove} className='inp-button' id='remove-value-go-btn'> Go</button>
            </div>
            <button onClick={handleRemoveVisibility}>remove</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${updateInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={updateKey} onChange={(e) => setUpdatekey(e.target.value)} className='input-field' id='update-key' placeholder="Enter key to update" />
              <input type="text" style={{ height: liHeight }} value={newValue} onChange={(e) => setNewValue(e.target.value)} className='input-field' id='new-value' placeholder="Enter new value:" />
              <button style={{ height: liHeight }} onClick={handleUpdate} className='inp-button' id='update-value-go-btn'> Go</button>
            </div>
            
            <button onClick={handleUpdateVisibility}>update</button>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default BSTHandler
