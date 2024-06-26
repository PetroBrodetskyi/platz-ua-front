import scss from './Header.module.scss';

const Header = () => {
  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <div className={scss.logo}>PlatzUA</div>
        <div className={scss.searchBar}>
          <input type="text" placeholder="Search for products..." />
          <button>Search</button>
        </div>
        <div className={scss.userMenu}>
          <button>Sign In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;