import React, { useEffect, useState } from 'react';
import scss from './SplashScreen.module.scss';

const SplashScreen = ({ onFinish, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  return (
    visible && (
      <div className={scss.splashScreen}>
        <div className={scss.logoContainer}>
          <h1 className={scss.logo}>
            <span className={scss.logoLetterP}>P</span>
            <span className={scss.logoLetterL}>l</span>
            <span className={scss.logoLetterA}>a</span>
            <span className={scss.logoLetterT}>t</span>
            <span className={scss.logoLetterZ}>z</span>
            <span className={scss.logoLetterU}>U</span>
            <span className={scss.logoLetterA2}>A</span>
          </h1>
          <h4>Der Marktplatz für Ukrainer</h4>
        </div>
      </div>
    )
  );
};

export default SplashScreen;
