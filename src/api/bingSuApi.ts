import axiosClient from "./axiosClient";

type BuyBingSuResp = {
  data: {
    amount: number,
    id: number,
    userAddress: string,
    createdAt: string
  },
  message: string, status: 200
}
type GetUSDSpentParams = {
   address: string | undefined
}
const bingSuApi = {
  getUsdSpent: (params: GetUSDSpentParams): Promise<BuyBingSuResp> => {
    const path = '/usdSpent';
    return axiosClient.get(path, {params});
  },

  buyBingSu: (data: { txnHash: string, buyerAddress: string }) => {
    const path = "/buy"
    return axiosClient.post(path, data)
  }
}

export default bingSuApi