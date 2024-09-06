import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertToArray, removeFromArray, removeSpecificFromArray, updateValueInArray, bubbleSortArray, searchInArray, selectionSortArray, binarySearchInArray } from '../../../app/services/arraySlice';

const ArrayHandler = () => {
  const array = useSelector((state) => state.array.array);
  const dispatch = useDispatch();

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const containerRef = useRef(null);
  const liRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [liHeight, setLiHeight] = useState(0);
  const [insertInputVisible, setInsertInputVisible] = useState(false);
  const [removeInputVisible, setRemoveInputVisible] = useState(false);
  const [updateInputVisible, setUpdateInputVisible] = useState(false);
  const [selectInputVisible, setSelectInputVisible] = useState(false);
  const [BinarySearchInputVisible, setBinarySearchInputVisible] = useState(false);
  const [sortBtnsVisible, setSortBtnsVisible] = useState(false);

  const [insertValue, setInsertValue] = useState('');
  const [removeValue, setRemoveValue] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');
  const [indexToUpdate, setIndexToUpdate] = useState('');
  const [selectValue, setSelectValue] = useState('');

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
    setInsertInputVisible(false);
    setRemoveInputVisible(false);
    setUpdateInputVisible(false);
    setSelectInputVisible(false);
    setSortBtnsVisible(false);
  };

  const handleInsertVisibility = () => {
    setInsertInputVisible(!insertInputVisible);
    setRemoveInputVisible(false);
    setUpdateInputVisible(false);
    setSelectInputVisible(false);
    setSortBtnsVisible(false);

  };

  const handleRemoveVisibility = () => {
    setRemoveInputVisible(!removeInputVisible);
    setInsertInputVisible(false);
    setUpdateInputVisible(false);
    setSelectInputVisible(false);
    setSortBtnsVisible(false);
  };

  const handleUpdateVisibility = () => {
    setUpdateInputVisible(!updateInputVisible);
    setInsertInputVisible(false);
    setRemoveInputVisible(false);
    setSelectInputVisible(false);
    setSortBtnsVisible(false);
  };

  const handleSelectVisibility = () => {
    setSelectInputVisible(!selectInputVisible);
    setInsertInputVisible(false);
    setRemoveInputVisible(false);
    setUpdateInputVisible(false);
    setSortBtnsVisible(false);
  };
  const handleBinarySearchVisibility = () => {
    setBinarySearchInputVisible(!BinarySearchInputVisible);
    setInsertInputVisible(false);
    setRemoveInputVisible(false);
    setUpdateInputVisible(false);
    setSortBtnsVisible(false);
  };
  const handleSortVisibility = () => {
    setSortBtnsVisible(!sortBtnsVisible);
    setInsertInputVisible(false);
    setRemoveInputVisible(false);
    setUpdateInputVisible(false);
    setSelectInputVisible(false);

  };

  const handleInsert = () => {
    if (insertValue) {
      dispatch(insertToArray(insertValue));
      setInsertValue('');
    }
  };

  const handleRemove = () => {
    const index = parseInt(removeValue, 10);
    if (!isNaN(index)) {
      dispatch(removeSpecificFromArray(index));
      setRemoveValue('');
    }
  };

  const handleRemoveLast = () => {
    if (array.length > 0) {
      dispatch(removeFromArray());
    }
  };

  const handleUpdate = () => {
    const index = parseInt(indexToUpdate, 10);
    if (!isNaN(index) && updatedValue) {
      dispatch(updateValueInArray({ index, newValue: updatedValue }));
      setUpdatedValue('');
      setIndexToUpdate('');
    }
  };

  const handleBubbleSort = () => {
    dispatch(bubbleSortArray());
  };
  const handleSelectionSort = () => {
    dispatch(selectionSortArray());
  };

  const handleSelect = () => {
    if (selectValue) {
      dispatch(searchInArray(selectValue));
      setSelectValue('');
    }
  };
  const handleBinarySearch = () => {
    if (selectValue) {
      dispatch(binarySearchInArray(selectValue));
      setSelectValue('');
    }
  };



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
            <div className={`input-container ${insertInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={insertValue} onChange={(e) => setInsertValue(e.target.value)} className='input-field' id='insert-value' placeholder="Enter value" />
              <button style={{ height: liHeight }} onClick={handleInsert} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleInsertVisibility}>Insert</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${removeInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={removeValue} onChange={(e) => setRemoveValue(e.target.value)} className='input-field' id='remove-value' placeholder="Enter index" />
              <button style={{ height: liHeight }} onClick={handleRemove} className='inp-button' id='remove-value-go-btn'> Go</button>
              <button style={{ height: liHeight }} className='rem-button' id='rem_button' onClick={handleRemoveLast}>Remove last index</button>
            </div>
            <button onClick={handleRemoveVisibility}>Remove</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${updateInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={indexToUpdate} onChange={(e) => setIndexToUpdate(e.target.value)} className='input-field' id='update-index' placeholder="Enter index to update" />
              <input type="text" style={{ height: liHeight }} value={updatedValue} onChange={(e) => setUpdatedValue(e.target.value)} className='input-field' id='update-value' placeholder="Enter new value" />
              <button style={{ height: liHeight }} onClick={handleUpdate} className='inp-button' id='update-value-go-btn'> Go</button>
            </div>
            <button onClick={handleUpdateVisibility}>Update</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${sortBtnsVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <button style={{ height: liHeight }} onClick={handleBubbleSort} className='sort-button' id='bubble-sort-go'>Bubble Sort</button>
              <button style={{ height: liHeight }} onClick={handleSelectionSort} className='sort-button' id='selection-sort-go'>Selection Sort</button>
            </div>
            <button onClick={handleSortVisibility} >Sort</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${selectInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={selectValue} onChange={(e) => setSelectValue(e.target.value)} className='input-field' id='select-value' placeholder="Enter value to select" />
              <button style={{ height: liHeight }} onClick={handleSelect} className='inp-button' id='select-value-go-btn'> Go</button>
            </div>
            <button onClick={handleSelectVisibility}>Select</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${BinarySearchInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={selectValue} onChange={(e) => setSelectValue(e.target.value)} className='input-field' id='select-value' placeholder="Enter value to select" />
              <button style={{ height: liHeight }} onClick={handleBinarySearch} className='inp-button' id='select-value-go-btn'> Go</button>
            </div>
            <button onClick={handleBinarySearchVisibility}>B-search</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArrayHandler;
