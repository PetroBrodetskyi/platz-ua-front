import PrivacyPolicy from '../../components/PrivacyPolicy';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './PrivacyPolicyPage.module.scss';

const PrivacyPolicyPage = () => {
  return (
    <div className={scss.home}>
      <PrivacyPolicy />
      <div className={scss.random}>
        <h3 className={scss.title}>Вас можуть зацікавити</h3>
        <RandomCards />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
