import { createSlice } from "@reduxjs/toolkit";



const priorityQueueSlice = createSlice({
  name: 'priorityQueue',
  initialState : {
    queue: JSON.parse(localStorage.getItem('priorityQueue')) || [],
    operationResults : ''
  },


  reducers : {
    enqueue : (state, action) => {
      const {element, priority} = action.payload;
      const newItem = {element, priority};
      console.log("element: ",newItem)
      let added = false

      for(let i = 0; i<state.queue.length; i++){
        if(Number(priority) > Number(state.queue[i].priority)){
          state.queue.splice(i, 0, newItem);
          added = true;
          break;
        }
      }

      if(!added){
        state.queue.push(newItem);
      }

      state.operationResults = `Enqueued element : ${element} with priority : ${priority}`;

    },
    dequeue: (state) => {
      if (state.queue.length === 0) {
        state.operationResults = 'Queue is empty';
        return;
      }
      const dequeuedItem = state.queue.shift(); // Remove the first element
      state.operationResults = `Dequeued element: ${dequeuedItem.element} with priority: ${dequeuedItem.priority}`;
      console.log("Dequeuing:", dequeuedItem);
    },

    peek: (state) => {
      if(state.queue.length === 0){
        state.operationResults = 'Queue is empty';
        return;
      }
      else{
        const peekElement = state.queue[0];
        state.operationResults = `Peeked element: ${peekElement.element} with priority: ${peekElement.priority}`
      }
    }
  },


})

export const {enqueue, dequeue, peek} = priorityQueueSlice.actions;
export default priorityQueueSlice.reducer;