import React from 'react';
import { useSelector } from 'react-redux';
import BusWindow from './busWindows';
import BusDoor from './BusDoor';

const BusTop = () => {
  const numberOfWindows = useSelector((state) => state.object.object.window.window_Qty);
  const busCreated = useSelector((state) => state.object.object);

  return (
    <div className="top">
      <div className="windows">
        {busCreated &&  Array.from({ length: numberOfWindows }).map((_, index) => (
            <BusWindow key={index} />
          ))
        }
      </div>
      {<BusDoor />}
    </div>
  );
};

export default BusTop;
