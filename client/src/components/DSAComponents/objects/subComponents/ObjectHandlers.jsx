// File: ObjectHandlers.js

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setObject,
  setBusColor,
  setNumberOfWindows,
  setColorOfWindows,
  setColorOfDoor,
  setColorOfWheel,
  setNumberOfWheels,
} from '../../../../app/services/objectSlice';

const ObjectHandlers = () => {


  const dispatch = useDispatch();
  const busCreated = useSelector((state) => state.object.object);

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);
  const [colorInputVisible, SetColorInputVisible] = useState(false);
  const [windowInputVisible, setWindowInputVisible] = useState(false);
  const [doorInputVisible, setDoorInputVisible] = useState(false);
  const [wheelInputVisible, setWheelInputVisible] = useState(false);

  const [containerHeight, setContainerHeight] = useState(0);
  const [liHeight, setLiHeight] = useState(0);

  const containerRef = useRef(null);
  const liRef = useRef(null);

  const toggleVisibility = () => {
    setBtnsIsVisible(!btnsIsVisible);
    SetColorInputVisible(false);
    setWindowInputVisible(false);
    setWheelInputVisible(false);
    setDoorInputVisible(false);
  };

  const handleColorInpVisibilty = () => {
    SetColorInputVisible(!colorInputVisible);
    setWindowInputVisible(false);
    setWheelInputVisible(false);
    setDoorInputVisible(false);
  };
  const handleWindowVisibilty = () => {
    setWindowInputVisible(!windowInputVisible);
    SetColorInputVisible(false);
    setWheelInputVisible(false);
    setDoorInputVisible(false);
  };
  const handleDoorVisibilty = () => {
    setDoorInputVisible(!doorInputVisible);
    SetColorInputVisible(false);
    setWindowInputVisible(false);
    setWheelInputVisible(false);
  };
  const handleWheelsVisibilty = () => {
    setWheelInputVisible(!wheelInputVisible);
    SetColorInputVisible(false);
    setWindowInputVisible(false);
    setDoorInputVisible(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }

    if (liRef.current) {
      setLiHeight(liRef.current.scrollHeight);
    }
  }, [colorInputVisible]);

  const handleCreate = () => {
    dispatch(setObject());
  };

  const handleColorName = (color) => {
    if (color) {
      dispatch(setBusColor(color));
    }
  };
  const handleWindowQtyInp = (qty) => {
    if (qty) {
      dispatch(setNumberOfWindows(qty));
    }
  };
  const handleWindowColorInp = (color) => {
    if (color) {
      dispatch(setColorOfWindows(color));
    }
  };
  const handleDoorColorInp = (color) => {
    if (color) {
      dispatch(setColorOfDoor(color));
    }
  };

  const handleWheelQtyInp = (qty) => {
    if (qty) {
      dispatch(setNumberOfWheels(qty));
    }
  };

  const handleWheelColorInp = (color) => {
    if (color) {
      dispatch(setColorOfWheel(color));
    }
  };

  return (
    <div className="object-handler-container">
      <button
        className="toggle-button"
        style={{ height: containerHeight }}
        onClick={toggleVisibility}
      >
        {btnsIsVisible ? '<' : '>'}
      </button>
      <div
        ref={containerRef}
        className={`object-btns-container ${btnsIsVisible ? 'slide-in' : 'slide-out'}`}
      >
        <ul>
          <li ref={liRef}>
            <button style={{ height: liHeight }} onClick={handleCreate} className='pop-button'>create</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${colorInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <div className="radio-group" style={{ height: liHeight }}>
                <label>
                  <input
                    type="radio"
                    name="busColor"
                    value="yellow"
                    onChange={() => handleColorName('yellow')}
                  />
                  Yellow
                </label>
                <label>
                  <input
                    type="radio"
                    name="busColor"
                    value="grey"
                    onChange={() => handleColorName('grey')}
                  />
                  Grey
                </label>
                <label>
                  <input
                    type="radio"
                    name="busColor"
                    value="white"
                    onChange={() => handleColorName('white')}
                  />
                  White
                </label>
              </div>
            </div>
            <button onClick={handleColorInpVisibilty} disabled = {!busCreated}>Bus Color</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${windowInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <div className="radio-group" style={{ height: liHeight }}>
                <p className='qty-lbl'>Qty</p>
                <label>
                  <input
                    type="radio"
                    name="windowQty"
                    value="1"
                    onChange={() => handleWindowQtyInp(3)}
                  />
                  3
                </label>
                <label>
                  <input
                    type="radio"
                    name="windowQty"
                    value="2"
                    onChange={() => handleWindowQtyInp(4)}
                  />
                  4
                </label>
                <label>
                  <input
                    type="radio"
                    name="windowQty"
                    value="3"
                    onChange={() => handleWindowQtyInp(5)}
                  />
                  5
                </label>

              </div>
              <div className="radio-group" style={{ height: liHeight }}>
                <p className='color-lbl'>color</p>

                <label>
                  <input
                    type="radio"
                    name="windowColor"
                    value="blue"
                    onChange={() => handleWindowColorInp('#8af1ff')}
                  />
                  Blue
                </label>
                <label>
                  <input
                    type="radio"
                    name="windowColor"
                    value="white"
                    onChange={() => handleWindowColorInp('#f9f8de')}
                  />
                  White
                </label>
                <label>
                  <input
                    type="radio"
                    name="windowColor"
                    value="purple"
                    onChange={() => handleWindowColorInp('#e298ff')}
                  />
                  Purple
                </label>
              </div>
            </div>
            <button onClick={handleWindowVisibilty} disabled = {!busCreated}>Bus Window</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${doorInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <div className="radio-group" style={{ height: liHeight }}>

                <label>
                  <input
                    type="radio"
                    name="doorColor"
                    value="black"
                    onChange={() => handleDoorColorInp('#262828')}
                  />
                  Black
                </label>
                <label>
                  <input
                    type="radio"
                    name="doorColor"
                    value="brown"
                    onChange={() => handleDoorColorInp('#6c4007')}
                  />
                  Brown
                </label>
                <label>
                  <input
                    type="radio"
                    name="doorColor"
                    value="yellow"
                    onChange={() => handleDoorColorInp('#a8a066')}
                  />
                  Yellow
                </label>
              </div>
            </div>
            <button onClick={handleDoorVisibilty} disabled = {!busCreated}>Bus Door</button>
          </li>
          <li ref={liRef}>
            <div className={`input-container ${wheelInputVisible ? 'slide-in' : 'slide-out'}`} style={{ height: liHeight }}>
              <div className="radio-group" style={{ height: liHeight }}>
                <p className='qty-lbl'>Qty</p>
                <label>
                  <input
                    type="radio"
                    name="wheelsQty"
                    value="2"
                    onChange={() => handleWheelQtyInp(2)}
                  />
                  2
                </label>
                <label>
                  <input
                    type="radio"
                    name="wheelsQty"
                    value="3"
                    onChange={() => handleWheelQtyInp(3)}
                  />
                  3
                </label>

              </div>
              <div className="radio-group" style={{ height: liHeight }}>
                <p className='color-lbl'>color</p>

                <label>
                  <input
                    type="radio"
                    name="wheelColor"
                    value="black"
                    onChange={() => handleWheelColorInp('black')}
                  />
                  Black
                </label>
                <label>
                  <input
                    type="radio"
                    name="wheelColor"
                    value="white"
                    onChange={() => handleWheelColorInp('white')}
                  />
                  White
                </label>
                <label>
                  <input
                    type="radio"
                    name="wheelColor"
                    value="Yellow"
                    onChange={() => handleWheelColorInp('#ffd000')}
                  />
                  Yellow
                </label>
              </div></div>
            <button onClick={handleWheelsVisibilty} disabled = {!busCreated}>Bus Wheels</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ObjectHandlers;
