import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
// import Navbar from '../Navbar/Navbar';
import SearchLocation from '../SearchLocation/SearchLocation';

const Header = () => {
  const handleSearchResults = (results) => {
    console.log('Search results:', results);
  };

  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logoFlex}>
          <NavLink to="/" className={scss.logoLink}>
            <div className={scss.logoBackground}>
              <h1 className={scss.logo}>
                <span className={scss.logoLetterP}>P</span>
                <span className={scss.logoLetterL}>l</span>
                <span className={scss.logoLetterA}>a</span>
                <span className={scss.logoLetterT}>t</span>
                <span className={scss.logoLetterZ}>z</span>
                <span className={scss.logoLetterU}>U</span>
                <span className={scss.logoLetterA2}>A</span>
              </h1>
            </div>
          </NavLink>
        </div>
        <SearchLocation />
        <div className={scss.userMenu}>
          <NavLink to="/login">
            <button>Sign In</button>
          </NavLink>
          <div className={scss.cartIcon}>
            <NavLink to="/cart">
              <span role="img" aria-label="cart">🛒</span>
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
