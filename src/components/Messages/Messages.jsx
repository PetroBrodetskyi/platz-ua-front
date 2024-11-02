import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, selectChat } from '../../redux/features/chatSlice';
import { selectCurrentUser } from '../../redux/features/authSlice';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import scss from './Messages.module.scss';

const Messages = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { chats, loading, error, selectedChat } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchChats(currentUser._id));
    }
  }, [currentUser?._id, dispatch]);

  const handleUserSelect = (chat) => {
    dispatch(selectChat(chat));
  };

  if (loading) return <p>Завантаження чатів...</p>;
  if (error)
    return <p>Сталася помилка при завантаженні чатів: {error.message}</p>;

  return (
    <div className={scss.messages}>
      <h3>Ваші повідомлення</h3>
      <ChatList
        chats={chats}
        onSelectChat={handleUserSelect}
        currentUser={currentUser}
      />
      {selectedChat ? (
        <ChatWindow chatId={selectedChat._id} currentUser={currentUser} />
      ) : (
        <p>Виберіть користувача, щоб почати спілкування.</p>
      )}
    </div>
  );
};

export default Messages;
