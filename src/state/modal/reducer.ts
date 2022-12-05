import {createSlice} from "@reduxjs/toolkit";

export type modalStateType = {
  isOpen: boolean;
}
const initialState: modalStateType = {
  isOpen: false,
}

const modalSlice = createSlice({
  initialState,
  name: "modal",
  reducers: {
    open: (state, action) => {
      state.isOpen = true
    },
    close: (state, action) => {
      state.isOpen = false
    },
  },
})

const {actions, reducer} = modalSlice;
export const {open, close} = actions
export default reducer;