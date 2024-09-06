import React from 'react';
import { useSelector } from 'react-redux';

const BusWindow = () => {
  const windowColor = useSelector((state) => state.object.object.window.window_Color)
  return <div className="window" style={{backgroundColor : windowColor || 'transparent'}}></div>;
};

export default BusWindow;
