import scss from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <p>&copy; 2024 PlatzUA</p>
      </div>
    </footer>
  );
};

export default Footer;