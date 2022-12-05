import {useState} from "react";
import styled from "styled-components";
import {useHamburger} from "../state/hamburger";
import {menus} from "../constants/constants";

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 250px;
  height: 100vh;
  background: #373A47;
`

const CloseBtn = styled.span`
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 25px;
  color: #fff;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: yellow;
  }
`
const MenuItem = styled.a`
  display: block;
  color: #b8b7ad;
  font-size: 1.15em;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  user-select: none;

  &:hover {
    color: green;
  }
`

const HamburgerMenu = () => {
  const {hamburgerMenu, onToggleHamburger} = useHamburger()
  return (
    <>
      {hamburgerMenu.isOpen && (
        <Menu>
          <CloseBtn onClick={onToggleHamburger}>x</CloseBtn>
          <div style={{marginTop: 50}}>
            {
              menus.map(item => (
                <MenuItem key={item.key} href={item.href} target='_blank'>{item.label}</MenuItem>
              ))
            }
          </div>
        </Menu>
      )}
    </>
  )
}

export default HamburgerMenu;