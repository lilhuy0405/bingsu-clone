import {configureStore} from "@reduxjs/toolkit";
import connectionReducer from "./connection"
import hamburgerReducer from "./hamburger"
import modalReducer from "./modal"
const rootReducer = {
  //add more reducer late
  connection: connectionReducer,
  hamburger: hamburgerReducer,
  modal: modalReducer
}
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})
export default store
export type AppState = ReturnType<typeof store.getState>