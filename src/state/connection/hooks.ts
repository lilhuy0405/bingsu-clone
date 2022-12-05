import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {
  clearConnection,
  setAddress,
  setBnbBalance,
  setBingSuBalance,
  setConnection,
  updateConnectionAsync, updateFounderBingSuBalanceAsync, ConnectionStateType
} from "./reducer";
import {AppState} from "../index";

export const useConnection = () => {
  const connection = useSelector((state: AppState) => state.connection)
  const dispatch = useDispatch()
  const onSetAddress = useCallback((accountAddress: string) => {
    dispatch(setAddress(accountAddress))
  }, [dispatch])

  const onSetBalance = useCallback((balance: string) => {
    dispatch(setBnbBalance(balance))
  }, [dispatch])

  const onSetBingSuBalance = useCallback((balance: string) => {
    dispatch(setBingSuBalance(balance))
  }, [dispatch])

  const onSetConnection = useCallback((connection: ConnectionStateType) => {
    dispatch(setConnection(connection))
  }, [dispatch])

  const onClearConnection = useCallback(() => {
    dispatch(clearConnection(undefined))
  }, [dispatch])

  const onUpdateConnectionAsync = useCallback(async () => {
    await dispatch(updateConnectionAsync())
  }, [dispatch])

  const onUpdateFounderBingSuBalanceAsync = useCallback(async () => {
    await dispatch(updateFounderBingSuBalanceAsync())
  }, [dispatch])

  return {
    onSetAddress,
    connection,
    onSetBingSuBalance,
    onSetBalance,
    onSetConnection,
    onClearConnection,
    onUpdateConnectionAsync,
    onUpdateFounderBingSuBalanceAsync
  }
}