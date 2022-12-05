import styled from "styled-components";
import WalletButton from "./WalletButton/WalletButton";
import {Avatar, Image, Select} from "antd";
import useWindowSize from "../hooks/useWindowSize";
import {AiOutlineMenu} from "react-icons/ai";
import {useHamburger} from "../state/hamburger";
import {menus} from "../constants/constants";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";

const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background: #0090CD;
`
const HeaderItemsWrapper = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  //width: 300px;

`


const NavigationLink = styled.a`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    color: yellow;
  }
`
const Hamburger = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: 20px;
  font-size: 28px;
  font-weight: bold;
`
const Header = () => {
  const {i18n} = useTranslation()

  const isMobile = useWindowSize(992)
  const {hamburgerMenu, onToggleHamburger} = useHamburger();
  const handleHamburgerBtnClick = () => {
    onToggleHamburger();
  }

  async function handleChange(value: any) {
    await i18n.changeLanguage(value);
    localStorage.setItem('lang', value);
  }

  useEffect(() => {
    const lang = localStorage.getItem('lang') || 'en';
    if (lang) {
      i18n.changeLanguage(lang).then();
    }
  }, [i18n])

  return (
    <HeaderContainer>
      <HeaderItemsWrapper>
        <Image preview={false} src='/images/bingsu-logo.jpg' width={80} style={{borderRadius: '50%'}}/>
        {!isMobile && (
          <div style={{padding: '0 10px'}}>
            BINGSU COIN
          </div>
        )}
        {
          !isMobile ? (
            <div style={{marginLeft: 20}}>
              {
                menus.map(menu => (
                  <NavigationLink key={menu.key} href={menu.href} target='_blank'>{menu.label}</NavigationLink>
                ))
              }

            </div>
          ) : (
            <div>
              <Hamburger onClick={handleHamburgerBtnClick}>
                <AiOutlineMenu/>
              </Hamburger>
            </div>
          )
        }
      </HeaderItemsWrapper>
      <HeaderItemsWrapper>
        <Select defaultValue={localStorage.getItem('lang') || 'en'} style={{width: 150, padding: 10}}
                onChange={handleChange}>
          <Select.Option value="en">
            <Avatar src="/images/eng.png" size={25} style={{marginRight: 5}}/>
            EN
          </Select.Option>
          <Select.Option value="ru">
            <Avatar src="/images/ru.png" size={25} style={{marginRight: 5}}/>
            RU
          </Select.Option>
        </Select>
        <WalletButton/>
      </HeaderItemsWrapper>

    </HeaderContainer>
  )
}

export default Header