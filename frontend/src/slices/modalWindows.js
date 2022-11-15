/* eslint-disable no-param-reassign,no-return-assign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  window: '',
  extraData: '',
};

const modalWindowsSlice = createSlice({
  name: 'modalWindows',
  initialState,
  reducers: {
    setActiveModal(state, { payload }) {
      state.window = payload;
    },
    setExtraData(state, { payload }) {
      state.extraData = payload;
    },
  },
});

export const getActiveModal = (state) => state.modal.window;
export const getExtraData = (state) => state.modal.extraData;

export const { setActiveModal, setExtraData } = modalWindowsSlice.actions;

export default modalWindowsSlice.reducer;
