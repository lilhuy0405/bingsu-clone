export type TokenSalePrice = {
  salePrice: number,
  bnbPrice: number,
  saleDiv: number
}
export const INITIAL_TOKEN_SALE_PRICE: TokenSalePrice = {
  salePrice: 1,
  bnbPrice: 400,
  saleDiv: 55_555_555
}

export const BINGSU_TOKEN_DECIMALS = 18;
export const BINGSU_TOKEN_SYMBOL = "$BSC"


export const BNB_MAINNET_CHAIN_ID = '0x38'
export const BNB_MAINNET_CHAIN_ID_DECIMAL = 56

export const AIRDROP_AMOUNT  = 50


export const menus = [
  {
    key: 1,
    label: 'WHITE PAPER',
    href: "/files/Bingsu-Coin-WP.pdf"
  },
  {
    key: 2,
    label: 'CSR',
    href: "https://forms.gle/C1akWCYBKvx96gXR6"
  },
  {
    key: 3,
    label: 'NFT Game',
    href: "#"
  },

  {
    key: 4,
    label: 'Media Partners',
    href: "#"
  },

  {
    key: 5,
    label: 'Contact',
    href: "#"
  },

]

export const API_URL = "https://bingsu.fynspace.com/api"
export const initialCountDown = {days: 0, hours: 0, minutes: 0, seconds: 0}
export const RELEASE_TOKEN_EVENT_NAME = "ReleaseMyToken"
export const TRANSFER_AND_LOCK_EVENT_NAME = "TransferAndLock"

