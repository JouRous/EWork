import { createSlice } from '@reduxjs/toolkit';

export interface ICardState {
  isOpen: boolean;
  ticketId: string;
}

const initialState: ICardState = {
  ticketId: '',
  isOpen: false,
};

export const ticketSlice = createSlice({
  initialState,
  name: 'card',
  reducers: {
    openCard: (state, action: { type: string; payload: string }) => ({
      ...state,
      ticketId: action.payload,
      isOpen: true,
    }),
  },
});

export const { openCard } = ticketSlice.actions;
export default ticketSlice.reducer;
