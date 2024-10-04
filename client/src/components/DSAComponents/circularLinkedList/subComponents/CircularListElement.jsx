import React from 'react';
import { motion } from 'framer-motion';

const CircularListElement = ({ item, index, isHighlighted }) => {
  return (
    <motion.div
      className={`list-item ${index === 0 ? 'no-arrow' : ''} ${isHighlighted ? 'highlight' : ''}`}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
      transition={{ duration: 0.8 }}
    >
      {index !== 0 && (
        <motion.div
          className='arrow'
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{ duration: 0.8 }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </motion.div>
      )}
      <div className={`data ${isHighlighted ? 'highlight' : ''}`}>{item.value}</div>
      <div className={`next ${isHighlighted ? 'highlight' : ''}`}>Next</div>
    </motion.div>
  );
};

export default CircularListElement;
