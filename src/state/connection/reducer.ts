import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ethers} from "ethers";
import {ReadOnlyBingsuERC20Contract} from "../../contractPort/BingsuERC20Contract";
import {formatEther} from "ethers/lib/utils";
import {ReadOnlyBusdERC20Contract} from "../../contractPort/BusdERC20Contract";
import {ReadOnlyUsdtERC20Contract} from "../../contractPort/UsdtERC20Contract";
import {BINGSU_FOUNDER_CONTRACT_ADDRESS} from "../../contractPort/constants";
import {ReadOnlyBingSuAirdropContract} from "../../contractPort/BingSuAirdropContract";

export type LockPool = {
  key: number,
  amount: number
  releaseTime: number,
  isReleased: boolean
}
export type ConnectionStateType = {
  address?: string,
  bnbBalance: string,
  bingSuBalance: string,
  busdBalance: string,
  usdtBalance: string,
  founderContractBingsuBalance: string,
  airDropLockPools: LockPool[]
}
const initialState: ConnectionStateType = {
  address: '',
  bnbBalance: "0.00",
  bingSuBalance: "0.00",
  busdBalance: "0.00",
  usdtBalance: "0.00",
  founderContractBingsuBalance: "0.00",
  airDropLockPools: []
}

export const updateConnectionAsync = createAsyncThunk("connection/updateConnectionAsync", async () => {
  const isWeb3Browser = !!window.ethereum
  const provider = isWeb3Browser ? new ethers.providers.Web3Provider(window.ethereum) : null;
  const signer = provider ? provider.getSigner() : null;
  if (!signer) throw new Error("Not connected to meta mask")
  const newAddress = await signer.getAddress()
  const balanceBigNumber = await signer.getBalance()
  const bnbBalance = formatEther(balanceBigNumber)

  const readOnlyBingsuERC20Contract = new ReadOnlyBingsuERC20Contract(provider)
  const bingSuBalanceBigNumber = await readOnlyBingsuERC20Contract.getBalance(newAddress)
  const bingSuBalance = formatEther(bingSuBalanceBigNumber)

  const readOnlyBusdERC20Contract = new ReadOnlyBusdERC20Contract(provider)
  const busdBalanceBigNumber = await readOnlyBusdERC20Contract.getBalance(newAddress)
  const busdBalance = formatEther(busdBalanceBigNumber)

  const readOnlyUsdtERC20Contract = new ReadOnlyUsdtERC20Contract(provider)
  const usdtBalanceBigNumber = await readOnlyUsdtERC20Contract.getBalance(newAddress)
  const usdtBalance = formatEther(usdtBalanceBigNumber)

  const founderBingSuBalanceBigNumber = await readOnlyBingsuERC20Contract.getBalance(BINGSU_FOUNDER_CONTRACT_ADDRESS)
  const founderContractBingsuBalance = formatEther(founderBingSuBalanceBigNumber)

  //fetch lock pool
  const readOnlyBingSuAirdropContract = new ReadOnlyBingSuAirdropContract(provider)
  const poolSizeBigNumber = await readOnlyBingSuAirdropContract.getLockedListSize(newAddress);
  const poolSize = poolSizeBigNumber.toNumber();

  const airDropLockPools: LockPool[] = await Promise.all(Array.from(Array(poolSize).keys()).map(index => {
    return new Promise<LockPool>(async (resolve, reject) => {
      try {
        const pool = await readOnlyBingSuAirdropContract.getLockListByTime(newAddress, index);
        const lockPool: LockPool = {
          key: index,
          amount: parseFloat(formatEther(pool[0])),
          releaseTime: new Date(pool[1].toNumber() * 1000).getTime(),
          isReleased: pool[2].toNumber()
        }
        resolve(lockPool)
      } catch (err) {
        reject(err)
      }
    })
  }))

  return {
    connection: {
      address: newAddress,
      bnbBalance,
      bingSuBalance,
      busdBalance,
      usdtBalance,
      founderContractBingsuBalance,
      airDropLockPools
    }
  }

})


export const updateFounderBingSuBalanceAsync = createAsyncThunk("connection/updateConnectionAsync", async () => {
  const isWeb3Browser = !!window.ethereum
  const provider = isWeb3Browser ? new ethers.providers.Web3Provider(window.ethereum) : null;
  const signer = provider ? provider.getSigner() : null;
  if (!signer) throw new Error("Not connected to meta mask")
  const readOnlyBingsuERC20Contract = new ReadOnlyBingsuERC20Contract(provider)
  const founderBingSuBalanceBigNumber = await readOnlyBingsuERC20Contract.getBalance(BINGSU_FOUNDER_CONTRACT_ADDRESS)
  const founderContractBingsuBalance = formatEther(founderBingSuBalanceBigNumber)
  return {connection: {founderContractBingsuBalance}}
})


const connectionSlice = createSlice({
  initialState,
  name: "connection",
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setBnbBalance: (state, action) => {
      state.bnbBalance = action.payload
    },
    setBingSuBalance: (state, action) => {
      state.bingSuBalance = action.payload
    },
    setConnection: (state, action) => {
      return {...state, ...action.payload}
    },
    clearConnection: (state, action) => {
      return initialState
    }
  },

  extraReducers: {
    // @ts-ignore
    [updateConnectionAsync.fulfilled]: (state, action) => {
      return {...state, ...action.payload.connection}
    },
    // @ts-ignore
    [updateConnectionAsync.rejected]: () => {
      return initialState
    },
    // @ts-ignore
    [updateFounderBingSuBalanceAsync.fulfilled]: (state, action) => {
      return {...state, ...action.payload.connection}
    },
    // @ts-ignore
    [updateFounderBingSuBalanceAsync.rejected]: () => {
      return {...initialState, founderContractBingsuBalance: "NaN"}
    }
  }
})

const {actions, reducer} = connectionSlice;
export const {setAddress, setBnbBalance, setBingSuBalance, setConnection, clearConnection} = actions
export default reducer;