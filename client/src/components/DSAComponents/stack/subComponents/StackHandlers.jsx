import React, { useEffect, useRef, useState } from 'react'
import { pushToStack, popFromStack, peekOfStack, sizeOfStack } from '../../../../app/services/stackSlice';
import { useDispatch, useSelector } from 'react-redux';

const StackHandlers = () => {

  const stack = useSelector((state) => state.stack.stack);
  const dispatch = useDispatch();

  const [pushValue, setPushValue] = useState('');

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const [pushInputVisible, setPushInputVisible] = useState(false);

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
  }, [pushInputVisible]);

  const toggleVisibility = () => {
    setBtnsIsVisible(!btnsIsVisible);
    setPushInputVisible(false)
  };
  const handlePushVisibility = () => {
    setPushInputVisible(!pushInputVisible);

  }

  const handlePush = () => {
    if (pushValue) {
      dispatch(pushToStack(pushValue));
      setPushValue('');
    }
  };
  
  const handlePop = () => {
    const lastItem = stack[stack.length - 1];
    
    if (lastItem) {
      dispatch(popFromStack());
    }
    setPushInputVisible(false)

  };

  const handlePeek = () => {
    dispatch(peekOfStack())
  }

  const handleSize = () => {
    dispatch(sizeOfStack())
  }

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
            <div className={`input-container ${pushInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={pushValue} onChange={(e) => setPushValue(e.target.value)} className='input-field' id='push-value' placeholder="Enter value to Push" />
              <button style={{ height: liHeight }} onClick={handlePush} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handlePushVisibility}>Push</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handlePop} className='pop-button'>Pop</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handlePeek} className='pop-button'>Peek</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleSize} className='pop-button'>Size</button>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default StackHandlers
