import { useTheme } from '../../../context/ThemeContext';
import scss from './ResourcesList.module.scss';

const resources = [
  {
    name: 'Germany4Ukraine',
    description: 'Офіційний портал допомоги українцям у Німеччині.',
    website: 'https://www.germany4ukraine.de/hilfeportal-ua'
  },
  {
    name: 'Make it in Germany',
    description:
      'Інформація для новоприбулих про роботу, навчання та життя в Німеччині.',
    website: 'https://www.make-it-in-germany.com/uk/'
  },
  {
    name: 'BAMF – Федеральне відомство з міграції та біженців',
    description:
      'Офіційна інформація щодо прав і обов’язків біженців у Німеччині.',
    website: 'https://www.bamf.de/EN/'
  },
  {
    name: 'Для українців від Міністерства праці Німеччини',
    description: 'Поради для працевлаштування та соціальної підтримки.',
    website: 'https://www.bmas.de/EN/'
  },
  {
    name: 'Карітас Німеччини',
    description: 'Гуманітарна допомога, консультації та підтримка біженців.',
    website: 'https://www.caritas.de/'
  }
];

const ResourcesList = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${scss.resourcesList} ${isDarkMode ? scss.darkMode : ''}`}>
      <h3>Корисні ресурси</h3>
      <ul className={scss.container}>
        {resources.map((resource, index) => (
          <li key={index} className={scss.resourceItem}>
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className={scss.resourceLink}
            >
              <h4>{resource.name}</h4>
            </a>
            <p className={scss.description}>{resource.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesList;
