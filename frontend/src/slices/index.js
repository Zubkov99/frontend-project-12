import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';
import messagesReducer from './messages';
import modalWindows from './modalWindows';

export default configureStore({
  reducer: {
    content: channelsReducer,
    messages: messagesReducer,
    modal: modalWindows,
  },
});
