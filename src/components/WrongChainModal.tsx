import {useModal} from "../state/modal";
import {Image, Modal, Spin} from "antd";
import styled from "styled-components";
import {LoadingOutlined} from "@ant-design/icons";
import {BNB_MAINNET_CHAIN_ID} from "../constants/constants";


const BinanceChainBtn = styled.button`
  background: url("/images/binance-btn-bg.png");
  border: none;
  outline: none;
  cursor: pointer;
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  font-weight: 600;
  font-size: 16px;

  img {
    margin-right: 10px;
  }
`
const Title = styled.h4`
  font-size: 20px;
  font-weight: 600;
`
const WrongChainModal = () => {
  const {modal} = useModal();
  const handleChainChange = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: BNB_MAINNET_CHAIN_ID}], // chainId must be in hexadecimal numbers
      });

    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: BNB_MAINNET_CHAIN_ID,
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                chainName: 'Smart Chain'
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  }

  return (
    <Modal
      visible={modal.isOpen}
      closable={false}
      footer={null}
      width={350}
    >

      <div style={{width: "100%", padding: "10px 25px"}}>
        <div style={{textAlign: "center"}}>
          <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
          <Title>Wrong network</Title>
          <p style={{color: "grey"}}>Change network to</p>
        </div>
        <div>
          <BinanceChainBtn onClick={handleChainChange}>
            <Image src="/images/bnb-icon.svg" alt="Binance Chain" preview={false}/>
            <div style={{marginLeft: 10}}>Binance Smart Chain</div>
          </BinanceChainBtn>
        </div>
      </div>

    </Modal>
  )
}

export default WrongChainModal