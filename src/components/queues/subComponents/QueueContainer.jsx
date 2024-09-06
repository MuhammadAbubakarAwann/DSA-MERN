import React from 'react'
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import QueueElement from './QueueElement';

const QueueContainer = () => {
  const queue = useSelector((state) => state.queue.queue)
  return (
    <div className="queue-visual">
       <AnimatePresence>
        {queue.map((item, index) => (
          <QueueElement
            key={item.id || index}
            item={item}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default QueueContainer
