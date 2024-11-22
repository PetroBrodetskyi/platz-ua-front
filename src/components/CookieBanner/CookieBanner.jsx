import { useState, useEffect } from 'react';
import scss from './CookieBanner.module.scss';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = document.cookie.includes('cookiesAccepted=true');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    document.cookie = 'cookiesAccepted=true; path=/; max-age=31536000';
    setIsVisible(false);
    loadGoogleAnalytics();
  };

  const handleReject = () => {
    document.cookie = 'cookiesAccepted=false; path=/; max-age=31536000';
    setIsVisible(false);
  };

  const loadGoogleAnalytics = () => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4VZXZ9J5C3';
    script.async = true;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-4VZXZ9J5C3');
    };
    document.head.appendChild(script);
  };

  return (
    isVisible && (
      <div className={scss.cookieBanner}>
        <div className={scss.logoTitle}>
          <img src="/logo.svg" alt="Логотип Platz UA" className={scss.logo} />
          <h3 className={scss.title}>Використання файлів cookie</h3>
        </div>
        <p>
          Ми використовуємо файли cookie та інші технології для забезпечення
          коректної роботи сайту, аналізу трафіку та покращення його
          функціональності. Ви можете налаштувати свої вподобання нижче або
          детальніше ознайомитися у{' '}
          <a href="/privacy-policy">Політиці конфіденційності</a>.
        </p>
        <div className={scss.buttons}>
          <button onClick={handleAccept}>Прийняти всі</button>
          <button onClick={handleReject}>Відхилити</button>
        </div>
      </div>
    )
  );
};

export default CookieBanner;
