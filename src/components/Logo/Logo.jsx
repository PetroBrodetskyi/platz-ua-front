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
        <div className={scss.logoBackground}>
          <h1 className={scss.logo}>
            <span className={scss.logoLetterP}>P</span>
            <span className={scss.logoLetterL}>l</span>
            <span className={scss.logoLetterA}>a</span>
            <span className={scss.logoLetterT}>t</span>
            <span className={scss.logoLetterZ}>z</span>
            <span className={scss.logoLetterU}>U</span>
            <span className={scss.logoLetterA2}>A</span>
          </h1>
          <h5>Der Marktplatz für Ukrainer</h5>
        </div>
      </NavLink>
    </div>
  );
};

export default Logo;
