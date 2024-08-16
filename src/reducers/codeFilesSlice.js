import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  codeFiles: []
}

const codeFiles = createSlice({
  name: "codeFiles",
  initialState,
  reducers: {
    createFileSuccess: (state, action) => {
      console.log(action.payload)
      state.codeFiles = action.payload
    },
    getFileSuccess: (state, action) => {
      state.codeFiles = action.payload
    },
    updateFileSuccess: (state, action) =>{
      state.codeFiles = action.payload
    },
    deleteFileSuccess: (state, action) => {
      state.codeFiles = action.payload
    }
   }
})

export const {getFileSuccess, updateFileSuccess, createFileSuccess, deleteFileSuccess} = codeFiles.actions
export default codeFiles.reducer