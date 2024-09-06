import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CacheElement from './CacheElement';

const CacheContainer = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const table = useSelector((state) => state.cache.table);
  const operationResults = useSelector((state) => state.cache.operationResults);

  useEffect(() => {
    if (operationResults) {
      const match = operationResults.match(/at index: (\d+)/);
      if (match) {
        setHighlightedIndex(parseInt(match[1], 10));
        const timeout = setTimeout(() => setHighlightedIndex(null), 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [operationResults]);

  return (
    <div className="hash-visual">
      {table.map((item, index) => (
        <CacheElement
          key={index}
          item={item}
          isHighlighted={highlightedIndex === index}
        />
      ))}
    </div>
  );
};

export default CacheContainer;
