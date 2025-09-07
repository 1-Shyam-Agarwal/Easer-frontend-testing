import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token'); // Clear token on logout
    },

    setRole(state, action) {
      state.role = action.payload;
    },

    clearRole(state, action) {
      state.role = '';
    },
  },
});

export const { setToken, clearToken, setRole, clearRole } = authSlice.actions;
export default authSlice.reducer; //export default authSlice.reducer ;
