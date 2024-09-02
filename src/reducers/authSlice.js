import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   user: {}, // Initially, no user is logged in
   isAuthenticated: false,
};

const authSlice =  createSlice({
   name: "auth",
   initialState,
   reducers: {
      loginSuccess: (state, action) => {
         state.user = action.payload.user
         state.isAuthenticated = true
      },
      logoutSuccess: (state, action) => {
         state.user = {}
         state.isAuthenticated = false
      }
   }
})

export const {loginSuccess, logoutSuccess, registerSuccess} = authSlice.actions;
export default authSlice.reducer