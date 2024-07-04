import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },

  reducers: {
    loginStart: (state) => {
      
      state.isFetching = true;
      state.error = false;
    },

    loginSuccess: (state, action) => {
      // console.log(action.payload)
      state.currentUser= action.payload;
      state.isFetching= false;
      state.error=false;
    },

    loginError: (state) => {
      state.currentUser = null;
      state.isFetching= false;
      state.error= true;
    },

    logout: (state)=>{
      state.currentUser = null;
      state.isFetching= false;
      state.error= false;
    }
  },
});

export const { loginStart, loginError, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
