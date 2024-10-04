import { createSlice } from "@reduxjs/toolkit";
const isEmpty = (state) => {
  return state.queue.length === 0;
}

const queueSlice = createSlice({
  name: 'queue',
  initialState: {
    queue: [],
    operationResults: '',
  },
  reducers: {
    enqueue: (state, action) => {
      let time = new Date().getTime();
      const newObj = {
        id: time,
        value : action.payload
      }

      const result = state.queue.push(newObj);
      if (result) {
        state.operationResults = `Element ${action.payload} added to queue.`
      } else {
        state.operationResults = `Error while adding value to queue`
      }
    },

    dequeue: (state, action) => {
      if (isEmpty(state)) {
        state.operationResults = `queueu is Empty`
        return;
      }
      const result = state.queue.shift();
      if (result) {
        state.operationResults = `removed value ${result.value} form queue`
      }
      else {
        state.operationResults = `Error While Removing the elements`
      }
    },
    findFront : (state) => {
      if(isEmpty(state)){
        state.operationResults = `queueu is Empty`;
        return;
      }
      const front = state.queue[0].value;
      if(front){
        state.operationResults = `front element is ${state.queue[0].value}`
      }else{
        state.operationResults = `Error While Finding the front element`
      }
      
    },
    getSize: (state) => {
      if(isEmpty(state)){
        state.operationResults = `queueu is Empty`
        return;
      }
      const size = state.queue.length;
      if(size){
        state.operationResults = `size of queue is ${size}`
      }else{
        state.operationResults = `Error While Finding the size of queue`
      }
    }

  }
})

export const { enqueue ,dequeue, findFront, getSize } = queueSlice.actions;
export default queueSlice.reducer;