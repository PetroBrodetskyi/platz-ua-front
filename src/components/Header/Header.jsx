import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
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
          <NavLink to="/user">
            <button type="button" className={scss.icon} onClick={onClick}>
              <FaRegUser />  
            </button>
          </NavLink>
          <NavLink to="/login">
            <button type="button" className={scss.icon} onClick={onClick}>
              <MdOutlineDirectionsRun />  
            </button>
          </NavLink>
            <button type="button" className={scss.icon} onClick={onClick}>
              <NavLink to="/cart">
                <PiShoppingCartBold />
          </NavLink>
            </button>
            <button type="button" className={scss.icon} onClick={onClick}>
          <NavLink to="/favorites">
                <MdOutlineFavoriteBorder/>
          </NavLink>
            </button>
        </div>
      </div>
      {/* <Navbar /> */}
    </header>
  );
};

export default Header;