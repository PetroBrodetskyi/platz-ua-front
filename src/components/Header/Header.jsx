import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { PiShoppingCart, PiShoppingCartFill } from 'react-icons/pi';
import { RiLoginCircleLine } from 'react-icons/ri';
import Tooltip from '@mui/material/Tooltip';
import scss from './Header.module.scss';
import SearchLocation from '../SearchLocation/SearchLocation';
import Logo from '../Logo/Logo';
import { fetchCurrentUser } from '../../redux/features/authSlice';
import Catalog from '../Catalog';

const Header = ({ onClick }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
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

  const getUserProfileUrl = () =>
    user ? `/user-profile/${user._id}` : '/login';

  const renderUserInfo = () =>
    user && (
      <Tooltip title={user.name} arrow>
        <div className={scss.userInfo}>
          <img src={user.avatarURL} alt={user.name} className={scss.avatar} />
        </div>
      </Tooltip>
    );

  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logoUserMobile}>
          <Logo />
          <NavLink to={getUserProfileUrl()}>
            <button
              type="button"
              className={scss.iconUserMobile}
              onClick={onClick}
            >
              {renderUserInfo()}
            </button>
          </NavLink>
        </div>
        <div className={scss.menu}>
          <Catalog />

          <SearchLocation
            onSearch={(products) => {
              products;
            }}
          />
        </div>
        <div className={scss.userMenu}>
          <NavLink to={getUserProfileUrl()}>
            <button
              type="button"
              className={scss.iconUserDesktop}
              onClick={onClick}
            >
              {renderUserInfo()}
            </button>
          </NavLink>
          {!user && (
            <NavLink to="/login">
              <button type="button" className={scss.icon} onClick={onClick}>
                <div className={scss.navigateItem}>
                  <RiLoginCircleLine />
                  <span className={scss.userOptions}></span>
                </div>
              </button>
            </NavLink>
          )}
          <NavLink to="/cart">
            <button type="button" className={scss.icon} onClick={onClick}>
              <div className={scss.navigateItem}>
                {cartItems.length > 0 ? (
                  <PiShoppingCartFill />
                ) : (
                  <PiShoppingCart />
                )}
                <span className={scss.userOptions}></span>
              </div>
            </button>
          </NavLink>
          <NavLink to="/favorites">
            <button
              type="button"
              className={`${scss.icon} ${animateFavorite ? scss.animate : ''} ${favorites.length > 0 ? scss.favorite : ''}`}
              onClick={onClick}
            >
              <div className={scss.navigateItem}>
                {favorites.length > 0 ? (
                  <MdOutlineFavorite />
                ) : (
                  <MdOutlineFavoriteBorder />
                )}
                <span className={scss.userOptions}></span>
              </div>
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
