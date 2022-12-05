import {getContract} from "./utils";
import {BINGSU_ER20_TOKEN_ADDRESS, BINGSU_FOUNDER_CONTRACT_ADDRESS} from "./constants";
import BINGSU_FOUNDER_ABI from "./abis/bingsuFounder.json";
import {BigNumber} from "ethers";

export class ReadOnlyBingSuFounderContract {
  _contract

  constructor(provider: any) {
    this._contract = getContract(BINGSU_FOUNDER_CONTRACT_ADDRESS, BINGSU_FOUNDER_ABI, provider)
  }

  getBnbPrice(): Promise<BigNumber> {
    return this._contract.bnbPrice()
  }

  getSaleDiv(): Promise<BigNumber> {
    return this._contract.saleDiv()
  }

  getSalePrice(): Promise<BigNumber> {
    return this._contract.salePrice()
  }
}

export class WritableBingSuFounderContract {
  _contract

  constructor(provider: any, account: string) {
    this._contract = getContract(BINGSU_FOUNDER_CONTRACT_ADDRESS, BINGSU_FOUNDER_ABI, provider, account)
  }

  async callBuyTokenByBNB(amount: BigNumber) {
    //send ether to contract
    return this._contract.buyTokenByBNB({value: amount})
  }

  async callBuyTokenByBUSD(amount: BigNumber) {
    return this._contract.buyTokenByBUSD(amount)
  }

  async callBuyTokenByUSDT(amount: BigNumber) {
    return this._contract.buyTokenByUSDT(amount)
  }
}