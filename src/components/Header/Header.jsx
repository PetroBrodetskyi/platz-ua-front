import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
import { PiShoppingCartBold, PiSignInBold } from "react-icons/pi";
import { MdOutlineFavoriteBorder, MdOutlineDirectionsRun } from 'react-icons/md';
import SearchLocation from '../SearchLocation/SearchLocation';
import Logo from '../Logo/Logo';

const Header = ({ onClick }) => {
  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <Logo />
        <SearchLocation />
        <div className={scss.userMenu}>
          <NavLink to="/login">
            <button type="button" className={scss.loginButton} onClick={onClick}>
              <MdOutlineDirectionsRun />  
              <PiSignInBold />
              
            </button>
          </NavLink>
          <div className={scss.iconsFlex}>
            <div className={scss.cartIcon}>
              <NavLink to="/cart">
                <div><PiShoppingCartBold color='rgba(13, 13, 14, 0.804)'/></div>
              </NavLink>
            </div>
            <div className={scss.favoriteIcon}>
              <NavLink to="/favorites">
                <div><MdOutlineFavoriteBorder color='rgba(13, 13, 14, 0.804)'/></div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
    </header>
  );
};

export default Header;
