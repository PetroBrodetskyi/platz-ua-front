import { AiOutlineHome } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineMenu
} from 'react-icons/md';
import { PiShoppingCart, PiShoppingCartFill } from 'react-icons/pi';
import { RiLoginCircleLine } from 'react-icons/ri';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import SearchLocation from '../SearchLocation';
import Logo from '../Logo/Logo';
import UserMenu from '../UserMenu/UserMenu';
import InfoMenu from '../InfoMenu/InfoMenu';
import { fetchCurrentUser } from '../../redux/features/authSlice';
import { ConfirmationLogin } from '../../components/Confirmation/Confirmation';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './Header.module.scss';

const createTooltipStyles = (marginTop) => ({
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: `${marginTop}px`
    }
});

const Header = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [animateFavorite, setAnimateFavorite] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

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

  const toggleLeftMenu = () => {
    setIsLeftMenuOpen((prev) => !prev);
    if (isRightMenuOpen) {
      setIsRightMenuOpen(false);
    }
  };

  const toggleRightMenu = () => {
    setIsRightMenuOpen((prev) => !prev);
    if (isLeftMenuOpen) {
      setIsLeftMenuOpen(false);
    }
  };

  const handleLoginConfirm = () => {
    setShowConfirmation(false);
    navigate('/auth');
  };

  const handleLoginCancel = () => {
    setShowConfirmation(false);
  };

  const handleActionClick = (action) => {
    if (!user) {
      setShowConfirmation(true);
    } else {
      navigate(action);
    }
  };

  const renderUserInfo = () =>
    user && (
      <Tooltip
        title={user.name}
        placement="bottom-end"
        slotProps={{ popper: { sx: createTooltipStyles(24) } }}
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
    <header className={`${scss.header} ${isDarkMode ? scss.darkMode : ''}`}>
      <div className={scss.container}>
        <div className={scss.logoUserMobile}>
          <button onClick={toggleLeftMenu}>
            <MdOutlineMenu className={scss.icon} />
          </button>
          {isLeftMenuOpen && (
            <InfoMenu onClose={() => setIsLeftMenuOpen(false)} />
          )}
          <Logo />
          <button
            type="button"
            className={scss.iconUserMobile}
            onClick={toggleRightMenu}
          >
            {user && user.verify && renderUserInfo()}
          </button>
        </div>
        <SearchLocation onSearch={(products) => products} />
        <div className={scss.userMenu}>
          <button
            type="button"
            className={scss.iconUserDesktop}
            onClick={toggleRightMenu}
          >
            {user && user.verify && renderUserInfo()}
          </button>
          {isRightMenuOpen && (
            <UserMenu
              onClose={() => setIsRightMenuOpen(false)}
              getUserProfileUrl={getUserProfileUrl}
            />
          )}
          {!user || !user.verify ? (
            <Tooltip
              title="Увійти"
              slotProps={{ popper: { sx: createTooltipStyles(32) } }}
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
            slotProps={{ popper: { sx: createTooltipStyles(32) } }}
          >
            <NavLink to="/">
              <button type="button" className={scss.icon} onClick={onClick}>
                <AiOutlineHome />
                <span className={scss.userOptions}></span>
              </button>
            </NavLink>
          </Tooltip>
          <Tooltip
            title="Кошик"
            slotProps={{ popper: { sx: createTooltipStyles(32) } }}
          >
            <button
              type="button"
              className={scss.icon}
              onClick={() => handleActionClick('/cart')}
            >
              <div className={scss.navigateItem}>
                {cartItems.length > 0 ? (
                  <PiShoppingCartFill />
                ) : (
                  <PiShoppingCart />
                )}
                <span className={scss.userOptions}></span>
              </div>
            </button>
          </Tooltip>
          <Tooltip
            title="Улюблені"
            slotProps={{ popper: { sx: createTooltipStyles(32) } }}
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

      {showConfirmation && (
        <ConfirmationLogin
          message="Для перегляду кошика, будь ласка, увійдіть у свій акаунт"
          onConfirm={handleLoginConfirm}
          onCancel={handleLoginCancel}
        />
      )}
    </header>
  );
};

export default Header;
