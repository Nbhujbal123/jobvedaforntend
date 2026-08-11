import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMobileNavOpen: boolean;
  activeModal: string | null;
}

const initialState: UiState = {
  isMobileNavOpen: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileNavOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { setMobileNavOpen, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
