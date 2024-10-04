import React from 'react';
import BusWheel from './objectElement/BusWheel';
import BusTop from './objectElement/BusTop';
import BusBottom from './objectElement/BusBottom';
import { useSelector } from 'react-redux';

const ObjectContainer = () => {
  const busColor = useSelector((state) => state.object.object?.busColor);
  const wheelQty = useSelector((state) => state.object.object?.wheels.wheel_Qty);
  const createBus = useSelector((state) => state.object.object); 

  return (
    <div className="bus" style={{ display: createBus ? 'block' : 'none', backgroundColor: busColor || 'transparent' }}>
      {createBus && <BusTop />}
      {createBus && <BusBottom />}
      {createBus && wheelQty === 2 && <BusWheel position="front-wheel" />}
      {createBus && wheelQty === 2 && <BusWheel position="back-wheel" />}
      {createBus && wheelQty === 3 && <BusWheel position="middle-wheel" />}
      {createBus && wheelQty === 3 && <BusWheel position="front-wheel" />}
      {createBus && wheelQty === 3 && <BusWheel position="back-wheel" />}
      
    </div>
  );
};

export default ObjectContainer;
