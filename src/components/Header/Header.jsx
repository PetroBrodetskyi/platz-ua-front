import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
import { PiShoppingCartBold } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineDirectionsRun, MdOutlineHowToReg } from 'react-icons/md';
import SearchLocation from '../SearchLocation/SearchLocation';
import Logo from '../Logo/Logo';

const Header = ({ onClick }) => {
  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logoUserMobile}>
          <Logo />
          <NavLink to="/user">
            <button type="button" className={scss.iconUserMobile} onClick={onClick}>
              <MdOutlineHowToReg font-size='20px' />  
            </button>
          </NavLink>
        </div>
        <SearchLocation />
        <div className={scss.userMenu}>
          <NavLink to="/user">
            <button type="button" className={scss.iconUserDesktop} onClick={onClick}>
              <MdOutlineHowToReg font-size='24px'/>  
            </button>
          </NavLink>
          <NavLink to="/login">
            <button type="button" className={scss.icon} onClick={onClick}>
              <MdOutlineDirectionsRun />  
            </button>
          </NavLink>
          <NavLink to="/cart">
            <button type="button" className={scss.icon} onClick={onClick}>
              <PiShoppingCartBold />
            </button>
          </NavLink>
          <NavLink to="/favorites">
            <button type="button" className={scss.icon} onClick={onClick}>
              <MdOutlineFavoriteBorder/>
            </button>
          </NavLink>
        </div>
      </div>
      {/* <Navbar /> */}
    </header>
  );
};

export default Header;