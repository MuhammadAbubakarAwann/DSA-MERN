import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pushToStack } from '../../../app/services/stackSlice';
import StackHandlers from './subComponents/StackHandlers';
import '../../../css/StackComponent.css';
import StackContainer from './subComponents/StackContainer';
import ResultContainer from './subComponents/ResultContainer';

const StackComponent = () => {
  const stack = useSelector((state) => state.stack.stack);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('stack', JSON.stringify(stack));
  }, [stack]);

  useEffect(() => {
    if (stack.length === 0) {
      const savedStack = localStorage.getItem('stack');
      if (savedStack) {
        JSON.parse(savedStack).forEach((item) => {
          dispatch(pushToStack(item));
        });
      }
    }
  }, [dispatch, stack.length]);


  const peekOfStack = stack.length > 0 ? stack[stack.length - 1] : 'stack is empty'
  const sizeOfStack = stack.length;

  return (
    <div className="stack-container">
      <h2>Stack</h2>
      <div className='stack-handler-wrapper'>
        <StackHandlers />

      </div>      <StackContainer stack={stack} />

      <div><b>Peek</b>: {peekOfStack}</div>
      <div><b>Size</b>: {sizeOfStack}</div>

      
      <div className='result-container-wrapper'>
        <ResultContainer/>
      </div>
    </div>
  )
}

export default StackComponent
