/* eslint-disable no-param-reassign,no-return-assign */
import axios from 'axios';
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import routes from '../api/routes';

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
  username: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      state.channels.push(payload);
    },
    deleteChannel(state, { payload }) {
      const channelId = Number(payload.id);
      state.channels = state.channels.filter((item) => item.id !== channelId);
      state.activeChannelId = 1;
    },
    setActiveChannel(state, { payload }) {
      const { id, author } = payload;
      if (author === state.username) {
        state.activeChannelId = id;
      }
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
    addUserName(state, { payload }) {
      if (state.username === payload) return;
      state.username = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels } = action.payload;
      state.channels = channels;
    });
  },
});

export const channelsSelector = (state) => _.uniqBy(state.content.channels, 'id');
export const activeChannelIdSelector = (state) => state.content.activeChannelId || null;

export const getUserName = (state) => state.content.username;

export const activeChannelSelector = createSelector(
  [channelsSelector, activeChannelIdSelector],
  (channels, activeId) => channels.find(({ id }) => id === activeId) || { id: null },
);

export const {
  setActiveChannel, addChannels, deleteChannel, renameLocalChannel, addUserName,
} = channelsSlice.actions;
export default channelsSlice.reducer;
