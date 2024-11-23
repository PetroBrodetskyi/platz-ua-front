import HowItWorks from '../../components/HowItWorks/HowItWorks';
import RandomCards from '../../components/RandomCards/RandomCards';
import scss from './HowItWorksPage.module.scss';

const HowItWorksPage = () => {
  return (
    <div className={scss.how}>
      <HowItWorks />
      <div className={scss.random}>
        <h3 className={scss.title}>Вас можуть зацікавити</h3>
        <RandomCards />
      </div>
    </div>
  );
};

export default HowItWorksPage;
