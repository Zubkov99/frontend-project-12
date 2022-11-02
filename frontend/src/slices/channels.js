/* eslint-disable no-param-reassign,no-return-assign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../helpers/routes';

export const fetchData = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const response = await axios.get(routes.usersPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const initialState = {
  channels: [],
  activeChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      state.channels.push(payload);
      state.activeChannelId = payload.id;
    },
    deleteChannel(state, { payload }) {
      const channelId = Number(payload.id);
      state.channels = state.channels.filter((item) => item.id !== channelId);
      state.activeChannelId = 1;
    },
    setActiveChannel(state, { payload }) {
      if( state.activeChannelId === payload ) return;
      state.activeChannelId = payload;
    },
    renameLocalChannel(state, { payload }) {
      const channelId = Number(payload.id);
      state.channels = state.channels.map((item) => {
        if (item.id !== channelId) return item;
        return {
          ...item,
          name: payload.name,
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels } = action.payload;
      state.channels = channels;
    });
  },
});
export const {
  setActiveChannel, addChannels, deleteChannel, renameLocalChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
