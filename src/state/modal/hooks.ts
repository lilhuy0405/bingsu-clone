import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {AppState} from "../index";
import {close, open} from "./reducer";


export const useModal = () => {
  const modal = useSelector((state: AppState) => state.modal)
  const dispatch = useDispatch()
  const onCloseModal = useCallback(() => dispatch(close(undefined)), [dispatch])
  const onOpenModal = useCallback(() => dispatch(open(undefined)), [dispatch])

  return {
    modal,
    onCloseModal,
    onOpenModal
  }
}