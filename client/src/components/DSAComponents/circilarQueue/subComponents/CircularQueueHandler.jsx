import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dequeue, enqueue } from '../../../../app/services/circularQueueSlice';


const CircularQueueHandler = () => {

  const queue = useSelector((state) => state.circularQueue.queue);
  const dispatch = useDispatch();

  const [enqueueValue, setEnqueueValue] = useState('');

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const [enqueueInputVisible, setEnqueueInputVisible] = useState(false);

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
  }, [enqueueInputVisible]);

  const toggleVisibility = () => {
    setBtnsIsVisible(!btnsIsVisible);
    setEnqueueInputVisible(false)
  };
  const handleEnqueueVisibility = () => {
    setEnqueueInputVisible(!enqueueInputVisible);

  }

  const handleEnqueue = () => {
    if (enqueueValue) {
      dispatch(enqueue(enqueueValue));
      setEnqueueValue('');
    }
  };

  const handleDequeue = () => {
    const lastItem = queue[queue.length - 1];

    if (lastItem) {
      dispatch(dequeue());
    } 
    setEnqueueInputVisible(false)


  };

  // const handleFront = () => {
  //   dispatch(findFront())
  // }

  // const handleSize = () => {
  //   dispatch(getSize())
  // }

  return (
    <div className='circularQueue-handler-container'>
      <button
        className="toggle-button"
        style={{ height: containerHeight }}
        onClick={toggleVisibility}
      >
        {btnsIsVisible ? '<' : '>'}
      </button>

      <div
        ref={containerRef}
        className={`circularQueue-btns-container ${btnsIsVisible ? 'slide-in' : 'slide-out'}`}
      >
        <ul>
          <li ref={liRef}>
            <div className={`input-container ${enqueueInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={enqueueValue} onChange={(e) => setEnqueueValue(e.target.value)} className='input-field' id='push-value' placeholder="Enter value to Enqueue" />
              <button style={{ height: liHeight }} onClick={handleEnqueue} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleEnqueueVisibility}>Enqueue</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleDequeue} className='decircularQueue-button'>Dequeue</button>
          </li>
          {/* <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleFront} className='pop-button'>Front</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleSize} className='size-button'>Size</button>
          </li> */}
        </ul>

      </div>
    </div>
  )
}

export default CircularQueueHandler
