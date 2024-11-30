import { useTheme } from '../../../context/ThemeContext';
import scss from './TelegramGroups.module.scss';

const TelegramGroups = () => {
  const { isDarkMode } = useTheme();

  const telegramGroups = [
    {
      name: 'Українці в Німеччині',
      link: 'https://t.me/deutscheukraine'
    },
    {
      name: 'Земля Хессен',
      link: 'https://t.me/hessenUA'
    },
    {
      name: 'Українці в Мюнхені та Баварії',
      link: 'https://t.me/UkraineinMunich'
    }
  ];

  return (
    <div className={`${scss.groupsList} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3 className={scss.title}>Групи Telegram</h3>
      <ul className={scss.container}>
        {telegramGroups.map((group, index) => (
          <li key={index} className={scss.link}>
            <a href={group.link} target="_blank" rel="noopener noreferrer">
              {group.name}
            </a>{' '}
            |
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TelegramGroups;
