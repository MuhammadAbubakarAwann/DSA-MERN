import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  capacity: 7,
  queue: [],
  front: -1,
  rear: -1,
  operationResults: ''
}

const isEmpty = (state) => {
  return state.front === -1;
}

const isFull = (state) => {
  return (state.front === 0 && state.rear === state.capacity - 1  || state.rear === (state.front - 1) % (state.capacity - 1));
}

const circularQueueSLice = createSlice({
  name: 'circularQueue',
  initialState,

  reducers: {

    enqueue: (state, action) => {
      const element = action.payload
      if (isFull(state)) {
        state.operationResults = `Queue is Full`
        return;
      }

      if (state.front === -1) {
        state.front = 0;
        state.rear = 0;
        state.queue[state.rear] = element;
      } else if (state.rear === state.capacity - 1 && state.front !== 0) {
        state.rear = 0;
        state.queue[state.rear] = element;

      } else {
        state.rear++;
        state.queue[state.rear] = element;

      }
      state.operationResults = `Element ${element} inserted at rear index: ${state.rear}`


    },
    dequeue: (state) => {

      if (isEmpty(state)) {
        state.operationResults = `Queue is Empty`
        return;
      }

      const element = state.queue[state.front];
      state.queue[state.front] = null;
      const index = state.front;

      if (state.front === state.rear) {
        state.front = -1;
        state.rear = -1
      } else if (state.front === state.capacity - 1) {
        state.front = 0;
      } else {
        state.front++;
      }

      state.operationResults = `Element ${element} removed from Front : ${index}`
    }
  }
})

export const { enqueue, dequeue } = circularQueueSLice.actions;
export default circularQueueSLice.reducer;