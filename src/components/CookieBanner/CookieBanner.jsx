import { useState, useEffect } from 'react';
import scss from './CookieBanner.module.scss';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);

    loadGoogleAnalytics();
  };

  const loadGoogleAnalytics = () => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4VZXZ9J5C3';
    script.async = true;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-4VZXZ9J5C3');
    };
    document.head.appendChild(script);
  };

  return (
    isVisible && (
      <div className={scss.cookieBanner}>
        <p>
          Ми використовуємо файли cookie та інші технології для забезпечення
          коректної роботи сайту, аналізу трафіку та покращення його
          функціональності. Ви можете змінити налаштування cookie у своєму
          браузері або припинити використання сайту, якщо не погоджуєтесь із
          цим. Детальніше про те, як ми обробляємо ваші дані, читайте у нашій{' '}
          <a href="/privacy-policy">Політиці конфіденційності</a>. Продовжуючи
          використання сайту, ви погоджуєтесь на обробку файлів cookie.
        </p>
        <button onClick={handleAccept}>Зрозуміло!</button>
      </div>
    )
  );
};

export default CookieBanner;
