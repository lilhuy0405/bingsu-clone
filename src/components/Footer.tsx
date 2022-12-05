import styled from "styled-components";
import {Image} from "antd";
import {AiFillRedditCircle, AiOutlineLink, AiOutlineReddit} from "react-icons/ai";
import {FaTelegramPlane} from "react-icons/fa";
import {BsTwitter} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import useAirdropContract from "../hooks/useAirdropContract";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  background: #000;
  color: #fff;
  text-align: center;
  padding: 50px 10px;
  font-size: 18px;
`
const BigText = styled.div`
  font-size: 30px;
  margin: 20px 0;
`
const StyledA = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;

  svg {
    font-size: 25px;
  }

  &:hover {
    color: #fff;
  }
`

const socialLinks = [
  {
    icon: <AiOutlineLink/>,
    link: 'https://private-sales.bingsu.asia/',
    color: '#0090CD'
  },

  {
    icon: <FaTelegramPlane/>,
    link: 'https://t.me/bingsucoin/',
    color: '#1E96C8'
  },

  {
    icon: <BsTwitter/>,
    link: 'https://twitter.com/bingsucoin/',
    color: '#55ACEE'
  },

  {
    icon: <AiOutlineReddit/>,
    link: 'https://reddit.com/user/Bingsu-Coin-Official/',
    color: '#E04B15'
  },

]

const Footer = () => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <Image src="images/logo.png" preview={false} width={100}/>
      <BigText>
        {t('BINGSU COIN')}
      </BigText>
      <div>
        {t('footer text')}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
        {
          socialLinks.map((item, index) => {
            return (
              <StyledA key={index} href={item.link} target="_blank" rel="noopener noreferrer"
                       style={{background: item.color}}>
                {item.icon}
              </StyledA>
            )
          })
        }
      </div>
    </Wrapper>
  )
}

export default Footer