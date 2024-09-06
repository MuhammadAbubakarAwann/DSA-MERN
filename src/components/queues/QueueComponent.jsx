import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QueueHandler from './subComponents/QueueHandler';
import QueueContainer from './subComponents/QueueContainer';
import ResultContainer from './subComponents/ResultContainer';
import { enqueue } from '../../app/services/queueSlice';
import '../../css/QueueComponent.css';

const QueueComponent = () => {
  const queue = useSelector((state) => state.queue.queue);
  const dispatch = useDispatch();

  useEffect(() => {
    if(queue.length === 0){
      const savedQueue = localStorage.getItem('queue');
    if (savedQueue) {
      JSON.parse(savedQueue).forEach((item) => {
        dispatch(enqueue(item.value));
      });
    }
    }
  }, [dispatch, queue.length]);

  // Persist the queue to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('queue', JSON.stringify(queue));
  }, [queue]);

  return (
    <div className="queue-container">
      <h2>Queue</h2>
      <div className='queue-handler-wrapper'>
        <QueueHandler />
      </div>
      <QueueContainer />
      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  );
};

export default QueueComponent;
