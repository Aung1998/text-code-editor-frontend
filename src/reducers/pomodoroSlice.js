import {createSlice} from "@reduxjs/toolkit";

const initialState  = {
  pomodoro:{
    intervals: 4,
    long_break_minutes: 30,
    short_break_minutes: 5,
    working_minutes: 25
  },
}

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    loadPomodoroSuccess: (state, action) => {
      state.pomodoro = action.payload
    },
    updatePomodoroSuccess: (state, action) => {
      state.pomodoro = action.payload
    },
    revertPomodoroSuccess: (state) => {
      state.pomodoro = initialState.pomodoro
    }
  }
})

export const {loadPomodoroSuccess, updatePomodoroSuccess, revertPomodoroSuccess} = pomodoroSlice.actions
export default pomodoroSlice.reducer