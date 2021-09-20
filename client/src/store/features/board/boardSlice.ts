import { createSlice } from '@reduxjs/toolkit';

interface IBoardState {
  isOpenModal: boolean;
}

const initialState = { isOpenModal: false } as IBoardState;

export const boardSlice = createSlice({
  initialState,
  name: 'board',
  reducers: {
    openInviteModal: (state) => {
      state.isOpenModal = true;
    },
    closeInviteModal: (state) => {
      state.isOpenModal = false;
    },
    dismissInviteModal: (state) => {
      state.isOpenModal = false;
    },
  },
});

export const { openInviteModal, closeInviteModal, dismissInviteModal } =
  boardSlice.actions;

export default boardSlice.reducer;
