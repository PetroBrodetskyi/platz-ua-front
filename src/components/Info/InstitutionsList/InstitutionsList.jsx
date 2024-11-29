import { useTheme } from '../../../context/ThemeContext';
import scss from './InstitutionsList.module.scss';

const institutions = [
  {
    name: 'Посольство України в Німеччині',
    website: 'https://germany.mfa.gov.ua/',
    address: 'Albrechtstraße 26, 10117 Berlin',
    phone: '+49 30 2888710',
    mapsLink: 'https://www.google.com/maps?q=Albrechtstraße+26,+10117+Berlin'
  },
  {
    name: 'Генеральне консульство у Франкфурті',
    website: 'https://frankfurt.mfa.gov.ua/',
    address: 'Eschersheimer Landstraße 454, 60431 Frankfurt am Main',
    phone: '+49 69 4786237',
    mapsLink:
      'https://www.google.com/maps?q=Eschersheimer+Landstraße+454,+60431+Frankfurt+am+Main'
  },
  {
    name: 'Генеральне консульство у Гамбурзі',
    website: 'https://hamburg.mfa.gov.ua/',
    address: 'Bornstraße 1, 20146 Hamburg',
    phone: '+49 40 4502060',
    mapsLink: 'https://www.google.com/maps?q=Bornstraße+1,+20146+Hamburg'
  },
  {
    name: 'Генеральне консульство у Мюнхені',
    website: 'https://munich.mfa.gov.ua/',
    address: 'Lessingstraße 14, 80336 München',
    phone: '+49 89 5519240',
    mapsLink: 'https://www.google.com/maps?q=Lessingstraße+14,+80336+München'
  }
];

const InstitutionsList = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`${scss.institutionsList} ${isDarkMode ? scss.darkMode : ''}`}
    >
      <h3>Державні установи України</h3>
      <ul className={scss.container}>
        {institutions.map((institution, index) => (
          <li key={index} className={scss.institutionItem}>
            <a
              href={institution.website}
              target="_blank"
              rel="noopener noreferrer"
              className={scss.institutionLink}
            >
              {institution.name}
            </a>
            <div className={scss.details}>
              <a
                href={institution.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={scss.mapsLink}
              >
                {institution.address}
              </a>
              <a href={`tel:${institution.phone}`} className={scss.phoneLink}>
                {institution.phone}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstitutionsList;
