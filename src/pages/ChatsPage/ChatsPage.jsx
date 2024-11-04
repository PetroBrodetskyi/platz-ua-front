import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Chats from '../../components/Chats/Chats';
import scss from './ChatsPage.module.scss';
import Loader from '../../components/Loader';
import { selectCurrentUser } from '../../redux/features/authSlice';

const ChatsPage = () => {
  const [loading, setLoading] = useState(true);
  const [chatPartners, setChatPartners] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchChats = async () => {
      try {
        const { data } = await axios.get(
          `https://platz-ua-back.onrender.com/api/chat/chats?userId=${currentUser._id}`
        );

        const partners = await Promise.all(
          data.map(async (chat) => {
            const chatPartnerId =
              chat.user1 === currentUser._id ? chat.user2 : chat.user1;
            const userData = await fetchUserById(chatPartnerId);
            return {
              ...userData,
              chatId: chat._id,
              lastMessage: chat.lastMessage || 'Немає повідомлень',
              lastMessageCreatedAt: chat.createdAt
            };
          })
        );

        setChatPartners(partners);
      } catch (error) {
        console.error('Помилка завантаження чатів:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserById = async (userId) => {
      try {
        const { data } = await axios.get(
          `https://platz-ua-back.vercel.app/api/users/${userId}`
        );
        return data;
      } catch (error) {
        console.error('Помилка отримання даних користувача:', error);
      }
    };

    fetchChats();
  }, [currentUser]);

  return (
    <div className={scss.chatsPage}>
      {loading ? (
        <Loader />
      ) : chatPartners.length === 0 ? (
        <p>У вас немає чатів</p>
      ) : (
        <Chats chatPartners={chatPartners} />
      )}
    </div>
  );
};

export default ChatsPage;
