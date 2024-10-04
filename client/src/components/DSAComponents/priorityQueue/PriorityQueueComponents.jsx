import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PriorityQueueContainer from './subComponents/PriorityQueueContainer';
import PriorityQueueHandlers from './subComponents/PriorityQueueHandler';
import ResultContainer from './subComponents/ResultContainer';
import { enqueue } from '../../../app/services/priorityQueueSlice';
import '../../../css/QueueComponent.css';

const PriorityQueueComponents = () => {
  const queue = useSelector((state) => state.priorityQueue.queue);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('priorityQueue', JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    if(queue.length === 0){
      const savedQueue = localStorage.getItem('priorityQueue');
    if (savedQueue) {
      JSON.parse(savedQueue).forEach((item) => {
        dispatch(enqueue({element: item.element, priority:item.priority}));
      });
    }
    }
  }, [dispatch, queue.length]);



  return (
    <div className="queue-container">
      <h2>Priority Queue</h2>
      <div className='queue-handler-wrapper'>
        <PriorityQueueHandlers />
      </div>
      <PriorityQueueContainer />
      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  );
};

export default PriorityQueueComponents;
