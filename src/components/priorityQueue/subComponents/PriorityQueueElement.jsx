import { motion } from 'framer-motion'
import React from 'react'


const PriorityQueueElement = (props) => {
  const { item, index } = props
  console.log("item:",item)
  return (

    <motion.div
      key={index}
      className={`queue-item `}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div>{item}</div>
    </motion.div>

  )
}
export default PriorityQueueElement
