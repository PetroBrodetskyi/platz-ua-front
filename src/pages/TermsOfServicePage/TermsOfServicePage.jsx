import TermsOfService from '../../components/TermsOfService';
import scss from './TermsOfServicePage.module.scss';

const TermsOfServicePage = () => {
  return (
    <div className={scss.home}>
      <TermsOfService />
    </div>
  );
};

export default TermsOfServicePage;
