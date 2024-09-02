import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  codeFiles: []
}

const codeFiles = createSlice({
  name: "codeFiles",
  initialState,
  reducers: {
    createFileSuccess: (state, action) => {
      state.codeFiles.push(action.payload)
    },
    getFileSuccess: (state, action) => {
      state.codeFiles = action.payload
    },
    updateFileSuccess: (state, action) =>{
      state.codeFiles = action.payload
    },
    deleteFileSuccess: (state, action) => {
      const id = action.payload
      state.codeFiles = state.codeFiles.filter((codeFile) => codeFile.id !== id)
    }
   }
})

export const {getFileSuccess, updateFileSuccess, createFileSuccess, deleteFileSuccess} = codeFiles.actions
export default codeFiles.reducer