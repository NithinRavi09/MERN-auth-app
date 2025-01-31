import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  loading: false,
  error: null,
  isAdmin: false,  
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.admin = action.payload;
      state.isAdmin = true; 
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdmin = false;  
    },
    signOut: (state) => {
      state.admin = null;
      state.isAdmin = false;  
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signinStart, signinSuccess, signinFailure, signOut } = adminSlice.actions;
export default adminSlice.reducer;
