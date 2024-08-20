import {thunk} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import codeFilesSlice from "./reducers/codeFilesSlice";
import pomodoroSlice from "./reducers/pomodoroSlice";

const appStore = configureStore({
  reducer: {
    auth: authSlice,
    codeFiles: codeFilesSlice,
    pomodoro: pomodoroSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default appStore
