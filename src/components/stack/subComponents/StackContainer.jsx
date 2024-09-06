import React from 'react'
import { AnimatePresence } from 'framer-motion';
import StackElement from './StackElement';

const StackContainer = (props) => {
  return (
    <div className="stack-visual">
      <AnimatePresence>
        {props.stack.map((item, index) => (
          <StackElement key={item.id || index} item={item} index={index} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default StackContainer
