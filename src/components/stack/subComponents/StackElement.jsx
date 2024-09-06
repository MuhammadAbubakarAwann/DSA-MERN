import { motion } from 'framer-motion'
import React from 'react'


const StackElement = (props) => {
  const { item, index} = props
  return (
    <>
      <motion.div
        key={index}
        className="stack-item"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        {item}
      </motion.div>
    </>
  )
}

export default StackElement
