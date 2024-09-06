import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HashElement from './HashElement';

const HashContainer = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const table = useSelector((state) => state.hashTable.table);
  const operationResults = useSelector((state) => state.hashTable.operationResults);

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
      {table.map((bucket, index) => (
        bucket && bucket.map((item, itemIndex) => (
          <HashElement
            key={`${index}-${itemIndex}`}
            item={item}
            isHighlighted={highlightedIndex === index}
          />
        ))
      ))}
    </div>
  );
};

export default HashContainer;
