import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchUserById, selectOwner } from '../../redux/features/authSlice';
import Followers from '../../components/Followers';
import scss from './FollowPage.module.scss';
import Loader from '../../components/Loader';

const FollowPage = ({ userId }) => {
  const dispatch = useDispatch();
  const owner = useSelector(selectOwner);
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
      <Followers
        followersData={owner.followers}
        followingData={owner.following}
        initialTab={initialTab}
      />
    </div>
  );
};

export default FollowPage;
