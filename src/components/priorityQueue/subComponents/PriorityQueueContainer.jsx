import React from 'react'
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import PriorityQueueElement from './PriorityQueueElement';

const PriorityQueueContainer = () => {
  const queue = useSelector((state) => state.priorityQueue.queue)
  console.log("queue:",queue)
  return (
    <div className="queue-visual">
       <AnimatePresence>
        {queue.map((item, index) => (
          <PriorityQueueElement
            key={item.priority || index}
            item={item.element}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default PriorityQueueContainer
