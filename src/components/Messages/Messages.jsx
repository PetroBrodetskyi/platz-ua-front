import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import axios from 'axios';
import scss from './Messages.module.scss';
import { selectCurrentUser } from '../../redux/features/authSlice';

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(
          'https://platz-ua-back.onrender.com/api/chat/chats'
        );
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleUserSelect = async (userId) => {
    setSelectedUser(userId);

    try {
      const existingChatResponse = await axios.get(
        `https://platz-ua-back.onrender.com/api/chat/chats?userId=${userId}`
      );

      if (existingChatResponse.data.length > 0) {
        const { data } = await axios.get(
          `/chat/messages?senderId=${existingChatResponse.data[0].users[0]}&receiverId=${existingChatResponse.data[0].users[1]}`
        );
        setMessages(data);
      } else {
        await axios.post('https://platz-ua-back.onrender.com/api/chat/chats', {
          userId1: userId,
          userId2: currentUser?._id
        });

        const { data: newChats } = await axios.get(
          `https://platz-ua-back.onrender.com/api/chat/chats?userId=${currentUser?._id}`
        );
        setChats(newChats);

        const { data } = await axios.get(
          `/chat/messages?senderId=${userId}&receiverId=${currentUser?._id}`
        );
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={scss.messages}>
      <h3>Ваші повідомлення</h3>
      <ChatList chats={chats} onSelectChat={handleUserSelect} />
      {selectedUser ? (
        <ChatWindow chatId={selectedUser} />
      ) : (
        <p>Виберіть користувача, щоб почати спілкування.</p>
      )}
    </div>
  );
};

export default Messages;
