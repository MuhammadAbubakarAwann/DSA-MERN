import React from 'react'
import { useSelector } from 'react-redux';

const ResultContainer = () => {

  const operationResult = useSelector((state) => state.linkedList.operationResults || null);

  return (
    <div className='result-container'>
      {operationResult && <p>{operationResult}</p>}
    </div>
  )
}

export default ResultContainer
