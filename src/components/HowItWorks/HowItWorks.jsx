import React, { useState } from 'react';
import scss from './HowItWorks.module.scss';
import Tabs from './Tabs/Tabs';
import Buyers from './Buyers/Buyers';
import Sellers from './Sellers/Sellers';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('buyers');

  const renderTabContent = {
    buyers: <Buyers />,
    sellers: <Sellers />,
  }[activeTab];

  return (
    <div className={scss.howitworks}>
      <h2>Як це працює</h2>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent}
    </div>
  );
};

export default HowItWorks;
