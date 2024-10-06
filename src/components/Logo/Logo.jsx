import { NavLink } from 'react-router-dom';
import scss from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={scss.logoFlex}>
      <NavLink
        to="/"
        className={scss.logoLink}
        aria-label="Перейти на головну сторінку"
      >
        <div className={scss.logoFlex}>
          <img src="/logo.svg" alt="Logo" className={scss.logoImage} />
          <div className={scss.logoText}>
            <h1 className={scss.logo}>
              <span>Platz</span>
              <div className={scss.logoLetters}>
                <span className={scss.letterU}>U</span>
                <span className={scss.letterA}>A</span>
              </div>
            </h1>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Logo;
