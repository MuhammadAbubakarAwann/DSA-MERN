import React from 'react';
import { useSelector } from 'react-redux';

const BusBottom = () => {
  const busColor = useSelector((state) => state.object.object.busColor)
  return (
    <div className="bottom" style={{display : busColor ? 'block' : 'none', backgroundColor: busColor}}>
      <div className="stripe"></div>
    </div>
  );
};

export default BusBottom;
