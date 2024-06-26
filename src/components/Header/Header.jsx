import React from 'react';
import { NavLink } from 'react-router-dom';  // Додайте цей імпорт
import scss from './Header.module.scss';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logo}>PlatzUA</div>
        <div className={scss.searchBar}>
          <input type="text" placeholder="Search for products..." />
          <button>Search</button>
        </div>
        <div className={scss.userMenu}>
          <button>Sign In</button>
          <div className={scss.cartIcon}>
            <NavLink to="/cart">
              <span role="img" aria-label="cart">🛒</span>
              <span className={scss.badge}>3</span> {/* Кількість товарів у кошику */}
            </NavLink>
          </div>
        </div>
      </div>
      <Navbar /> {/* Додаємо Navbar тут */}
    </header>
  );
};

export default Header;
