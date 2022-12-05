import styled from "styled-components";
import {Col, Row} from "antd";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  padding: 20px;
`
const Title = styled.div`

  font-size: 30px;
  font-weight: bold;
  color: #111;
  margin-bottom: 20px;
  text-align: center;
`
const FounderAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid #fff;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
`
const FlexContainer = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`
const Card = styled.a`
  display: block;
  margin: 10px 50px;
  text-align: center;
  > h3 {
    font-size: 20px;
    font-weight: bold;
    color: #111;
    margin: 10px 0;
  }
`

const Founder = () => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <Title>{t('Who\'s on board with BINGSU')}</Title>
      <FlexContainer>
        <Card href='https://www.linkedin.com/in/kung-mi-kun-84a210238' target='_blank'>
          <FounderAvatar style={{backgroundImage: `url('images/founder-1.jpg')`}}/>
          <h3>{t('Toyun')}</h3>
          <h3>{t('CTO')}</h3>
        </Card>

        <Card href='https://www.facebook.com/mobile8888' target='_blank'>
          <FounderAvatar style={{backgroundImage: `url('images/founder-2.jpg')`}}/>
          <h3>{t('Coen Wang')}</h3>
          <h3>{t('CTO')}</h3>
        </Card>
      </FlexContainer>
    </Wrapper>
  )
}

export default Founder;