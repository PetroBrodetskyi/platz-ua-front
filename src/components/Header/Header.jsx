import React from 'react';
import { NavLink } from 'react-router-dom';
import scss from './Header.module.scss';
import Navbar from '../Navbar/Navbar';
import SearchLocation from '../SearchLocation/SearchLocation';


const Header = () => {
  const handleSearchResults = (results) => {
    console.log('Search results:', results);
  };

  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logo}>PlatzUA</div>
        <SearchLocation />
        <div className={scss.userMenu}>
          <button>Sign In</button>
          <div className={scss.cartIcon}>
            <NavLink to="/cart">
              <span role="img" aria-label="cart">🛒</span>
              <span className={scss.badge}>3</span>
            </NavLink>
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
