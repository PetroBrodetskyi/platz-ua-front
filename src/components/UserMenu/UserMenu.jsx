import { NavLink } from 'react-router-dom';
import scss from './UserMenu.module.scss';

const UserMenu = ({ onClose }) => (
  <div className={scss.menuContainer}>
    <ul className={scss.menuList}>
      <li>
        <NavLink to="/user-profile" onClick={onClose}>
          Мій профіль
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-ads" onClick={onClose}>
          Мої оголошення
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-messages" onClick={onClose}>
          Мої повідомлення
        </NavLink>
      </li>
    </ul>
  </div>
);

export default UserMenu;
