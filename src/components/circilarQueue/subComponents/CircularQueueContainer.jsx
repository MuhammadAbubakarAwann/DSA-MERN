import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import CircularQueueElement from './CircularQueueElement';

const CircularQueueContainer = () => {
  const queue = useSelector((state) => state.circularQueue.queue);

  return (
    <div className="circularQueue-visual">
      <AnimatePresence>
        {queue.map((item, index) => (
          <CircularQueueElement
            key={index}
            item={item}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CircularQueueContainer;
