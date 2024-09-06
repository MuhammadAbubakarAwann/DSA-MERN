
import React, { useEffect, useRef, useState } from 'react';
import { find, insert, traverse } from '../../../app/services/binaryTreeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { incrementUniqueId } from '../../../app/services/utilities/uniqueIdSlice';

const BinaryTreeHandlers = () => {
  const dispatch = useDispatch();
  const root = useSelector(state => state.binaryTree.root);
  const uniqueID = useSelector((state) => state.uniqueID);


  const [rootValue, setRootValue] = useState('');
  const [valueToSearch, setValueToSearch] = useState('');
  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const [rootInputVisible, setRootInputVisible] = useState(false);
  const [searctInputVisible, setSearchInputVisible] = useState(false);
  const [traverseInputVisible, setTraverseInputVisible] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [liHeight, setLiHeight] = useState(0);

  const containerRef = useRef(null);
  const liRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }

    if (liRef.current) {
      setLiHeight(liRef.current.scrollHeight);
    }
  }, [rootInputVisible]);

  const toggleVisibility = () => {
    setBtnsIsVisible(!btnsIsVisible);
    setRootInputVisible(false);
    setSearchInputVisible(false);
    setTraverseInputVisible(false)


  };

  const handleRootVisibility = () => {
    setRootInputVisible(!rootInputVisible);
    setSearchInputVisible(false);
    setTraverseInputVisible(false)

  };

  const handleSearchVisibility = () => {
    setSearchInputVisible(!searctInputVisible)
    setRootInputVisible(false);
    setTraverseInputVisible(false)


  };

  const handleTraverseVisibility = () => {
    setTraverseInputVisible(!traverseInputVisible)
    setRootInputVisible(false);
    setSearchInputVisible(false);

  }

  

  const handleRootInsert = () => {
    if (root) {
      alert("Root node already exists");
      return;
    }
    const key = rootValue;
    const value = key;
    dispatch(insert({ parentNodeKey: null, key, value, left: false, right: false, id: uniqueID }));
    dispatch(incrementUniqueId());
    setRootValue("");
  };

  const handleNodeSearch = () => {

    const key = valueToSearch
    if (key) {
      console.log("key to search:", key)

      dispatch(find(key));
    }

    setValueToSearch('');
  }
  const handleTraverseType = (traverseType) => {
    console.log("trav type: ",traverseType)
    dispatch(traverse(traverseType));
  }


  return (
    <div className='array-handler-container'>
      <button
        className="toggle-button"
        style={{ height: containerHeight }}
        onClick={toggleVisibility}
      >
        {btnsIsVisible ? '<' : '>'}
      </button>

      <div
        ref={containerRef}
        className={`tree-btns-container ${btnsIsVisible ? 'slide-in' : 'slide-out'}`}
      >
        <ul>
          <li ref={liRef}>
            <div className={`input-container ${rootInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input
                type="text"
                style={{ height: liHeight }}
                value={rootValue}
                onChange={(e) => setRootValue(e.target.value)}
                className='input-field'
                id='root-value'
                placeholder="Enter root value"
              />
              <button
                style={{ height: liHeight }}
                onClick={handleRootInsert}
                className='inp-button'
                id='insert-root-btn'
              >
                Go
              </button>
            </div>
            <button onClick={handleRootVisibility}>root</button>
          </li>

          <li ref={liRef}>

            <div className={`input-container ${searctInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <input
                type="text"
                style={{ height: liHeight }}
                value={valueToSearch}
                onChange={(e) => setValueToSearch(e.target.value)}
                className='input-field'
                id='search-value'
                placeholder="Enter value to Search"
              />
              <button
                style={{ height: liHeight }}
                onClick={handleNodeSearch}
                className='inp-button'
                id='search-btn'
              >
                Go
              </button>
            </div>
            <button onClick={handleSearchVisibility}>Search</button>
          </li>

          <li ref={liRef}>
            <div className={`input-container ${traverseInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <button style={{ height: liHeight }} onClick={() => handleTraverseType('inOrder')} className='sort-button' id='bubble-sort-go'>in order</button>
              <button style={{ height: liHeight }} onClick={() => handleTraverseType('postOrder')} className='sort-button' id='selection-sort-go'>post order</button>
              <button style={{ height: liHeight }} onClick={() => handleTraverseType('preOrder')} className='sort-button' id='selection-sort-go'>pre order</button>
            </div>
            <button onClick={handleTraverseVisibility} >Traverse</button>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default BinaryTreeHandlers;