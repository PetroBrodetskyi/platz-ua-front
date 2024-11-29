import SidebarCart from './SidebarCart';
import { useTheme } from '../../context/ThemeContext';
import scss from './Sidebar.module.scss';

const Sidebar = ({ handleRemoveFromCart }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.sidebar} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3 className={scss.office}>Кошик</h3>
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

export default Sidebar;
