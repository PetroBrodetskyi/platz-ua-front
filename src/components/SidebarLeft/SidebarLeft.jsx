import Filter from '../Filter';
import { useTheme } from '../../context/ThemeContext';
import scss from './SidebarLeft.module.scss';

const SidebarLeft = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.sidebar} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3 className={scss.title}>Розділи та категорії</h3>
      <ul className={scss.cartSidebar}>
        <li>
          <div className={scss.cartContent}>
            <Filter />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarLeft;
