import React from 'react';
import { useSelector } from 'react-redux';

const CircularQueueElement = (props) => {
  const { item, index } = props;
  const rear = useSelector((state) => state.circularQueue.rear);
  const front = useSelector((state) => state.circularQueue.front);

  const isRear = index === rear;
  const isFront = index === front;

  return (
    <div className='cq-element'>
      <div
        className={`circularQueue-item ${isRear ? 'rear' : ''} ${isFront ? 'fr' : ''}`}
      >
        {item !== null ? (
          <div>Value: {item}, Index: {index}</div>
        ) : (
          <div>Empty Slot, Index: {index}</div>
        )}
      </div>
      <div>
        {isRear ? (
          <div>
            <i className="fa-solid fa-arrow-up"></i>
            <p>rear</p></div>
        ) : (
          <div></div>
        )}


        {isFront ? (
          <div>
            <i className="fa-solid fa-arrow-up"></i>
            <p>front</p></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CircularQueueElement;
