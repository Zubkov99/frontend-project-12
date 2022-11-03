import _ from 'lodash';
import { createSelector } from '@reduxjs/toolkit';

export const channelsSelector = (state) => _.uniqBy(state.content.channels, 'id');
export const activeChannelIdSelector = (state) => state.content.activeChannelId || null;
const uniqMessages = (state) => _.uniqBy(state.messages.messages, 'id');

export const messagesSelector = createSelector(
  [uniqMessages, activeChannelIdSelector],
  (messages, activeChannel) => messages.filter((item) => item.channelId === activeChannel),
);

export const activeChannelSelector = createSelector(
  [channelsSelector, activeChannelIdSelector],
  (channels, activeId) => channels.find(({ id }) => id === activeId) || { id: null },
);
