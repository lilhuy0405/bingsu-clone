import {Modal, Image} from "antd";
import {useState} from "react";
import {walletTypes} from "./wallets";
import {minimizeAddress} from "../../utils";
import styled from "styled-components";
import useWeb3 from "../../hooks/useWeb3";
import {toast} from "react-hot-toast";
import useListenChainEvents from "../../hooks/useListenChainEvents";

const StyledButton = styled.button`
  background: #EEEEEE;
  font-weight: bold;
  min-width: 100px;
  border: none;
  padding: 6px 16px;
  border-radius: 100px;
  height: 40px;
  cursor: pointer;
  color: #111;
  font-size: 20px;
`
const ButtonWrapper = styled.button`
  width: 100%;
  display: flex;
  padding: 20px 10px;
  border: none;
  cursor: pointer;

  > div {
    margin: 0 10px;
  }
`
const WalletButton = () => {
  useListenChainEvents();
  const [isShowingModal, setIsShowingModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const {activate, deActivate, connection} = useWeb3()
  const handleConnectWallet = async () => {
    const connectWalletPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true)
        await activate()
        setIsShowingModal(false)
        resolve(null)
      } catch (err) {
        console.log(err)
        reject(err)
      } finally {
        setLoading(false)
      }
    })

    await toast.promise(connectWalletPromise, {
      loading: 'Connecting to wallet, check your Metamask wallet...',
      success: 'Welcome back',
      error: err => `Connected to wallet failed ${err.message}`
    })
  }
  return (
    <>
      {
        connection.address ? (
            <StyledButton
              type='button'
              onClick={deActivate}
            >
              {minimizeAddress(connection.address)}
            </StyledButton>)
          : (
            <StyledButton type='button' onClick={() => setIsShowingModal(true)}>Connect to wallet</StyledButton>
          )
      }
      <Modal
        visible={isShowingModal}
        onCancel={() => setIsShowingModal(false)}
        onOk={() => setIsShowingModal(false)}
        footer={null}
        title="Choose Wallet"
      >
        {walletTypes.map(item => (
          <ButtonWrapper onClick={handleConnectWallet} key={item.id}>
            <Image preview={false} width={20} src={`/images/${item.icon}`}/>
            <div>{item.name}</div>
          </ButtonWrapper>
        ))}

      </Modal>
    </>
  )
}

export default WalletButton