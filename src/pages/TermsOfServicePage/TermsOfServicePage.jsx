import RandomCards from '../../components/RandomCards/RandomCards';
import TermsOfService from '../../components/TermsOfService';
import scss from './TermsOfServicePage.module.scss';

const TermsOfServicePage = () => {
  return (
    <div className={scss.terms}>
      <TermsOfService />
      <div className={scss.random}>
        <h3 className={scss.title}>Вас можуть зацікавити</h3>
        <RandomCards />
      </div>
    </div>
  );
};

export default TermsOfServicePage;
