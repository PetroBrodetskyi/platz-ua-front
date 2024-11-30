import SidebarCart from './SidebarCart';
import ExchangeRateBanner from '../Info/ExchangeRateBanner'; // Імпорт банера
import { useTheme } from '../../context/ThemeContext';
import scss from './SidebarRight.module.scss';
import ResourcesList from '../Info/ResourcesList';

const SidebarRight = ({ handleRemoveFromCart }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.sidebar} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3 className={scss.title}>Кошик</h3>
      <ul className={scss.container}>
        <li>
          <div className={scss.cartContent}>
            <SidebarCart handleRemoveFromCart={handleRemoveFromCart} />
          </div>
        </li>
        <li>
          <ExchangeRateBanner />
        </li>
        <li>
          <ResourcesList />
        </li>
      </ul>
    </div>
  );
};

export default SidebarRight;
