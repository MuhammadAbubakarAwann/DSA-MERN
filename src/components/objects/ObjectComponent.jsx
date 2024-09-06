import React from 'react'
import ObjectContainer from './subComponents/ObjectContainer'
import '../../css/ObjectComponent.css';
import ObjectHandlers from './subComponents/ObjectHandlers';


const ObjectComponent = () => {

  
  
  return (
    <div className='object-container'>

      <div className='object-container-wrapper'>
        <ObjectContainer />
      </div>
      <div className="object-handlers-wrapper">
        <ObjectHandlers/>
      </div>

    </div>
  )
}

export default ObjectComponent
