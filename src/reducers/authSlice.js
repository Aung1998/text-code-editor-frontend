import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   user: {}, // Initially, no user is logged in
   isAuthenticated: false,
   registerComplete: false,
};

const authSlice =  createSlice({
   name: "auth",
   initialState,
   reducers: {
      loginSuccess: (state, action) => {
         state.user = action.payload.user
         state.pomodoro = action.payload.pomodoro_setting
         state.isAuthenticated = true
      },
      logoutSuccess: (state, action) => {
         state.user = {}
         state.pomodoro = {
            intervals: 4,
            long_break_minutes: 30,
            short_break_minutes: 5,
            working_minutes: 25
         }
         state.isAuthenticated = false
      },
      registerSuccess: (state, action) => {
         state.registerComplete = true
      }
   }
})

export const {loginSuccess, logoutSuccess, registerSuccess, registerDones} = authSlice.actions;
export default authSlice.reducer