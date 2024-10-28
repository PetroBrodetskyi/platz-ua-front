import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, selectOwner } from '../../redux/features/authSlice';
import Followers from '../../components/Followers/Followers';
import scss from './FollowPage.module.scss';
import Loader from '../../components/Loader';

const FollowPage = ({ userId }) => {
  const dispatch = useDispatch();
  const owner = useSelector(selectOwner);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (!owner) {
    return <Loader />;
  }

  return (
    <div className={scss.followPage}>
      <Followers
        followersData={owner.followers}
        followingData={owner.following}
      />
    </div>
  );
};

export default FollowPage;
