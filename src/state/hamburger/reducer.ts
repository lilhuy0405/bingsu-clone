import {createSlice} from "@reduxjs/toolkit";

export type hamburgerStateType = {
  isOpen: boolean;
}
const initialState: hamburgerStateType = {
  isOpen: false,
}

const hamburgerSlice = createSlice({
  initialState,
  name: "hamburger",
  reducers: {
    toggleOpen: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
})

const {actions, reducer} = hamburgerSlice;
export const {toggleOpen} = actions
export default reducer;