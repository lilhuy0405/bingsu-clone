import {Image} from "antd";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px
`

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
`

const CenterFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const StyledLink = styled.a`
  text-decoration: underline;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  font-style: italic;
  
  &:hover {
    text-decoration: underline;
  }
  
`
const SmartContractAudit = () => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <Title>{t('Smart Contract Audit')}</Title>
      <CenterFlexContainer>
        <a href="/files/BingSu_SmartContract_Audit.pdf" target='_blank'>
          <Image src="/images/logo-audit.png" preview={false}/>
        </a>
      </CenterFlexContainer>
    </Wrapper>
  );
};

export default SmartContractAudit;