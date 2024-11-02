import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../../redux/features/chatSlice';
import {
  fetchCurrentUser,
  selectCurrentUser
} from '../../redux/features/authSlice';
import Messages from '../../components/Messages/Messages';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchChats(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      {user?._id ? (
        <Messages targetUserId={user._id} />
      ) : (
        <p>Завантаження користувача...</p>
      )}
    </div>
  );
};

export default MessagesPage;
