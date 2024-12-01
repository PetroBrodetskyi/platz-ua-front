import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCurrentUser } from '../../redux/features/authSlice';
import Loader from '../Loader';

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  useEffect(() => {}, [loading, user]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && (!user || user.subscription !== 'admin')) {
    return <NavLink to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
