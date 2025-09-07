import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState, // corrected key from initialValue to initialState
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // corrected value to action
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user'); // Clear user data on logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
