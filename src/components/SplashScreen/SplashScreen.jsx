import { useEffect, useState } from 'react';
import scss from '../Logo/Logo.module.scss';

const SplashScreen = ({ onFinish, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    visible && (
      <div className={scss.splashScreen}>
        <div className={scss.logoSplash}>
          <div className={scss.imgLogo}>
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
          <h2 className={scss.message}>{message.title}</h2>
          <p className={scss.message}>{message.text}</p>
        </div>
      </div>
    )
  );
};

export default SplashScreen;
