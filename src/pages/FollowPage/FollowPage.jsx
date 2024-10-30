import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  fetchUserById,
  selectOwner,
  selectCurrentUser
} from '../../redux/features/authSlice';
import Followers from '../../components/Followers';
import scss from './FollowPage.module.scss';
import Loader from '../../components/Loader';

const FollowPage = ({ userId }) => {
  const dispatch = useDispatch();
  const owner = useSelector(selectOwner);
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const initialTab = location.state?.tab || 'followers';

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  if (!owner) return <Loader />;

  return (
    <div className={scss.followPage}>
      <div className={scss.header}>
        <img
          src={owner.avatarURL || avatarPublicId}
          alt={`${owner.name}'s avatar`}
          className={scss.avatar}
        />
        <p className={scss.ownerName}>{owner.name}</p>
      </div>
      <Followers
        owner={owner}
        followersData={owner.followers}
        followingData={owner.following}
        currentUserId={currentUser ? currentUser._id : null}
        initialTab={initialTab}
      />
    </div>
  );
};

export default FollowPage;
