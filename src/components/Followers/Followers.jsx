import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import scss from './Followers.module.scss';
import Tabs from '../Tabs';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import axiosInstance from '../../redux/axiosConfig';
import { setFollowingStatus } from '../../redux/features/authSlice';
import Notification from '../Notification';

const Followers = ({
  followersData,
  followingData,
  currentUserId,
  initialTab
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'following');
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch();
  const [followingIds, setFollowingIds] = useState(
    followingData.map((user) => user._id)
  );

  const handleFollowClick = async (userId) => {
    const isFollowing = followingIds.includes(userId);
    const endpoint = isFollowing
      ? `/users/${userId}/unfollow`
      : `/users/${userId}/follow`;

    try {
      await axiosInstance.patch(endpoint);

      if (isFollowing) {
        setFollowingIds((prevIds) => prevIds.filter((id) => id !== userId));
        setNotification('Ви більше не відстежуєте автора.');
      } else {
        setFollowingIds((prevIds) => [...prevIds, userId]);
        setNotification('Ви успішно підписалися!');
      }

      dispatch(setFollowingStatus(!isFollowing));
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
    following: (
      <FollowingList
        following={followingData}
        currentUserId={currentUserId}
        handleFollowClick={handleFollowClick}
        followingIds={followingIds}
      />
    ),
    followers: (
      <FollowersList
        followers={followersData}
        followingData={followingData}
        currentUserId={currentUserId}
        handleFollowClick={handleFollowClick}
        followingIds={followingIds}
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
