import { AiOutlineHome } from 'react-icons/ai'; // Імпортуємо іконку Home
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { PiShoppingCart, PiShoppingCartFill } from 'react-icons/pi';
import { RiLoginCircleLine } from 'react-icons/ri';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import SearchLocation from '../SearchLocation/SearchLocation';
import Logo from '../Logo/Logo';
import UserMenu from '../UserMenu/UserMenu';
import { fetchCurrentUser } from '../../redux/features/authSlice';
import Catalog from '../Catalog';
import scss from './Header.module.scss';

const createTooltipStyles = (marginTop) => ({
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: `${marginTop}px`
    }
});

const Header = ({ onClick }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const [animateFavorite, setAnimateFavorite] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    user ? `/user-profile/${user._id}` : '/auth';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderUserInfo = () =>
    user && (
      <Tooltip
        title={user.name}
        placement="bottom-end"
        slotProps={{
          popper: { sx: createTooltipStyles(24) }
        }}
      >
        <div className={scss.userInfo}>
          <img
            src={user.avatarURL}
            alt={user.name}
            className={scss.avatar}
            onClick={toggleMenu}
          />
        </div>
      </Tooltip>
    );

  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logoUserMobile}>
          <Logo />
          <button
            type="button"
            className={scss.iconUserMobile}
            onClick={onClick}
          >
            {user && user.verify && renderUserInfo()}
          </button>
        </div>
        <div className={scss.menu}>
          <Catalog />
          <SearchLocation onSearch={(products) => products} />
        </div>
        <div className={scss.userMenu}>
          <button
            type="button"
            className={scss.iconUserDesktop}
            onClick={onClick}
          >
            {user && user.verify && renderUserInfo()}
          </button>
          {isMenuOpen && (
            <UserMenu
              onClose={() => setIsMenuOpen(false)}
              getUserProfileUrl={getUserProfileUrl}
            />
          )}
          {!user || !user.verify ? (
            <Tooltip
              title="Увійти"
              slotProps={{
                popper: { sx: createTooltipStyles(32) }
              }}
            >
              <NavLink to="/auth">
                <button type="button" className={scss.icon} onClick={onClick}>
                  <RiLoginCircleLine />
                  <span className={scss.userOptions}></span>
                </button>
              </NavLink>
            </Tooltip>
          ) : null}
          <Tooltip
            title="Головна"
            slotProps={{
              popper: { sx: createTooltipStyles(32) }
            }}
          >
            <NavLink to="/">
              <button type="button" className={scss.iconHome} onClick={onClick}>
                <AiOutlineHome />
                <span className={scss.userOptions}></span>
              </button>
            </NavLink>
          </Tooltip>
          <Tooltip
            title="Кошик"
            slotProps={{
              popper: { sx: createTooltipStyles(32) }
            }}
          >
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
          </Tooltip>
          <Tooltip
            title="Улюблені"
            slotProps={{
              popper: { sx: createTooltipStyles(32) }
            }}
          >
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
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
