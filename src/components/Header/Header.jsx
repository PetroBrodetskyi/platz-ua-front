import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
import { PiShoppingCart } from "react-icons/pi";
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import SearchLocation from '../SearchLocation/SearchLocation';
import SubmitButton from '../SubmitButton/SubmitButton';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <Logo />
        <SearchLocation />
        <div className={scss.userMenu}>
          <NavLink to="/login">
            <SubmitButton buttonText="Увійти" />
          </NavLink>
          <div className={scss.iconsFlex}>
            <div className={scss.cartIcon}>
              <NavLink to="/cart">
                <div><PiShoppingCart color='rgba(13, 13, 14, 0.804)'/></div>
                <span className={scss.badge}>3</span>
              </NavLink>
            </div>
            <div className={scss.faviriteIcon}>
              <NavLink to="/favorite">
                <div><MdOutlineFavoriteBorder color='rgba(13, 13, 14, 0.804)'/></div>
                <span className={scss.badge}>3</span>
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
