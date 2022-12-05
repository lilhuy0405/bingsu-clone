import {Image, notification} from "antd";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {initialCountDown} from "../constants/constants";
import {countDown, formatNumber} from "../utils";
import useAirdropContract from "../hooks/useAirdropContract";
import {toast} from "react-hot-toast";
import {LockPool} from "../state/connection/reducer";

const AirdropAmount = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 26px;
  margin: 10px 0;
`
const CenterColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ClaimButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 5px 60px;
  border-radius: 10px;
  background: #0090CD;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 900;
  cursor: pointer;
  width: 100%;

  &:disabled {
    background: grey;
    cursor: not-allowed;
  }
`

const TimeWrapper = styled.div`
  color: #fff;
  background: black;
  padding: 8px;
  width: 50px;
  height: 50px;
  font-size: 18px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  margin: 0 15px;
`

const AirdropPoolWrapper = styled.div`
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  transition: .5s;

  &:hover {
    background: #0090CD;
    color: #fff;

    > button {
      color: #111;
      background: #fff;
    }

    > button:disabled {
      background: grey;
      cursor: not-allowed;
      color: #fff;
    }
  }
`
const LockTime = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CenterFlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
const AirdropPool = ({item}: { item: LockPool }) => {
  const ableToClaim = new Date().getTime() > item.releaseTime
  const [countDownTime, setCountDownTime] = useState<any>(initialCountDown)
  const [loading, setLoading] = useState<boolean>(false)
  const {releaseToken} = useAirdropContract()
  useEffect(() => {
    if (item.releaseTime - new Date().getTime() <= 0) {
      setCountDownTime(initialCountDown)
      return
    }
    const x = setInterval(() => {
      setCountDownTime(countDown(new Date(item.releaseTime), () => {
        setCountDownTime(initialCountDown)
        clearInterval(x)
      }))
    }, 1000)
    return () => clearInterval(x)
  }, [])
  const handleClaimAirDrop = async (id: number) => {
    const claimPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true)
        const txnReceipt = await releaseToken(id);
        notification.success({
          message: 'Claim Airdrop Success',
          description:
            `You have claimed your airdrop successfully. Please check your wallet
              Transaction Hash: ${txnReceipt.transactionHash}`,
          placement: "bottomLeft",
        });
        resolve(null);
      } catch (err) {
        reject(err)
      } finally {
        setLoading(false)
      }
    })

    await toast.promise(claimPromise, {
      loading: 'Transaction Processing...',
      success: 'Claim Airdrop Successfully',
      error: err => `Claim Failed ${err.message}`
    })
  }

  return (
    <AirdropPoolWrapper>
      <CenterFlexDiv>
        <Image src='/images/airdrop-png.png' width={70} preview={false}/>
      </CenterFlexDiv>
      <AirdropAmount>
        <div>{formatNumber(item.amount.toFixed(2), "$BSC")}</div>
      </AirdropAmount>
      <LockTime>
        <CenterColumnFlexDiv>
          <TimeWrapper>{countDownTime.days}</TimeWrapper>
          <span>Days</span>
        </CenterColumnFlexDiv>
        <CenterColumnFlexDiv>
          <TimeWrapper>{countDownTime.hours}</TimeWrapper>
          <span>Hours</span>
        </CenterColumnFlexDiv>
        <CenterColumnFlexDiv>
          <TimeWrapper>{countDownTime.minutes}</TimeWrapper>
          <span>Minute</span>
        </CenterColumnFlexDiv>
        <CenterColumnFlexDiv>
          <TimeWrapper>{countDownTime.seconds}</TimeWrapper>
          <span>Seconds</span>
        </CenterColumnFlexDiv>
      </LockTime>
      <ClaimButton disabled={!ableToClaim || loading} onClick={async () => await handleClaimAirDrop(item.key)}>
        {loading ? 'Processing...' : 'Claim Airdrop'}
      </ClaimButton>
    </AirdropPoolWrapper>
  )
}

export default AirdropPool