import { useEffect, useState } from 'react';
import scss from './SplashScreen.module.scss';

const SplashScreen = ({ onFinish, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

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
          <h2 className={scss.messageTitle}>{message.title}</h2>
          <p className={scss.messageText}>{message.text}</p>
        </div>
      </div>
    )
  );
};

export default SplashScreen;
