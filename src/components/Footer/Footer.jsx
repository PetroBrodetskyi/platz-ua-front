import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './Footer.module.scss';

const Footer = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className={`${scss.footer} ${isDarkMode ? scss.darkMode : ''}`}>
      <div className={scss.container}>
        <div className={scss.title}>
          <p>&copy; {new Date().getFullYear()} PlatzUA</p>
        </div>
        <div>
          <ul className={scss.linksList}>
            <li className={scss.link}>
              <button
                className={scss.linkButton}
                onClick={() => handleNavigation('/info/how-it-works')}
              >
                Покупцям та продавцям
              </button>
            </li>
            <li className={scss.link}>
              <button
                className={scss.linkButton}
                onClick={() => handleNavigation('/info/terms-of-service')}
              >
                Умови використання
              </button>
            </li>
            <li className={scss.link}>
              <button
                className={scss.linkButton}
                onClick={() => handleNavigation('/info/privacy-policy')}
              >
                Політика конфіденційності
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
