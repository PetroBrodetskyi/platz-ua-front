import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/index.js';
import { RiChatSmile2Line, RiLoginCircleLine } from 'react-icons/ri';
import { PiShoppingCart } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { FiPlusCircle } from 'react-icons/fi';
import {
  MdOutlineFavoriteBorder,
  MdOutlineClose,
  MdOutlineMenu
} from 'react-icons/md';
import Logo from '../Logo';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './InfoMenu.module.scss';

const LeftMenu = ({ onClose }) => {
  const menuRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={scss.menu}>
      <div
        className={`${scss.menuContainer} ${isDarkMode ? scss.darkMode : ''}`}
        ref={menuRef}
      >
        <ul className={scss.menuList}>
          <li className={scss.logo}>
            <button onClick={handleClose}>
              <MdOutlineMenu className={scss.icon} />
            </button>
            <Logo />
          </li>
          <li
            className={`${scss.divider} ${isDarkMode ? scss.darkMode : ''}`}
          ></li>
          <li className={`${scss.item} ${isDarkMode ? scss.darkMode : ''}`}>
            <NavLink to="/" onClick={onClose}>
              <div className={scss.iconItem}>
                <AiOutlineHome className={scss.icon} />
                <p>Головна</p>
              </div>
            </NavLink>
          </li>
          <li className={`${scss.item} ${isDarkMode ? scss.darkMode : ''}`}>
            <NavLink to="/cart" onClick={onClose}>
              <div className={scss.iconItem}>
                <PiShoppingCart className={scss.icon} />
                <p>Інфо</p>
              </div>
            </NavLink>
          </li>
          <li className={`${scss.item} ${isDarkMode ? scss.darkMode : ''}`}>
            <NavLink to="/favorites" onClick={onClose}>
              <div className={scss.iconItem}>
                <MdOutlineFavoriteBorder className={scss.icon} />
                <p>Інфо</p>
              </div>
            </NavLink>
          </li>
          <li className={`${scss.item} ${isDarkMode ? scss.darkMode : ''}`}>
            <NavLink to="/create" onClick={onClose}>
              <div className={scss.iconItem}>
                <FiPlusCircle className={scss.icon} />
                <p>Інфо</p>
              </div>
            </NavLink>
          </li>

          <li className={`${scss.item} ${isDarkMode ? scss.darkMode : ''}`}>
            <NavLink to="/create" onClick={onClose}>
              <div className={scss.iconItem}>
                <FiPlusCircle className={scss.icon} />
                <p>Інфо</p>
              </div>
            </NavLink>
          </li>
          <li
            className={`${scss.divider} ${isDarkMode ? scss.darkMode : ''}`}
          ></li>
          <li className={`${scss.item} ${isDarkMode ? scss.darkMode : ''}`}>
            <ThemeSwitcher />
          </li>
          <li
            className={`${scss.divider} ${isDarkMode ? scss.darkMode : ''}`}
          ></li>
          <li className={`${scss.item} ${isDarkMode ? scss.darkMode : ''}`}>
            <button className={scss.close} onClick={handleClose}>
              <div className={scss.iconItem}>
                <MdOutlineClose className={scss.icon} />
                <p>Закрити</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftMenu;
