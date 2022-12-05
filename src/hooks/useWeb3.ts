import {useConnection} from "../state/connection";
import {ethers} from "ethers";
import {useEffect, useMemo} from "react";
import {notification} from "antd";
import {BNB_MAINNET_CHAIN_ID} from "../constants/constants";

declare global {
  interface Window {
    ethereum: any;
  }
}

export type AddERC20Params = {
  address: string, // The address that the token is at.
  symbol: string, // A ticker symbol or shorthand, up to 5 chars.
  decimals: number, // The number of decimals in the token
}
const useWeb3 = () => {
  const {connection, onClearConnection, onUpdateConnectionAsync} = useConnection()
  const isWeb3Browser = !!window.ethereum
  const provider = isWeb3Browser ? new ethers.providers.Web3Provider(window.ethereum) : null;
  const signer = provider ? provider.getSigner() : null;
  const isActive = useMemo(() => !!connection.address, [connection.address])

  const activate = async () => {
    if (!isWeb3Browser || !signer) {
      notification.error({
        message: "Metamask not installed",
        description: "Metamask not installed please install to continue",
        placement: "bottomRight"
      })
      return
    }
    try {
      // request login to meta mask
      await window.ethereum.request({method: 'eth_requestAccounts'});
      // switch to bnb test net
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: BNB_MAINNET_CHAIN_ID}], // chainId must be in hexadecimal numbers
      });
      await onUpdateConnectionAsync()

    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: BNB_MAINNET_CHAIN_ID,
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                chainName: 'Smart Chain'
              },
            ],
          });
          await onUpdateConnectionAsync()

        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  }
  const deActivate = () => {
    onClearConnection()
  }

  const addTokenToWallet = async (options: AddERC20Params) => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      if (!window.ethereum) {
        throw new Error("Metamask not installed")
      }
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options
        },
      });

      if (wasAdded) {
        console.log("added token sucess")
      } else {
        console.log('added token failed');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {connection, activate, deActivate, isActive, provider, isWeb3Browser, addTokenToWallet}
}

export default useWeb3