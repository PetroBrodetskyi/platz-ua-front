import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdOutlineHowToReg } from 'react-icons/md';
import { PiShoppingCart, PiShoppingCartFill } from 'react-icons/pi';
import { RiLoginCircleLine } from "react-icons/ri";
import scss from './Header.module.scss';
import SearchLocation from '../SearchLocation/SearchLocation';
import Logo from '../Logo/Logo';
import { fetchCurrentUser } from '../../redux/features/authSlice';

const Header = ({ onClick }) => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const [animateFavorite, setAnimateFavorite] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (favorites.length > 0) {
      setAnimateFavorite(true);
      const timeout = setTimeout(() => setAnimateFavorite(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [favorites]);

  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logoUserMobile}>
          <Logo />
          <NavLink to={user ? `/user/${user._id}` : '/user'}>
            <button type="button" className={scss.iconUserMobile} onClick={onClick}>
              {loading ? (
                <div className={scss.userInfo}>
                  <span>Loading...</span>
                </div>
              ) : (
                user && (
                  <div className={scss.userInfo}>
                    <img src={user.avatarURL} alt={user.name} className={scss.avatar} />
                    <span>{user.name}</span>
                  </div>
                )
              )}
            </button>
          </NavLink>
        </div>
        <SearchLocation />
        <div className={scss.userMenu}>
          <NavLink to={user ? `/user/${user._id}` : '/user'}>
            <button type="button" className={scss.iconUserDesktop} onClick={onClick}>
              {loading ? (
                <div className={scss.userInfo}>
                  <span>Loading...</span>
                </div>
              ) : (
                user && (
                  <div className={scss.userInfo}>
                    <img src={user.avatarURL} alt={user.name} className={scss.avatar} />
                    <span>{user.name}</span>
                  </div>
                )
              )}
            </button>
          </NavLink>
          {!user && (
            <NavLink to="/login">
              <button type="button" className={scss.icon} onClick={onClick}>
                <RiLoginCircleLine />
              </button>
            </NavLink>
          )}
          <NavLink to="/cart">
            <button type="button" className={scss.icon} onClick={onClick}>
              {cartItems.length > 0 ? <PiShoppingCartFill /> : <PiShoppingCart />}
            </button>
          </NavLink>
          <NavLink to="/favorites">
            <button
              type="button"
              className={`${scss.icon} ${animateFavorite ? scss.animate : ''} ${favorites.length > 0 ? scss.favorite : ''}`}
              onClick={onClick}
            >
              {favorites.length > 0 ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
