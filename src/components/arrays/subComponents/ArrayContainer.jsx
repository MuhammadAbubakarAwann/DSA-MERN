
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import ArrayElement from './ArrayElement';

const ArrayContainer = () => {
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const array = useSelector((state) => state.array.array || []);
  const searchResult = useSelector((state) => state.array.searchResult || null);

  useEffect(() => {
    if (searchResult && searchResult.indices.length > 0) {
      setHighlightedIndices(searchResult.indices);
      const timeout = setTimeout(() => {
        setHighlightedIndices([]);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [searchResult]);

  return (
    <div className="array-visual">
      <AnimatePresence>
        {array.map((item, index) => (
          <ArrayElement
            key={item.time || index}
            item={item}
            index={index}
            isHighlighted={highlightedIndices.includes(index)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ArrayContainer;
