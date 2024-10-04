import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dequeue, enqueue, peek } from '../../../../app/services/priorityQueueSlice';


const PriorityQueueHandlers = () => {

  const queue = useSelector((state) => state.priorityQueue.queue);
  const dispatch = useDispatch();

  const [enqueueValue, setEnqueueValue] = useState('');
  const [valuePriority, setValuePriority] = useState('');
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
    let element = enqueueValue;
    let priority = valuePriority;

    if (element && priority) {
      dispatch(enqueue({element, priority}));
      setEnqueueValue('');
    }
  };

  const handleDequeue = () => {
    if (queue.length > 0) {
      dispatch(dequeue());
    } else {
      console.log("Queue is empty");
    }
    setEnqueueInputVisible(false);
  };
  

  const handlePeek = () => {
    dispatch(peek())
  }


  return (
    <div className='queue-handler-container'>
      <button
        className="toggle-button"
        style={{ height: containerHeight }}
        onClick={toggleVisibility}
      >
        {btnsIsVisible ? '<' : '>'}
      </button>

      <div
        ref={containerRef}
        className={`queue-btns-container ${btnsIsVisible ? 'slide-in' : 'slide-out'}`}
      >
        <ul>
          <li ref={liRef}>
            <div className={`input-container ${enqueueInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input type="text" style={{ height: liHeight }} value={enqueueValue} onChange={(e) => setEnqueueValue(e.target.value)} className='input-field' id='push-value' placeholder="Enter value to Enqueue" />
              <input type="text" style={{ height: liHeight }} value={valuePriority} onChange={(e) => setValuePriority(e.target.value)} className='input-field' id='push-value' placeholder="Enter priroity of value " />
              <button style={{ height: liHeight }} onClick={handleEnqueue} className='inp-button' id='insert-value-go-btn'> Go</button>
            </div>
            <button onClick={handleEnqueueVisibility}>Enqueue</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleDequeue} className='dequeue-button'>Dequeue</button>
          </li>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handlePeek} className='peek-button'>Peek</button>
          </li>
          {/* <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleSize} className='size-button'>Size</button>
          </li> */}
        </ul>

      </div>
    </div>
  )
}

export default PriorityQueueHandlers
