import { motion } from 'framer-motion';
import React from 'react';

const ArrayElement = ({ item, index, isHighlighted }) => {
  return (
    <motion.div
      key={index}
      className={`array-item ${isHighlighted ? 'highlight' : ''}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -50 }} 
      transition={{ duration: 0.8 }}
      layout 
    >
      <div>{item.value}</div>
    </motion.div>
  );
};

export default ArrayElement;
