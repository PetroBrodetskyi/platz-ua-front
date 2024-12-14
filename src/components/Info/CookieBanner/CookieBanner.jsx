import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { AiOutlineWarning, AiOutlineLineChart } from 'react-icons/ai';
import { MdOutlineSecurity, MdOutlineAnalytics } from 'react-icons/md';
import { FaRegHeart, FaRegStar } from 'react-icons/fa';
import SubmitButton from '../../../components/SubmitButton';
import { useTheme } from '../../../context/ThemeContext';
import scss from './CookieBanner.module.scss';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();

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
      <div
        className={`${scss.cookieBanner} ${isDarkMode ? scss.darkMode : ''}`}
      >
        <div className={scss.logoContainer}>
          <img src="/logo.svg" alt="Логотип Platz UA" className={scss.logo} />
          <button className={scss.closeButton} onClick={handleReject}>
            <FiX className={scss.icon} />
          </button>
        </div>
        <h2 className={scss.title}>Перш ніж перейти на PlatzUA</h2>
        <h4>Ми використовуємо файли cookie та інші технології для:</h4>
        <ul className={scss.list}>
          <li className={scss.item}>
            <MdOutlineSecurity className={scss.icon} />
            забезпечення стабільної роботи сайту та покращення його
            функціональності
          </li>
          <li className={scss.item}>
            <AiOutlineWarning className={scss.icon} />
            аналізу трафіку, відстеження помилок, боротьби зі спамом і
            шахрайством
          </li>
          <li className={scss.item}>
            <MdOutlineAnalytics className={scss.icon} />
            оцінки зацікавленості аудиторії для вдосконалення наших сервісів
          </li>
          <li className={scss.item}>
            <FaRegHeart className={scss.icon} />
            надання інформації про ваші вподобання. Детальніше у{' '}
            <a className={scss.link} href="/info/privacy-policy">
              Політиці конфіденційності
            </a>
          </li>
        </ul>
        <h4>
          Якщо ви виберете "Прийняти всі", ми також будемо використовувати файли
          cookie для:
        </h4>
        <ul className={scss.list}>
          <li className={scss.item}>
            <FaRegStar className={scss.icon} />
            розробки нових функцій та вдосконалення існуючих сервісів
          </li>
          <li className={scss.item}>
            <AiOutlineLineChart className={scss.icon} />
            показу та оцінки ефективності реклами
          </li>
          <li className={scss.item}>
            <FaRegHeart className={scss.icon} />
            персоналізації рекламних матеріалів відповідно до ваших вподобань
          </li>
        </ul>
        <h4>
          Якщо ви виберете "Відхилити", ми обмежимо використання файлів cookie
          лише необхідними для роботи сайту
        </h4>
        <div className={scss.buttons}>
          <SubmitButton buttonText="Прийняти всі" onClick={handleAccept} />
          <SubmitButton buttonText="Відхилити" onClick={handleReject} />
        </div>
      </div>
    )
  );
};

export default CookieBanner;
