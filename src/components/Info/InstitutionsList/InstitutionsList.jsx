import { useTheme } from '../../../context/ThemeContext';
import scss from './InstitutionsList.module.scss';

const institutions = [
  {
    name: 'Посольство України в Німеччині',
    website: 'https://germany.mfa.gov.ua/',
    address: 'Albrechtstrasse 26, 10117 Berlin',
    phone: '+49 30 28887128',
    mapsLink: 'https://www.google.com/maps?q=Albrechtstrasse+26,+10117+Berlin'
  },
  {
    name: 'Генеральне консульство у Франкфурті',
    website: 'https://frankfurt.mfa.gov.ua/',
    address: 'Vilbeler Str. 29, 60313 Frankfurt am Main',
    phone: '+49 69 29720920',
    mapsLink:
      'https://www.google.com/maps?q=Vilbeler+Str.+29,+60313+Frankfurt+am+Main'
  },
  {
    name: 'Генеральне консульство в Гамбурзі',
    website: 'https://hamburg.mfa.gov.ua/',
    address: 'Mundsburger Damm 1, 22087 Hamburg',
    phone: '+49 40 22949811',
    mapsLink: 'https://www.google.com/maps?q=Mundsburger+Damm+1,+22087+Hamburg'
  },
  {
    name: 'Генеральне консульство в Мюнхені',
    website: 'https://munich.mfa.gov.ua/',
    address: 'Riedenburger Straße 2, 81677 München',
    phone: '+49 89 55273718',
    mapsLink:
      'https://www.google.com/maps?q=Riedenburger+Straße+2,+81677+München'
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
