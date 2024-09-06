import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { pushToStack, popFromStack } from '../app/services/stackSlice';
import '../css/StackComponent.css';

const StackComponent = () => {
  const stack = useSelector((state) => state.stack.stack);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedStack = localStorage.getItem('stack');
    if (savedStack) {
      JSON.parse(savedStack).forEach((item) => {
        dispatch(pushToStack(item));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('stack', JSON.stringify(stack));
  }, [stack]);

  const handlePush = () => {
    if (inputValue) {
      dispatch(pushToStack(inputValue));
      setInputValue('');
    }
  };

  const handlePop = () => {
    const lastItem = stack[stack.length - 1];
    if (lastItem) {
      dispatch(popFromStack());
    }
  };

  const peekOfStack = stack.length > 0 ? stack[stack.length - 1] : 'stack is empty'
  const sizeOfStack = stack.length;

  return (
    <div className="stack-container">
      <h2>Stack</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a value"
      />
      <button onClick={handlePush}>Push to Stack</button>
      <button onClick={handlePop}>Pop from Stack</button>
      <div className="stack-visual">
        <AnimatePresence>
          {stack.map((item, index) => (
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
          ))}
        </AnimatePresence>

      </div>
      <div><b>Peek</b>: {peekOfStack}</div>
      <div><b>Size</b>: {sizeOfStack}</div>
    </div>
  );
};

export default StackComponent;
<div id='insert'>
          <input type="text" className="input-field" id='insert' />
          <button className="submit-button" id='insertGoButton'>Submit</button>
          </div>
          <div id='insert'>
          <input type="text" className="input-field" id='insert' />
          <button className="submit-button" id='insertGoButton'>Submit</button>
          </div>
          <div id='insert'>
          <input type="text" className="input-field" id='insert' />
          <button className="submit-button" id='insertGoButton'>Submit</button>
          </div>