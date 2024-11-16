import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
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
      <h3 className={scss.title}>Підписки та підписники</h3>
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
