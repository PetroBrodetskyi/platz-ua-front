import Filter from '../Filter';
import InstitutionsList from '../Info/InstitutionsList';
import { useTheme } from '../../context/ThemeContext';
import scss from './SidebarLeft.module.scss';

const SidebarLeft = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.sidebar} ${isDarkMode ? scss.darkMode : ''}`}>
      <ul className={scss.leftSidebar}>
        <li>
          <div className={scss.cartContent}>
            <Filter />
          </div>
        </li>
        <li>
          <div className={scss.cartContent}>
            <InstitutionsList />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarLeft;
