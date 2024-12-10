import { useLocation } from 'react-router-dom';
import HowItWorks from '../../components/Info/HowItWorks';
import TermsOfService from '../../components/Info/TermsOfService';
import PrivacyPolicy from '../../components/Info/PrivacyPolicy';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './InfoPage.module.scss';

const InfoPage = () => {
  const location = useLocation();

  const isHowItWorks = location.pathname === '/info/how-it-works';
  const isPrivacyPolicy = location.pathname === '/info/privacy-policy';
  const isTermsOfService = location.pathname === '/info/terms-of-service';

  return (
    <div className={scss.infoPage}>
      {isHowItWorks && (
        <div className={scss.privacy}>
          <HowItWorks />
        </div>
      )}

      {isPrivacyPolicy && (
        <div className={scss.privacy}>
          <PrivacyPolicy />
        </div>
      )}

      {isTermsOfService && (
        <div className={scss.terms}>
          <TermsOfService />
        </div>
      )}
      <div className={scss.random}>
        <h3 className={scss.title}>Вас можуть зацікавити</h3>
        <RandomCards />
      </div>
    </div>
  );
};

export default InfoPage;
