import styled from "styled-components";
import {useEffect, useState} from "react";
import {Button, Form, notification, Skeleton} from "antd";
import useWeb3 from "../hooks/useWeb3";
import {toast} from "react-hot-toast";
import useBingSuFounder from "../hooks/useBingSuFounder";
import {calculateBnbPerBingSu, calculateUsdPerBingSu, formatNumber, removeTrailZeros} from "../utils";
import {
  AIRDROP_AMOUNT,
  BINGSU_TOKEN_DECIMALS,
  BINGSU_TOKEN_SYMBOL,
  INITIAL_TOKEN_SALE_PRICE,
  TokenSalePrice
} from "../constants/constants";
import {BINGSU_ER20_TOKEN_ADDRESS} from "../contractPort/constants";
import SaleStatus from "./SaleStatus";
import {useTranslation} from "react-i18next";
import bingSuApi from "../api/bingSuApi";
import {useQuery} from "react-query";
import {FaRegHandPointRight} from "react-icons/fa";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 18px;
  flex-wrap: wrap;
`
const BuyTokenDiv = styled.div`
  padding: 32px;
  border-radius: 28px;
  width: 49%;
  background: #0090CD;
  color: #fff;
  @media only screen and (max-width: 1225px) {
    margin-bottom: 20px;
    width: 100%;
  }
`
const Title = styled.h4`
  font-weight: bold;
  font-size: 28px;
  color: #fff;
`
const StyledNumberInput = styled.input`
  width: 100%;
  border: none !important;
  font-size: 22px !important;
  background: transparent !important;
  color: #fff;

  outline: none;

  box-shadow: none !important;

  font-weight: 600;

  &:focus {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
    color: #fff;
    font-weight: 600;
  }
`
const BuyBtn = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 20px;
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  background: #f88b00;

  &:hover {
    background: #B17001;
  }
`
const TokenBalanceDiv = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`
const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  margin-bottom: 10px;
  color: #fff;
`

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`
const StyledSelect = styled.select`
  width: 75px;
  font-size: 18px;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;

  option {
    color: #111;
  }


`
const AmountWrapper = styled.div`
  width: 100%;
  border-radius: 28px;
  padding: 10px 30px;
  margin: 20px 0;
  background: rgba(0, 0, 0, .3);
  color: #fff;

  input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }

`

const CenterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AddTokenBtn = styled.button`
  cursor: pointer;
  display: block;
  width: fit-content;
  margin: 0 auto;
  background: #fff;
  font-weight: 600;
  border: none;
  color: #111;
  border-radius: 20px;
  padding: 10px 15px;
`

const StyledForm = styled(Form)`
  font-size: 18px !important;
`


const TokenSeller = () => {
  const {t} = useTranslation();
  const {isActive, connection, addTokenToWallet} = useWeb3()
  const [form] = Form.useForm()
  const {buyBingSuByBnB, getSaleDiv, getSalePrice, getBNBPrice, buyBingSuByBUSD, buyBingSuByUSDT} = useBingSuFounder()
  const [loading, setIsLoading] = useState(false)
  const [tokenPrice, setTokenPrice] = useState<TokenSalePrice>(INITIAL_TOKEN_SALE_PRICE)
  const [buyAmount, setBuyAmount] = useState<any>("0.00")

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery(['getUsdSpent', connection.address],
    ({queryKey}) => bingSuApi.getUsdSpent({address: queryKey[1]}),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    })

  const fetchTokenPrice = async () => {
    const saleDiv = await getSaleDiv()
    const salePrice = await getSalePrice()
    const bnbPrice = await getBNBPrice()
    if (!salePrice || !saleDiv || !bnbPrice) return
    setTokenPrice({saleDiv, salePrice, bnbPrice})
  }
  useEffect(() => {
    if (window.ethereum) {
      fetchTokenPrice().then()
    }
  }, [window.ethereum])
  const listBuyTokens = [
    {
      code: 'bnb',
      label: 'BNB',
      handleBuy: buyBingSuByBnB,
      price: calculateBnbPerBingSu(1, tokenPrice.saleDiv, tokenPrice.salePrice, tokenPrice.bnbPrice),
      balanceCode: 'bnbBalance'
    },
    {
      code: 'usdt',
      label: 'USDT',
      handleBuy: buyBingSuByUSDT,
      price: calculateUsdPerBingSu(1, tokenPrice.saleDiv, tokenPrice.salePrice),
      balanceCode: 'usdtBalance'
    },
    {
      code: 'busd',
      label: 'BUSD',
      handleBuy: buyBingSuByBUSD,
      price: calculateUsdPerBingSu(1, tokenPrice.saleDiv, tokenPrice.salePrice),
      balanceCode: 'busdBalance'
    }
  ]
  const [activeToken, setActiveToken] = useState<any>(listBuyTokens[0])


  const handleBuyBingSu = async (values: any) => {
    if (isNaN(buyAmount)) {
      toast.error("Please enter a valid amount")
      return
    }
    if (parseFloat(buyAmount) <= 0) {
      toast.error("Amount must be greater than 0")
      return
    }

    if (!isActive) {
      notification.error({
        message: "Wallet not connected",
        description: "Please connect to wallet to continue",
        placement: "bottomRight"
      })
      return
    }
    const buyTokenPromise = new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true)

        //get chosen token
        const buyToken = listBuyTokens.find(item => item.code === values.tokenSymbol)
        if (!buyToken) {
          throw new Error("Buy token not valid")
        }
        const txnReceipt = await buyToken.handleBuy(buyAmount)
        //call api
        await bingSuApi.buyBingSu({
          txnHash: txnReceipt.transactionHash,
          buyerAddress: txnReceipt.from
        })
        //update usd spent
        await refetch()
        form.resetFields()
        setBuyAmount(0)
        resolve(null)
      } catch (err) {
        console.error(err)
        reject(err)
      } finally {
        setIsLoading(false)
      }
    })
    await toast.promise(buyTokenPromise, {
      loading: 'Transaction processing...',
      success: 'Bought success',
      error: err => `Bought token by ${activeToken.label} failed: ${err.message}`
    })

  }
  const handleChangeAmount = (e: any) => {
    const amount = e.target.value
    if (isNaN(amount)) {
      return
    }
    setBuyAmount(amount)
  }
  return (
    <Wrapper>
      <BuyTokenDiv>
        <Title>{t('Buy BINGSU COIN')}</Title>
        <TokenBalanceDiv>
          {t('BINGSU Coin Balance')}: {formatNumber(connection.bingSuBalance, "$BSC")}
        </TokenBalanceDiv>
        <TokenBalanceDiv>
          {/*@ts-ignore*/}
          {activeToken.label} {t('balance')}: {formatNumber(connection[activeToken.balanceCode], activeToken.label)}
        </TokenBalanceDiv>
        <TokenBalanceDiv>
          {
            isLoading ? <Skeleton/> : isError ? (
              <>
                {formatNumber("0.00", "USDT/BUSD")} Spent {AIRDROP_AMOUNT} USD more for airdrop
              </>
            ) : data && (
              <>
                {formatNumber(data.data.amount.toString(), "USDT/BUSD")} Spent <FaRegHandPointRight/>
                {formatNumber((AIRDROP_AMOUNT - data.data.amount).toString(), "USDT/BUSD")} more for airdrop
              </>
            )
          }
        </TokenBalanceDiv>
        <div>
          <StyledForm
            name='buy-bingsu'
            onFinishFailed={() => toast.error("please check form value")}
            onFinish={handleBuyBingSu}
            form={form}
          >
            <AmountWrapper>
              <StyledDiv>
                <div style={{fontWeight: 'bold'}}>
                  {t('Amount')}
                </div>
                <StyledFormItem
                  name='tokenSymbol'
                  initialValue={activeToken.code}
                >
                  <StyledSelect
                    onChange={(e) => {
                      const chosen = listBuyTokens.find(item => item.code === e.target.value)
                      if (!chosen) return
                      setActiveToken(chosen)
                    }}
                    value={activeToken.code}
                  >
                    {listBuyTokens.map(item => (
                      <option key={item.code} value={item.code}>{item.label}</option>
                    ))}
                  </StyledSelect>
                </StyledFormItem>
              </StyledDiv>
              <StyledNumberInput
                value={buyAmount}
                onChange={handleChangeAmount}
                placeholder='Enter amount'
              />
            </AmountWrapper>
            <StyledDiv>
              <div><b>{t('Est BINGSU COIN')}: </b></div>
              <b>{formatNumber(removeTrailZeros((activeToken.price * buyAmount).toFixed(13)), "$BSC")} </b>
            </StyledDiv>
            <StyledDiv>
              <div><b>{t('Price')}: </b></div>
              <b>{formatNumber(removeTrailZeros((1 / activeToken.price).toFixed(13)), "")} {activeToken.label} {t('per')} $BSC</b>
            </StyledDiv>
            <Form.Item>
              <BuyBtn type="primary" htmlType="submit" disabled={loading}>
                {t('BUY BINGSU COIN')}
              </BuyBtn>
            </Form.Item>
          </StyledForm>
        </div>
        <CenterDiv>
          <AddTokenBtn
            onClick={() =>
              addTokenToWallet({
                address: BINGSU_ER20_TOKEN_ADDRESS,
                decimals: BINGSU_TOKEN_DECIMALS,
                symbol: BINGSU_TOKEN_SYMBOL
              })}
          >
            {t('Add BINGSU COIN to METAMASK')}
          </AddTokenBtn>
        </CenterDiv>
      </BuyTokenDiv>
      <SaleStatus/>
    </Wrapper>
  )
}

export default TokenSeller