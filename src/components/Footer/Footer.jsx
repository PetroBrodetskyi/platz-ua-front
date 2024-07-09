import React from 'react';
import scss from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <p>&copy; {new Date().getFullYear()} PlatzUA</p>
      </div>
    </footer>
  );
};

export default Footer;
