import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  primaryLoading: false,
  secondaryLoading: false,

  primaryDisable: false,
  secondaryDisable: false,
};

const DisableFunctionalitySlice = createSlice({
  name: 'disable',
  initialState,
  reducers: {
    setPrimaryLoading(state, action) {
      state.primaryLoading = action.payload;
    },

    setSecondaryLoading(state, action) {
      state.secondaryLoading = action.payload;
    },

    setPrimaryDisable(state, action) {
      state.primaryDisable = action.payload;
    },

    setSecondaryDisable(state, action) {
      state.secondaryDisable = action.payload;
    },
  },
});

export const {
  setPrimaryLoading,
  setSecondaryLoading,
  setPrimaryDisable,
  setSecondaryDisable,
} = DisableFunctionalitySlice.actions;
export default DisableFunctionalitySlice.reducer;
