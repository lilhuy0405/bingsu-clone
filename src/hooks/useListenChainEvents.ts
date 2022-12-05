import {useConnection} from "../state/connection";
import {ethers} from "ethers";
import {useEffect, useMemo} from "react";
import {BNB_MAINNET_CHAIN_ID, BNB_MAINNET_CHAIN_ID_DECIMAL} from "../constants/constants";
import {notification} from "antd";
import {useModal} from "../state/modal";

const useListenChainEvents = () => {
  const {onClearConnection, onUpdateConnectionAsync} = useConnection()
  const {modal, onOpenModal, onCloseModal} = useModal();
  const isWeb3Browser = !!window.ethereum
  const provider = isWeb3Browser ? new ethers.providers.Web3Provider(window.ethereum) : null;
  const signer = provider ? provider.getSigner() : null;


  const handleChangeChain = async (chainId: any) => {
    if (!signer) return
    if (chainId === BNB_MAINNET_CHAIN_ID) {
      onCloseModal()
      await onUpdateConnectionAsync()
      return
    }
    notification.error({
      message: "Network not supported",
      description: "Network not supported, Please change to BNB Smart chain!",
      placement: "bottomRight"
    })
    onOpenModal()
    onClearConnection()
  }
  const handleChangeAccount = async (accounts: string[]) => {
    if (!signer) return
    if (accounts.length > 0) {
      const accountAddress = accounts[0]
      await onUpdateConnectionAsync()
    }
  }
  useEffect(() => {
    if (isWeb3Browser) {
      window.ethereum.on('chainChanged', handleChangeChain)
      return () => {
        window.ethereum.removeListener('chainChanged', handleChangeChain)
      }
    }
  }, [])
  //
  useEffect(() => {
    if (isWeb3Browser) {
      window.ethereum.on('accountsChanged', handleChangeAccount)
    }
    return () => {
      window.ethereum.removeListener('accountsChanged', handleChangeAccount)
    }
  }, [])
  useEffect(() => {
    if (!signer) return
    signer.getChainId().then(chainId => {
      if (chainId !== BNB_MAINNET_CHAIN_ID_DECIMAL) {
        onOpenModal()
      }
    }).catch(() => {
    });
  }, [])
}

export default useListenChainEvents