import { createSlice } from '@reduxjs/toolkit';


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    
    addReceivedMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
    },
    likeMessage: (state, action) => {
      const message = state.messages.find((msg) => msg.id === action.payload);
      if (message) {
        message.like = true;
      }}
  },
});

export const { addMessage, deleteMessage, likeMessage,addReceivedMessage } = chatSlice.actions;
export default chatSlice.reducer;

