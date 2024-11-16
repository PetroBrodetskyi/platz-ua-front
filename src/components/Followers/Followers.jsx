import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Tabs from '../Tabs';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import axiosInstance from '../../redux/axiosConfig';
import {
  setFollowingStatus,
  updateFollowingIds
} from '../../redux/features/authSlice';
import Notification from '../Notification';
import scss from './Followers.module.scss';

const Followers = ({
  owner,
  followersData,
  followingData,
  currentUserId,
  initialTab
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'following');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
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

  const handleOwnerClick = () => {
    navigate(`/user/${owner._id}`);
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

  const { isDarkMode } = useTheme();

  return (
    <div className={scss.followers}>
      <div className={scss.header}>
        <div className={scss.ownerInfo} onClick={handleOwnerClick}>
          <img
            src={owner.avatarURL || avatarPublicId}
            alt={`${owner.name}'s avatar`}
            className={scss.avatar}
          />
          <h3 className={scss.ownerName}>{owner.name}</h3>
        </div>
        <p className={scss.location}>
          {owner.plz} {owner.city}
        </p>
      </div>
      <div
        className={`${scss.tabsContainer} ${isDarkMode ? scss.darkMode : ''}`}
      >
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

        {renderTabContent}
      </div>
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
