import { createSlice } from '@reduxjs/toolkit';

export interface IProjectState {
  isLoadProject: boolean;
  isModalOpen: boolean;
}

const initialState = {
  isLoadProject: true,
  isModalOpen: false,
} as IProjectState;

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchProjectRequest: (state) => {
      state.isLoadProject = true;
    },
    fetchProjectSuccess: (state) => {
      state.isLoadProject = false;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.isLoadProject = true;
    },
    dismissModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  fetchProjectRequest,
  fetchProjectSuccess,
  openModal,
  closeModal,
  dismissModal,
} = projectSlice.actions;
export default projectSlice.reducer;
