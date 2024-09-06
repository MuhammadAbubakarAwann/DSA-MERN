import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ListElement from './ListElement';
import { useSelector } from 'react-redux';

const ListContainer = () => {
  const linkedList = useSelector((state) => state.linkedList.head);
  const searchResult = useSelector((state) => state.linkedList.searchResults);

  const [highlightedIndices, setHighlightedIndices] = useState([]);


  const renderLinkedList = (head) => {
    const elements = [];
    let current = head;
    let index = 0;

    while (current) {
      elements.push(
        <ListElement
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
        {renderLinkedList(linkedList)}
      </AnimatePresence>
    </div>
  );
};

export default ListContainer;
