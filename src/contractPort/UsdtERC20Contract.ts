import {BigNumber} from "ethers";
import {getContract} from "./utils";
import {BUSD_ERC20_TOKEN_ADDRESS, USDT_ERC20_TOKEN_ADDRESS} from "./constants";
import USDT_ERC20_CONTRACT_ABI from './abis/usdtERC20.json'


export class ReadOnlyUsdtERC20Contract {
  _contract

  constructor(provider: any) {
    this._contract = getContract(USDT_ERC20_TOKEN_ADDRESS, USDT_ERC20_CONTRACT_ABI, provider)
  }

  getBalance(address: string): Promise<BigNumber> {
    return this._contract.balanceOf(address)
  }

  getAllowance(owner: string, spender: string): Promise<BigNumber> {
    return this._contract.allowance(owner, spender)
  }
}

export class WritableUsdtERC20Contract {
  _contract

  constructor(provider: any, account: string) {
    this._contract = getContract(USDT_ERC20_TOKEN_ADDRESS, USDT_ERC20_CONTRACT_ABI, provider, account)
  }

  async approve(spenderAddress: string, amount: BigNumber) {
    return this._contract.approve(spenderAddress, amount)
  }
}