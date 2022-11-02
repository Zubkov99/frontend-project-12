import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';

export default configureStore({
  reducer: {
    content: channelsReducer,
    messages: messagesReducer,
  },
});
