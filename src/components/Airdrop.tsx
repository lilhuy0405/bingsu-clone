import styled from "styled-components";
import {useConnection} from "../state/connection";
import {Divider, notification} from "antd";
import AirdropPool from "./AirdropPool";
import {LockPool} from "../state/connection/reducer";
import {formatNumber} from "../utils";
import useAirdropContract from "../hooks/useAirdropContract";
import {useState} from "react";
import {toast} from "react-hot-toast";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
`
const Title = styled.h1`
  font-size: 3.3333rem;
  text-align: center;
  margin: 50px 0;
  font-weight: 900;
`
const AirdropCard = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-size: 20px;
`
const AirdropCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 36px;
    font-weight: 900;
  }

`

const Hint = styled.div`

  margin-top: 20px;
`

const ClaimAllButton = styled.button`
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

  &:disabled {
    background: grey;
    cursor: not-allowed;
    color: #fff;
  }
`

const PoolWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
const CenterFlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const Airdrop = () => {
  const {connection} = useConnection()
  const {releaseAllToken} = useAirdropContract()
  const [loading, setLoading] = useState(false)
  const pools = connection.airDropLockPools.filter((item: LockPool) => !item.isReleased)
  const claimed = connection.airDropLockPools.filter((item: LockPool) => item.isReleased).reduce((acc, item) => acc + item.amount, 0);
  const ableToClaimAll = !connection.airDropLockPools.some((item: LockPool) => new Date().getTime() > item.releaseTime)
  const handleReleaseAllToken = async () => {
    const claimAllPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true)
        const txnReceipt = await releaseAllToken()
        notification.success({
          message: 'Claim Airdrop Success',
          description:
            `You have claimed your airdrop successfully. Please check your wallet
              Transaction Hash: ${txnReceipt.transactionHash}`,
          placement: "bottomLeft",
        });
        resolve(null)
      } catch (err) {
        reject(err)
      } finally {
        setLoading(false)
      }
    })

    await toast.promise(claimAllPromise, {
      loading: 'Transaction Processing...',
      success: 'Claim Airdrop Successfully',
      error: err => `Claim Failed ${err.message}`
    })
  }
  return (
    <Wrapper>
      <Title>BINGSU AIRDROP</Title>
      <AirdropCard>
        <AirdropCardHeader>
          <div>
            <h4>Claim Aidrop</h4>
            <div>BINGSU Token nomic for Airdrop: <b>50,000,000,000,000.00 $BSC</b></div>
            <div>Airdrop claimed to this wallet: <b>{formatNumber(claimed.toFixed(2), "$BSC")}</b></div>
          </div>
        </AirdropCardHeader>
        <Hint>
          <span>
            How to get airdrop ? Buy BINGSU with minimum value of 50$ to get x10 BINGSU Airdrop. Your airdrop will be locked for 6
            months.
          </span>
        </Hint>
        <Divider/>
        <Title>
          Your airdrops:
        </Title>
        {
          pools.length > 0 ? (
            <>
              <PoolWrapper>
                {
                  pools.map((item: any) => (
                    <AirdropPool item={item} key={item.key}/>
                  ))
                }
              </PoolWrapper>
              <CenterFlexDiv style={{marginTop: '20px'}}>
                <ClaimAllButton disabled={!ableToClaimAll || loading} onClick={handleReleaseAllToken}>
                  {loading ? 'Processing...' : 'Claim all available Airdrop'}
                </ClaimAllButton>
              </CenterFlexDiv>
            </>
          ) : (
            <p><i>You don't have any airdrop yet buy bingsu with minimum value of 50 $ to get your first airdrop</i></p>
          )
        }

      </AirdropCard>
    </Wrapper>
  )
}

export default Airdrop;