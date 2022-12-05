import styled from "styled-components";
import {Col, Image, Row} from "antd";
import {minimizeAddress} from "../utils";
import {BINGSU_ER20_TOKEN_ADDRESS} from "../contractPort/constants";
import {BiCopy} from "react-icons/bi";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;

`
const Title = styled.div`
  font-size: 3.3333rem;
  text-align: center;
  margin: 50px 0;
  font-weight: 900;
`

const Container = styled.div`
  width: 100%;
`
const InstructionCard = styled.div`
  padding: 50px;
  width: 100%;
  border-radius: 20px;
  background: #0090CD;
  color: #fff;
  font-size: 1.35vw;
  margin-bottom: 20px;
  min-height: 600px;
  max-height: 600px;
  @media (max-width: 992px) {
    font-size: 18px;
  }
`
const InstructionIndex = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`
const InstructionStep = styled.div`
  font-size: 2.1rem;
  font-weight: bold;
  margin-bottom: 20px;
`
const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  margin-bottom: 10px;

  svg {
    margin-left: 10px;
  }

  padding: 0;
`
const Instruction = () => {
  const {t} = useTranslation();
  const handleCopy = async (e: any) => {
    e.preventDefault()
    await navigator.clipboard.writeText(BINGSU_ER20_TOKEN_ADDRESS)
    toast.success(`Copy BINGSU's contract Address Successfully to clipboard!`)
  }
  return (
    <Wrapper>
      <Title>{t('HOW TO BUY BINGSU COIN')}</Title>
      <Container>
        <Row gutter={36}>
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <InstructionCard>
              <InstructionIndex>01</InstructionIndex>
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <Image src={"/images/instruction.png"} preview={false} width={120}/>
              </div>
              <InstructionStep>{t('Step')} 1</InstructionStep>
              <div>
                {t('Install Metamask on your devices and add custom token by BINGSU\'s contract address:')}
              </div>
              <CopyBtn onClick={handleCopy}>
                {minimizeAddress((BINGSU_ER20_TOKEN_ADDRESS))} <BiCopy/>
              </CopyBtn>

            </InstructionCard>
          </Col>

          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <InstructionCard>
              <InstructionIndex>02</InstructionIndex>
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <Image src={"/images/instruction.png"} preview={false} width={120}/>
              </div>
              <InstructionStep>{t('Step')} 2</InstructionStep>
              <div>
                {t('Visit our official website and connect Metamask. Enter the amount and click BUY button!')}
              </div>
            </InstructionCard>
          </Col>

          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <InstructionCard>
              <InstructionIndex>03</InstructionIndex>
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <Image src={"/images/instruction.png"} preview={false} width={120}/>
              </div>
              <InstructionStep>{t('Step')} 3</InstructionStep>
              <div>
                {t('Go back to Metamask and increase gas fee a little bit for faster transaction. Wait for transaction result.')}
              </div>
            </InstructionCard>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Instruction;