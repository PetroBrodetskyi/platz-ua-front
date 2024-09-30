import { useState } from 'react';
import scss from './HowItWorks.module.scss';
import Tabs from './Tabs/Tabs';
import Buyers from './Buyers/Buyers';
import Sellers from './Sellers/Sellers';
import RandomCards from '../RandomCards/RandomCards';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('buyers');

  const renderTabContent = {
    buyers: <Buyers />,
    sellers: <Sellers />
  }[activeTab];

  return (
    <div className={scss.howitworks}>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent}
      <RandomCards />
    </div>
  );
};

export default HowItWorks;
