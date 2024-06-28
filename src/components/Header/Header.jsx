import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
import { PiShoppingCartBold } from "react-icons/pi";
import SearchLocation from '../SearchLocation/SearchLocation';
import Logo from '../Logo/Logo';

const Header = () => {

  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <Logo />
        <SearchLocation />
        <div className={scss.userMenu}>
          <NavLink to="/login">
            <button>Sign In</button>
          </NavLink>
          <div className={scss.cartIcon}>
            <NavLink to="/cart">
              <div><PiShoppingCartBold color='white'/></div>
              <span className={scss.badge}>3</span>
            </NavLink>
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
    </header>
  );
};

export default Header;
