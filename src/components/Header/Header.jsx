import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavoriteBorder, MdOutlineDirectionsRun, MdOutlineHowToReg } from 'react-icons/md';
import { PiShoppingCartBold } from 'react-icons/pi';
import scss from './Header.module.scss';
import SearchLocation from '../SearchLocation/SearchLocation';
import Logo from '../Logo/Logo';
import { fetchUserById } from '../../redux/features/authSlice';

const Header = ({ onClick }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchUserById(user._id));
    }
  }, [dispatch, user]);

  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logoUserMobile}>
          <Logo />
          <NavLink to="/user">
            <button type="button" className={scss.iconUserMobile} onClick={onClick}>
              <MdOutlineHowToReg font-size='20px' />
              {user && (
                <div className={scss.userInfo}>
                  <img src={user.avatarURL} alt={user.name} className={scss.avatar} />
                  <span>{user.name}</span>
                </div>
              )}
            </button>
          </NavLink>
        </div>
        <SearchLocation />
        <div className={scss.userMenu}>
          <NavLink to="/user">
            <button type="button" className={scss.iconUserDesktop} onClick={onClick}>
              <MdOutlineHowToReg font-size='24px' />
              {user && (
                <div className={scss.userInfo}>
                  <img src={user.avatarURL} alt={user.name} className={scss.avatar} />
                  <span>{user.name}</span>
                </div>
              )}
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
              <MdOutlineFavoriteBorder />
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
