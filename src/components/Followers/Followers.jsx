import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import scss from './Followers.module.scss';
import Tabs from '../Tabs';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import axiosInstance from '../../redux/axiosConfig';
import {
  setFollowingStatus,
  updateFollowingIds
} from '../../redux/features/authSlice';
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
  const followingIds = useSelector((state) => state.auth.followingIds);

  const handleFollowClick = async (userId) => {
    const isFollowing = followingIds.includes(userId);
    const endpoint = isFollowing
      ? `/users/${userId}/unfollow`
      : `/users/${userId}/follow`;

    try {
      const response = await axiosInstance.patch(endpoint);

      if (response.data?.message) {
        setNotification(response.data.message);

        if (response.data.message.includes('підписалися')) {
          dispatch(updateFollowingIds([...followingIds, userId]));
        } else if (response.data.message.includes('відписалися')) {
          dispatch(
            updateFollowingIds(followingIds.filter((id) => id !== userId))
          );
        }
      } else {
        setNotification(
          'Помилка при оновленні підписки. Невірна відповідь від сервера.'
        );
      }

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
