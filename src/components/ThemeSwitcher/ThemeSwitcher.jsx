import { Switch } from '@mui/material';
import { ImSun } from 'react-icons/im';
import { BsMoon } from 'react-icons/bs';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={scss.themeContainer}>
      <h4>Змінити тему</h4>
      <div className={scss.themeToggle}>
        <ImSun className={scss.icon} onClick={toggleTheme} />
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          color="primary"
          inputProps={{ 'aria-label': 'theme switcher' }}
        />
        <BsMoon className={scss.icon} onClick={toggleTheme} />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
