import {thunk} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import codeFilesSlice from "./reducers/codeFilesSlice";

const appStore = configureStore({
  reducer: {
    auth: authSlice,
    codeFiles: codeFilesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default appStore
