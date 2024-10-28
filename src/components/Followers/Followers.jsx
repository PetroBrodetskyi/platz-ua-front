import { useState } from 'react';
import scss from './Followers.module.scss';
import Tabs from '../Tabs';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';

const Followers = ({ followersData, followingData }) => {
  const [activeTab, setActiveTab] = useState('following');

  const tabs = [
    { label: 'Стежить', value: 'following' },
    { label: 'Читачі', value: 'followers' }
  ];

  const renderTabContent = {
    following: <FollowingList following={followingData} />,
    followers: <FollowersList followers={followersData} />
  }[activeTab];

  return (
    <div className={scss.followers}>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
      {renderTabContent}
    </div>
  );
};

export default Followers;
