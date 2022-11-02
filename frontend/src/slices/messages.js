import { createSlice } from '@reduxjs/toolkit';
import { fetchData, deleteChannel } from './channels';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      state.messages.push(...messages);
    });
    builder.addCase(deleteChannel, (state, { payload }) => {
      const channelId = Number(payload.id);
      state.messages = state.messages.filter((item) => item.channelId !== channelId);
    });
  },
});

export const { addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
