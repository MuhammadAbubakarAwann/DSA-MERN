import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import DoublyListElement from './DoublyListElement';

const DoublyListContainer = () => {
  const doublyLinkedList = useSelector((state) => state.doublyLinkedList.head);
  const searchResult = useSelector((state) => state.doublyLinkedList.searchResults);

  const [highlightedIndices, setHighlightedIndices] = useState([]);


  const renderDoublyLinkedList = (head) => {
    const elements = [];
    let current = head;
    let index = 0;

    while (current) {
      elements.push(
        <DoublyListElement
          key={current.time}
          item={current}
          index={index}
          isHighlighted={highlightedIndices.includes(index)}
        />
      );
      current = current.next;
      index++;
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
        {renderDoublyLinkedList(doublyLinkedList)}
      </AnimatePresence>
    </div>
  );
};

export default DoublyListContainer;
