import { NavLink } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import scss from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={scss.logoFlex}>
      <Tooltip
        title="На головну"
        placement="bottom-end"
        classes={{ tooltip: scss.tooltipCustom }}
      >
        <NavLink to="/" className={scss.logoLink}>
          <div className={scss.logoFlex}>
            <img
              src="/logo.svg"
              alt="Логотип Platz UA"
              className={scss.logoImage}
            />
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
      </Tooltip>
    </div>
  );
};

export default Logo;
