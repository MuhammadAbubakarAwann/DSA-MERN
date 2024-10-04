
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import CircularListElement from './CircularListElement';

const CircularListContainer = () => {
  const linkedList = useSelector((state) => state.circularLinkedList.head);
  const searchResult = useSelector((state) => state.circularLinkedList.searchResults);

  const [highlightedIndices, setHighlightedIndices] = useState([]);

  const renderLinkedList = (head) => {
    const elements = [];
    let current = head;
    let index = 0;

    if (current) {
      do {
        elements.push(
          <CircularListElement
            key={current.time || `node-${index}`}
            item={current}
            index={index}
            isHighlighted={highlightedIndices.includes(index)}
          />
        );
        current = current.next;
        index++;
      } while (current !== head && current !== null);
    }

    return elements;
  };

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
    <div className="list-visual">
      <AnimatePresence>
        {renderLinkedList(linkedList)}
      </AnimatePresence>
    </div>
  );
};

export default CircularListContainer;
