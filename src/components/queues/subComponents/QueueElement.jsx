import { motion } from 'framer-motion'
import React from 'react'


const QueueElement = (props) => {
  const { item, index } = props
  return (

    <motion.div
      key={index}
      className={`queue-item `}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div>{item.value}</div>
    </motion.div>

  )
}
export default QueueElement
