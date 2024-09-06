import React, { useEffect, useRef, useState } from 'react';
import { addNode, addNodeAt, findNode, getSize, removeNode } from '../../../app/services/circularLinkedListSlice';
import { useDispatch } from 'react-redux';

const CircularListHandler = () => {
  const dispatch = useDispatch();

  const [addValue, setAddValue] = useState('');
  const [removeIndex, setRemoveIndex] = useState('');
  const [findValue, setFindValue] = useState('');
  const [valueToAdd, setValueToAdd] = useState('');
  const [indexToAdd, setIndexToAdd] = useState('');

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const [addNodeBtnsIsVisible, setAddNodeBtnsIsVisible] = useState(false);
  const [addNodeAtBtnsIsVisible, setAddNodeAtBtnsIsVisible] = useState(false);
  const [removeNodeBtnsIsVisible, setRemoveNodeBtnsIsVisible] = useState(false);
  const [findNodeBtnsIsVisible, setFindNodeBtnsIsVisible] = useState(false);

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
  }, [addNodeBtnsIsVisible]);

  const toggleVisibility = () => {
    setBtnsIsVisible(!btnsIsVisible);
    setAddNodeBtnsIsVisible(false);
    setRemoveNodeBtnsIsVisible(false);
    setFindNodeBtnsIsVisible(false);
  };

  const handleAddNodeInpVisibility = () => {
    setAddNodeBtnsIsVisible(!addNodeBtnsIsVisible);
    setRemoveNodeBtnsIsVisible(false);
    setFindNodeBtnsIsVisible(false);
    setAddNodeAtBtnsIsVisible(false);
  };

  const handleAddNodeAtInpVisibility = () => {
    setAddNodeAtBtnsIsVisible(!addNodeAtBtnsIsVisible);
    setRemoveNodeBtnsIsVisible(false);
    setFindNodeBtnsIsVisible(false);
    setAddNodeBtnsIsVisible(false);
  };

  const handleRemoveNodeInpVisibility = () => {
    setRemoveNodeBtnsIsVisible(!removeNodeBtnsIsVisible);
    setAddNodeBtnsIsVisible(false);
    setFindNodeBtnsIsVisible(false);
    setAddNodeAtBtnsIsVisible(false);
  };

  const handleFindeNodeInpVisibility = () => {
    setFindNodeBtnsIsVisible(!findNodeBtnsIsVisible);
    setAddNodeBtnsIsVisible(false);
    setRemoveNodeBtnsIsVisible(false);
    setAddNodeAtBtnsIsVisible(false);
  };

  const handleAddNode = () => {
    if (addValue) {
      dispatch(addNode(addValue));
    }
    setAddValue('');
  };

  const handleAddNodeAt = () => {
    const index = parseInt(indexToAdd, 10);
    if (!isNaN(index) && valueToAdd) {
      dispatch(addNodeAt({ index, value: valueToAdd }));
      setIndexToAdd('');
      setValueToAdd('');
    }
  };

  const handleRemoveNode = () => {
    if (removeIndex) {
      dispatch(removeNode(removeIndex));
    }
    setRemoveIndex('');
  };

  const handleFindValue = () => {
    if (findValue) {
      dispatch(findNode(findValue));
    }
    setFindValue('');
  };

  const handleSize = () => {
    dispatch(getSize());
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
        className={`list-btns-container ${btnsIsVisible ? 'slide-in' : 'slide-out'}`}
      >
        <ul>
          <li ref={liRef}>
            <div className={`input-container ${addNodeBtnsIsVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={addValue} onChange={(e) => setAddValue(e.target.value)} className='input-field' id='insert-value' placeholder="Enter value to insert" />
              <button style={{ height: liHeight }} onClick={handleAddNode} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleAddNodeInpVisibility}>Insert</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${removeNodeBtnsIsVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={removeIndex} onChange={(e) => setRemoveIndex(e.target.value)} className='input-field' id='remove-value' placeholder="Enter Index to remove" />
              <button style={{ height: liHeight }} onClick={handleRemoveNode} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleRemoveNodeInpVisibility}>Remove</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${findNodeBtnsIsVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={findValue} onChange={(e) => setFindValue(e.target.value)} className='input-field' id='find-value' placeholder="Enter Value to Find" />
              <button style={{ height: liHeight }} onClick={handleFindValue} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleFindeNodeInpVisibility}>Find</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${addNodeAtBtnsIsVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={indexToAdd} onChange={(e) => setIndexToAdd(e.target.value)} className='input-field' id='find-value' placeholder="Enter index" />
              <input type="text" style={{ height: liHeight }} value={valueToAdd} onChange={(e) => setValueToAdd(e.target.value)} className='input-field' id='find-value' placeholder="Enter Value to insert" />
              <button style={{ height: liHeight }} onClick={handleAddNodeAt} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleAddNodeAtInpVisibility}>Insert at</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleSize} className='size-button'>size</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CircularListHandler;
