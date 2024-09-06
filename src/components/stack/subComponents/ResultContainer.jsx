import React from 'react'
import { useSelector } from 'react-redux';

const ResultContainer = (props) => {

  const operationResult = useSelector((state) => state.stack.operationResults || null);

  
  return (
    <div className='result-container'>
      {operationResult && <p>{operationResult}</p>}
    </div>
  )
}

export default ResultContainer
