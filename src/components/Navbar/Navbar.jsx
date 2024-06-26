import { NavLink } from 'react-router-dom';
import scss from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={scss.navbar}>
      <ul className={scss.navList}>
        <li className={scss.navItem}>
          <NavLink to="/" exact activeClassName={scss.active}>Home</NavLink>
        </li>
        <li className={scss.navItem}>
          <NavLink to="/categories" activeClassName={scss.active}>Categories</NavLink>
        </li>
        <li className={scss.navItem}>
          <NavLink to="/products" activeClassName={scss.active}>Products</NavLink>
        </li>
        <li className={scss.navItem}>
          <NavLink to="/cart" activeClassName={scss.active}>Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
