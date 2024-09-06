import React from 'react';
import { useSelector } from 'react-redux';

const BusDoor = () => {
  const doorColor = useSelector((state) => state.object.object.door_Color)

  return <div className="door" style={{backgroundColor : doorColor || 'transparent'}}></div>;
};

export default BusDoor;
