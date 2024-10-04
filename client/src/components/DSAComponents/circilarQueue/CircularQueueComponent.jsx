import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enqueue } from '../../../app/services/queueSlice';
import CircularQueueHandler from './subComponents/CircularQueueHandler';
import CircularQueueContainer from './subComponents/CircularQueueContainer';
import ResultContainer from './subComponents/ResultContainer';
import '../../../css/CircularQueueComponent.css'

const CircularQueueComponent = () => {
  const queue = useSelector((state) => state.circularQueue.queue);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedQueue = localStorage.getItem('circularQueue');
    if (savedQueue) {
      JSON.parse(savedQueue).forEach((item) => {
        dispatch(enqueue(item));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('circularQueue', JSON.stringify(queue));
  }, [queue]);

  return (
    <div className="circularQueue-container">
      <h2>Circular Queue</h2>
      <div className='circularQueue-handler-wrapper'>
        <CircularQueueHandler />
      </div>
      <CircularQueueContainer />
      <div className='result-container-wrapper'>
        <ResultContainer />
      </div>
    </div>
  );
};

export default CircularQueueComponent;
