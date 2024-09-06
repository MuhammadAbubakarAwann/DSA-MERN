import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  object: null
};

const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    setObject: (state, action) => {
      state.object = {
        busColor: '',
        wheels: {
          wheel_Qty: 0,
          wheel_Color: '',
        },
        window: {
          window_Qty: 0,
          window_Color: '',
        },
        door_Color: '',
        ...action.payload,
      };
      console.log("object is created");
    },
    setBusColor: (state, action) => {
      if (state.object) {
        state.object.busColor = action.payload;
      }
    },
    setNumberOfWheels: (state, action) => {
      if (state.object) {
        state.object.wheels.wheel_Qty = action.payload;
      }
    },
    setColorOfWheel: (state, action) => {
      if (state.object) {
        state.object.wheels.wheel_Color = action.payload;
      }
    },
    setNumberOfWindows: (state, action) => {
      if (state.object) {
        state.object.window.window_Qty = action.payload;
      }
    },
    setColorOfWindows: (state, action) => {
      if (state.object) {
        state.object.window.window_Color = action.payload;
      }
    },
    setColorOfDoor: (state, action) => {
      if (state.object) {
        state.object.door_Color = action.payload;
      }
    }
  }
});

export const { 
  setObject,
  setBusColor,
  setNumberOfWheels,
  setColorOfWheel,
  setNumberOfWindows,
  setColorOfWindows,
  setNumberOfDoors,
  setColorOfDoor 
} = objectSlice.actions;

export default objectSlice.reducer;
