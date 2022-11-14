/* eslint-disable no-param-reassign,no-return-assign */
import { createSelector, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { fetchData, deleteChannel, activeChannelIdSelector } from './channels';

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

const uniqMessages = (state) => _.uniqBy(state.messages.messages, 'id');

export const messagesSelector = createSelector(
  [uniqMessages, activeChannelIdSelector],
  (messages, activeChannel) => messages.filter((item) => item.channelId === activeChannel),
);

export default messagesSlice.reducer;
