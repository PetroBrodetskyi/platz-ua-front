import SidebarCart from './SidebarCart';
import { useTheme } from '../../context/ThemeContext';
import scss from './SidebarRight.module.scss';

const SidebarRight = ({ handleRemoveFromCart }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.sidebar} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3 className={scss.title}>Кошик</h3>
      <ul className={scss.cartSidebar}>
        <li>
          <div className={scss.cartContent}>
            <SidebarCart handleRemoveFromCart={handleRemoveFromCart} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarRight;
