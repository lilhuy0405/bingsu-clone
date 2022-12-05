import styled from "styled-components";
import {Progress} from "antd";
import {formatNumber} from "../utils";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
`
const Card = styled.div`
  width: 600px;
  margin: 0 auto;
  border-radius: 28px;
  padding: 20px;
  background: #0090CD;
  color: #fff;
  font-size: 18px;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const CardTitle = styled.h1`
  color: #fff;
  border-left: 5px solid #F88B00;
  padding-left: 10px;
`
const TimeLineWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  >div {
    margin-bottom: 0px;
  }
`
const TimeLineTitle = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  
`

const StyledProgress = styled(Progress)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  .ant-progress-text {
    color: #fff;
  }
`

const StyledScrollDiv = styled.div`
  width: 100%;
  padding: 0 20px;
  height: 500px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */

  &::-webkit-scrollbar-track {
    background: #9E9E9E;
    border-radius: 10px;
  }

  /* Handle */

  &::-webkit-scrollbar-thumb {
    background: #eee;
    border-radius: 10px;
  }
`
const TimeLine = () => {
  const {t} = useTranslation();
  const timeLines = [
    {
      key: "5",
      name: "IDO",
      time: `(${t('15 May 2022 - 15 June 2022')})`,
      unit: "0.000000000045",
      percentage: 0,
      amount: 20_000_000_000_000
    },

    {
      key: "1",
      name: `${t('Presale - Round')} 1`,
      time: `(${t('1 July 2022 - 31 July 2022')})`,
      unit: "0.00000000045",
      percentage: 0,
      amount: 20_000_000_000_000
    },


    {
      key: "2",
      name: `${t('Presale - Round')} 2`,
      time: `(${t('1 August 2022 - 31 August 2022')})`,
      unit: "0.0000000045",
      percentage: 0,
      amount: 20_000_000_000_000
    },

    {
      key: "3",
      name: `${t('Presale - Round')} 3`,
      time: `(${t('1 September 2022 - 30 September 2022')})`,
      unit: "0.000000045",
      percentage: 0,
      amount: 20_000_000_000_000
    },



  ]
  return (
    <Wrapper>
      <Card>
        <CardTitle>TIMELINE</CardTitle>
      <StyledScrollDiv>
        {
          timeLines.map(item => (
            <TimeLineWrapper key={item.key}>
              <TimeLineTitle>{item.name}: {item.time}</TimeLineTitle>
              <div>{t('Amount')}: <b>{formatNumber(item.amount.toFixed(2), '')}</b></div>
              <div>{t('Unit')}: <b>{item.unit}</b></div>
              <StyledProgress
                percent={item.percentage}
                strokeColor={'#F88B00'}
                showInfo={true}
                strokeWidth={10}
                style={{marginTop: 10, color: '#fff'}}
                strokeLinecap='square'
              />
            </TimeLineWrapper>
          ))
        }
      </StyledScrollDiv>
      </Card>
    </Wrapper>
  )
}

export default TimeLine