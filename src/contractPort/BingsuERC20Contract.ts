import {BaseContract, BigNumber} from "ethers";
import {getContract} from "./utils";
import {BINGSU_ER20_TOKEN_ADDRESS} from "./constants";
import BINGSU_ERC20_CONTRACT_ABI from './abis/bingsuERC20.json'


export class ReadOnlyBingsuERC20Contract {
  _contract

  constructor(provider: any) {
    this._contract = getContract(BINGSU_ER20_TOKEN_ADDRESS, BINGSU_ERC20_CONTRACT_ABI, provider)
  }

  getName() {
    return this._contract.name()
  }

  getBalance(address: string): Promise<BigNumber> {
    return this._contract.balanceOf(address)
  }
}

export class WritableBingsuERC20Contract {
  _contract

  constructor(provider: any, account: string) {
    this._contract = getContract(BINGSU_ER20_TOKEN_ADDRESS, BINGSU_ERC20_CONTRACT_ABI, provider, account)
  }

  async approve(spenderAddress: string, amount: number) {
    return this._contract.approve(spenderAddress, amount)
  }
}