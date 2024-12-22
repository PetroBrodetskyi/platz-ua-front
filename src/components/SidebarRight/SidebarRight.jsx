import SidebarCart from './SidebarCart';
import ExchangeRateBanner from '../Info/ExchangeRateBanner';
import TelegramGroups from '../Info/TelegramGroups';
import ResourcesList from '../Info/ResourcesList';
import CreateAdButton from '../CreateAdButton';
import { useTheme } from '../../context/ThemeContext';
import scss from './SidebarRight.module.scss';

const SidebarRight = ({ handleRemoveFromCart, onCreateAdClick }) => {
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
          <CreateAdButton onClick={onCreateAdClick} />
        </li>
        <li>
          <ExchangeRateBanner />
        </li>
        <li>
          <ResourcesList />
        </li>
        <li>
          <TelegramGroups />
        </li>
      </ul>
    </div>
  );
};

export default SidebarRight;
