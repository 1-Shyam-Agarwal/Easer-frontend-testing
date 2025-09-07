import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModel: false,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    setShowModel(state, action) {
      state.showModel = action.payload;
    },
  },
});

export const { setShowModel } = logoutSlice.actions;
export default logoutSlice.reducer;
