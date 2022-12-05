import {formatEther, parseEther} from "ethers/lib/utils";
import useWeb3 from "./useWeb3";
import {useConnection} from "../state/connection";
import {ReadOnlyBingSuFounderContract, WritableBingSuFounderContract} from "../contractPort/BingSuFounderContract";
import {useMemo} from "react";
import {ReadOnlyBusdERC20Contract, WritableBusdERC20Contract} from "../contractPort/BusdERC20Contract";
import {BINGSU_FOUNDER_CONTRACT_ADDRESS} from "../contractPort/constants";
import {ReadOnlyUsdtERC20Contract, WritableUsdtERC20Contract} from "../contractPort/UsdtERC20Contract";
import {ReadOnlyBingsuERC20Contract} from "../contractPort/BingsuERC20Contract";

const useBingSuFounder = () => {
  const {provider, connection} = useWeb3()

  //load contracts
  const {onUpdateConnectionAsync} = useConnection()
  const writableBingSuFounderContract = useMemo(() => {
    if (!provider || !connection.address) return undefined
    return new WritableBingSuFounderContract(provider, connection.address)
  }, [connection.address])

  const readOnlyBingSuFounderContract = useMemo(() => {
    if (!provider) return undefined
    return new ReadOnlyBingSuFounderContract(provider)
  }, [provider])

  const readOnlyBusdErc20Contract = useMemo(() => {
    if (!provider) return undefined
    return new ReadOnlyBusdERC20Contract(provider)
  }, [provider])

  const writableBusdErc20Contract = useMemo(() => {
    if (!provider || !connection.address) return undefined
    return new WritableBusdERC20Contract(provider, connection.address)
  }, [provider, connection.address])

  const readOnlyUsdtErc20Contract = useMemo(() => {
    if (!provider) return undefined
    return new ReadOnlyUsdtERC20Contract(provider)
  }, [provider])

  const writableUsdtErc20Contract = useMemo(() => {
    if (!provider || !connection.address) return undefined
    return new WritableUsdtERC20Contract(provider, connection.address)
  }, [provider, connection.address])


  const buyBingSuByBnB = async (amount: string) => {
    if (parseFloat(amount) <= 0) {
      throw new Error("Amount must be bigger than 0")
    }
    if (!writableBingSuFounderContract) {
      throw new Error("Meta mask not installed or not connected")
    }
    const currentBalance = parseEther(connection.bnbBalance)
    const amountBigNumber = parseEther(amount)
    if (currentBalance.lt(amountBigNumber)) {
      throw new Error("amount exceeds balance")
    }

    const txnResponse = await writableBingSuFounderContract.callBuyTokenByBNB(amountBigNumber);
    const txnReceipt = await txnResponse.wait()
    //update state
    await onUpdateConnectionAsync()
    return txnReceipt
  }
  const buyBingSuByBUSD = async (amount: string) => {
    if (parseFloat(amount) <= 0) {
      throw new Error("Amount must be bigger than 0")
    }
    if (!writableBingSuFounderContract || !readOnlyBusdErc20Contract || !provider || !writableBusdErc20Contract) {
      throw new Error("Meta mask not installed or not connected")
    }
    const currentBalance = parseEther(connection.busdBalance)
    const amountBigNumber = parseEther(amount)
    if (currentBalance.lt(amountBigNumber)) {
      throw new Error("amount exceeds balance")
    }
    const buyerAddress = await provider.getSigner().getAddress()
    //check allowance
    const currentAllowanceBigNumber = await readOnlyBusdErc20Contract.getAllowance(buyerAddress, BINGSU_FOUNDER_CONTRACT_ADDRESS)
    if (currentAllowanceBigNumber.lt(amountBigNumber)) {
      // approve all balance of user to founder contract
      const txnResp = await writableBusdErc20Contract.approve(BINGSU_FOUNDER_CONTRACT_ADDRESS, currentBalance)
      //wait for txn confirmed on blockchain
      await txnResp.wait()
    }

    const salePrice = await getSalePrice()
    const saleDiv = await getSaleDiv()
    if (!salePrice || !saleDiv) {
      throw new Error("Failed to get sale price")
    }
    //calculate amount using this formula toSend = amount * saveDiv / salePrice
    const toSendAmount = parseFloat(amount) * saleDiv / salePrice
    const toSendBigNumber = parseEther(toSendAmount.toString())
    const txnResponse = await writableBingSuFounderContract.callBuyTokenByBUSD(toSendBigNumber);
    const txnReceipt = await txnResponse.wait()
    //update state
    await onUpdateConnectionAsync()
    return txnReceipt

  }

  const buyBingSuByUSDT = async (amount: string) => {
    if (parseFloat(amount) <= 0) {
      throw new Error("Amount must be bigger than 0")
    }
    if (!writableBingSuFounderContract || !readOnlyUsdtErc20Contract || !provider || !writableUsdtErc20Contract) {
      throw new Error("Meta mask not installed or not connected")
    }
    const currentBalance = parseEther(connection.usdtBalance)
    const amountBigNumber = parseEther(amount)
    if (currentBalance.lt(amountBigNumber)) {
      throw new Error("amount exceeds balance")
    }
    const buyerAddress = await provider.getSigner().getAddress()
    //check allowance
    const currentAllowanceBigNumber = await readOnlyUsdtErc20Contract.getAllowance(buyerAddress, BINGSU_FOUNDER_CONTRACT_ADDRESS)
    if (currentAllowanceBigNumber.lt(amountBigNumber)) {
      // approve all balance of user to founder contract
      const txnResp = await writableUsdtErc20Contract.approve(BINGSU_FOUNDER_CONTRACT_ADDRESS, currentBalance)
      //wait for txn confirmed on blockchain
      await txnResp.wait()
    }

    const salePrice = await getSalePrice()
    const saleDiv = await getSaleDiv()
    if (!salePrice || !saleDiv) {
      throw new Error("Failed to get sale price")
    }
    //calculate amount using this formula toSend = amount * saveDiv / salePrice
    const toSendAmount = parseFloat(amount) * saleDiv / salePrice
    const toSendBigNumber = parseEther(toSendAmount.toString())
    const txnResponse = await writableBingSuFounderContract.callBuyTokenByUSDT(toSendBigNumber);
    const txnReceipt = await txnResponse.wait()
    //update state
    await onUpdateConnectionAsync()
    return txnReceipt
  }

  const getSalePrice = async () => {
    try {
      if (!readOnlyBingSuFounderContract) {
        throw new Error("Meta mask not installed or not connected")
      }
      const salePriceBigNumber = await readOnlyBingSuFounderContract.getSalePrice();
      return salePriceBigNumber.toNumber()
    } catch (err) {
      console.error(err)
      return undefined
    }
  }

  const getBNBPrice = async () => {
    try {
      if (!readOnlyBingSuFounderContract) {
        throw new Error("Meta mask not installed or not connected")
      }
      const bnbPriceBigNumber = await readOnlyBingSuFounderContract.getBnbPrice();
      return bnbPriceBigNumber.toNumber()
    } catch (err) {
      console.error(err)
      return undefined
    }
  }

  const getSaleDiv = async () => {
    try {
      if (!readOnlyBingSuFounderContract) {
        throw new Error("Meta mask not installed or not connected")
      }
      const saleDivBigNumber = await readOnlyBingSuFounderContract.getSaleDiv();
      return saleDivBigNumber.toNumber()
    } catch (err) {
      console.error(err)
      return undefined
    }
  }


  return {
    buyBingSuByBnB,
    getBNBPrice,
    getSaleDiv,
    getSalePrice,
    buyBingSuByBUSD,
    buyBingSuByUSDT,
  }
}

export default useBingSuFounder