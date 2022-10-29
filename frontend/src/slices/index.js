import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels';

export default configureStore({
  reducer: {
    content: channelsReducer,
  },
});
