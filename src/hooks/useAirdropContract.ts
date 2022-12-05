import useWeb3 from "./useWeb3";
import {useConnection} from "../state/connection";
import {useMemo} from "react";
import {ReadOnlyBingSuAirdropContract, WritableBingSuAirdropContract} from "../contractPort/BingSuAirdropContract";


const useAirdropContract = () => {
  const {provider, connection} = useWeb3()

  //load contracts
  const {onUpdateConnectionAsync} = useConnection()

  const readOnlyBingSuAirdropContract = useMemo(() => {
    if (!provider) return undefined
    return new ReadOnlyBingSuAirdropContract(provider)
  }, [provider])
  const writableBingSuAirdropContract = useMemo(() => {
    if (!provider || !connection.address) return undefined
    return new WritableBingSuAirdropContract(provider, connection.address)
  }, [provider, connection.address])


  const releaseToken = async (id: number) => {
    if (id < 0) throw new Error("id must be bigger than 0")
    if (!writableBingSuAirdropContract) {
      throw new Error("Meta mask not installed or not connected")
    }
    const txnResponse = await writableBingSuAirdropContract.releaseToken(id);
    const txnReceipt = await txnResponse.wait();
    await onUpdateConnectionAsync()
    return txnReceipt;
  }


  const releaseAllToken = async () => {
    if (!writableBingSuAirdropContract) {
      throw new Error("Meta mask not installed or not connected")
    }
    const txnResponse = await writableBingSuAirdropContract.releaseAllTokens()
    const txnReceipt = await txnResponse.wait();
    await onUpdateConnectionAsync()
    return txnReceipt;
  }


  return {
    releaseAllToken,
    releaseToken,

  }


}

export default useAirdropContract;