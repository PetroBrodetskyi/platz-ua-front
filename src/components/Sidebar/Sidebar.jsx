import { useState } from 'react';
import { IoChevronUpOutline, IoChevronDownSharp } from 'react-icons/io5';
import SidebarFavorites from './SidebarFavorites/SidebarFavorites';
import SidebarMyAds from './SidebarMyAds/SidebarMyAds';
import SidebarCart from './SidebarCart/SidebarCart';
import { useTheme } from '../../context/ThemeContext';
import scss from './Sidebar.module.scss';

const Sidebar = ({ handleRemoveFromCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true);
  const [isMyAdsOpen, setIsMyAdsOpen] = useState(true);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleFavorites = () => setIsFavoritesOpen((prev) => !prev);
  const toggleMyAds = () => setIsMyAdsOpen((prev) => !prev);
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.sidebar} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3 className={scss.office}>Кабінет</h3>
      <ul className={scss.cartSidebar}>
        <li>
          <h3 onClick={toggleCart} className={scss.toggleHeader}>
            Кошик {isCartOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
          </h3>
          {isCartOpen && (
            <div className={scss.cartContent}>
              <SidebarCart handleRemoveFromCart={handleRemoveFromCart} />
            </div>
          )}
        </li>

        <li>
          <h3 onClick={toggleFavorites} className={scss.toggleHeader}>
            Обрані{' '}
            {isFavoritesOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
          </h3>
          {isFavoritesOpen && (
            <div className={scss.cartContent}>
              <SidebarFavorites />
            </div>
          )}
        </li>

        <li>
          <h3 onClick={toggleMyAds} className={scss.toggleHeader}>
            Мої оголошення{' '}
            {isMyAdsOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
          </h3>
          {isMyAdsOpen && (
            <div className={scss.cartContent}>
              <SidebarMyAds />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
