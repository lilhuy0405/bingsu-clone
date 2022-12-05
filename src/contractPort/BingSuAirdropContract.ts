import {Contract} from "ethers";
import {getContract} from "./utils";
import {BINGSU_AIRDROP_CONTRACT_ADDRESS} from "./constants";
import BINGSU_AIRDROP_ABI from "./abis/bingsuAidrop.json";
import {Listener} from "@ethersproject/providers";


export class ReadOnlyBingSuAirdropContract {
  _contract: Contract

  constructor(provider: any) {
    this._contract = getContract(BINGSU_AIRDROP_CONTRACT_ADDRESS, BINGSU_AIRDROP_ABI, provider)
  }

  async getLockListByTime(address: string, index: number) {
    return this._contract.lockListByTime(address, index);
  }

  async getLockedListSize(address: string) {
    return this._contract.getLockedListSize(address)
  }

  subscribeEvent(eventName: string, callback: Listener) {
    this._contract.on(eventName, callback)
  }

  unSubscribeAllEvents() {
    this._contract.removeAllListeners()
  }
}

export class WritableBingSuAirdropContract {
  _contract: Contract

  constructor(provider: any, account: string) {
    this._contract = getContract(BINGSU_AIRDROP_CONTRACT_ADDRESS, BINGSU_AIRDROP_ABI, provider, account)
  }

  async releaseToken(id: number) {
    return this._contract.releaseMyToken(id)
  }
  async releaseAllTokens() {
    return this._contract.releaseAllMyToken()
  }
}