import React from 'react';
import { useSelector } from 'react-redux';

const BusWheel = ({ position }) => {

  const wheelColor = useSelector((state) => state.object.object.wheels.wheel_Color)
  return <div className={`wheel ${position}` } style={{backgroundColor : wheelColor || 'transparent'}}>
    <div className='wheel-dial'>
      <div className='line'></div>
    </div>
  </div>;
};

export default BusWheel;
