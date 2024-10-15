import { useState } from 'react';
import scss from './HowItWorks.module.scss';
import Tabs from './Tabs';
import Buyers from './Buyers';
import Sellers from './Sellers';

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
    </div>
  );
};

export default HowItWorks;
