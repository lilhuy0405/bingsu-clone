import {useEffect, useState} from "react";
import {countDown} from "../utils";
import styled from "styled-components";
import {Progress} from "antd";
import useBingSuFounder from "../hooks/useBingSuFounder";
import {useConnection} from "../state/connection";
import {useTranslation} from "react-i18next";
import {initialCountDown} from "../constants/constants";

const Wrapper = styled.div`
  padding: 32px;
  border-radius: 28px;
  width: 49%;
  margin-left: 20px;
  background: #0090CD;
  color: #fff;

  @media only screen and (max-width: 1225px) {
    margin-left: 0;
    width: 100%;
  }
`
const FlexDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

`

const TimeWrapper = styled.div`
  color: #fff;
  background: black;
  padding: 8px;
  width: 120px;
  font-size: 18px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 10px;
`

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`
const SmallTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`
const SaleTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`

const expiredDate = new Date(2022, 6, 15, 23, 50, 0, 0); //js count month from 0
const SaleStatus = () => {
  const {t} = useTranslation()
  const [countDownTime, setCountDownTime] = useState<any>(initialCountDown)

  const [salePercent, setSalePercent] = useState(0)
  const {connection, onUpdateFounderBingSuBalanceAsync} = useConnection();
  const calculateSalePercent = () => {
    const salePercent = 100 - (parseFloat(connection.founderContractBingsuBalance) / 33_333_333_300_000 * 100)
    if(isNaN(salePercent)) {
      setSalePercent(0.12)
    } else {
      setSalePercent(salePercent)
    }
  }
  useEffect(() => {
    onUpdateFounderBingSuBalanceAsync()
  }, [])
  useEffect(() => {
    calculateSalePercent()
  }, [connection])

  useEffect(() => {
    if (expiredDate.getTime() - new Date().getTime() <= 0) {
      setCountDownTime(initialCountDown)
      return
    }
    const x = setInterval(() => {
      setCountDownTime(countDown(expiredDate, () => {
        setCountDownTime(initialCountDown)
        clearInterval(x)
      }))
    }, 1000)
    return () => clearInterval(x)
  }, [])

  return (
    <Wrapper>
      <Title>{t('BINGSU COIN IS HERE')}</Title>
      <SmallTitle>{t('Our IDO ends in')}</SmallTitle>

      <FlexDiv>
        <TimeWrapper>
          {countDownTime.days} {t('days')}
        </TimeWrapper>
        <TimeWrapper>
          {countDownTime.hours} {t('hours')}
        </TimeWrapper>
        <TimeWrapper>
          {countDownTime.minutes} {t('minutes')}
        </TimeWrapper>
        <TimeWrapper>
          {countDownTime.seconds} {t('seconds')}
        </TimeWrapper>
      </FlexDiv>

      <SaleTitle>{t('Token supply')}</SaleTitle>
      <div>1,000,000,000,000,000 $BSC ({t('1 Quadrillion $BSC')})</div>

      <SaleTitle>{t('IDO Sale Supply')}</SaleTitle>
      <div>20,000,000,000,000.00</div>

      <SaleTitle>{t('Payment methods')}</SaleTitle>
      <div>BNB, USDT, BUSD</div>

      <SaleTitle>{t('IDO Sale ends')}</SaleTitle>
      <div>{t('July 15th, 2022 at 23.50 (UTC+0)')}</div>

      <Progress
        percent={salePercent}
        strokeColor={'#00ff00'}
        showInfo={false}
        strokeWidth={20}
        style={{marginTop: 25, marginBottom: 5}}
        strokeLinecap='square'
      />
      <div>{t('Total percent raised')}: {salePercent} %</div>
    </Wrapper>
  )
}

export default SaleStatus