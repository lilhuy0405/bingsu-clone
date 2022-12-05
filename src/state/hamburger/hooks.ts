import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {AppState} from "../index";
import {toggleOpen} from "./reducer";


export const useHamburger = () => {
  const hamburgerMenu = useSelector((state: AppState) => state.hamburger)
  const dispatch = useDispatch()
  const onToggleHamburger = useCallback(() => dispatch(toggleOpen(undefined)), [dispatch])

  return {
    hamburgerMenu,
    onToggleHamburger
  }
}