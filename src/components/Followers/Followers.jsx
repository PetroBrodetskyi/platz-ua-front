import { useState } from 'react';
import { useDispatch } from 'react-redux';
import scss from './Followers.module.scss';
import Tabs from '../Tabs';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import axiosInstance from '../../redux/axiosConfig';
import { setFollowingStatus } from '../../redux/features/authSlice';
import Notification from '../Notification';

const Followers = ({ followersData, followingData, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'following');
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch();

  const handleFollowClick = async (followerId) => {
    const isFollowing = followingData.some((user) => user._id === followerId);
    const endpoint = isFollowing
      ? `/users/${followerId}/unfollow`
      : `/users/${followerId}/follow`;

    try {
      await axiosInstance.patch(endpoint);
      dispatch(setFollowingStatus(!isFollowing));
      setNotification(
        isFollowing
          ? 'Ви більше не відстежуєте автора.'
          : 'Ви успішно підписалися!'
      );
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error updating follow status:', error);
      setNotification('Помилка при оновленні підписки');
    }
  };

  const tabs = [
    { label: 'Стежить', value: 'following' },
    { label: 'Читачі', value: 'followers' }
  ];

  const renderTabContent = {
    following: <FollowingList following={followingData} />,
    followers: (
      <FollowersList
        followers={followersData}
        followingData={followingData}
        handleFollowClick={handleFollowClick}
      />
    )
  }[activeTab];

  return (
    <div className={scss.followers}>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
      {renderTabContent}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  );
};

export default Followers;
