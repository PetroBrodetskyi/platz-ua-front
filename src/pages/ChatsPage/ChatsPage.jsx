import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Chats from '../../components/Chats/Chats';
import scss from './ChatsPage.module.scss';
import { selectCurrentUser } from '../../redux/features/authSlice';

const ChatsPage = () => {
  const [loading, setLoading] = useState(true);
  const [chatPartners, setChatPartners] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!currentUser) {
      console.log('Користувач не авторизований або дані ще не завантажено');
      return;
    }

    const fetchChats = async () => {
      console.log(
        `Завантаження чатів для користувача з ID: ${currentUser._id}`
      );
      try {
        const { data } = await axios.get(
          `https://platz-ua-back.onrender.com/api/chat/chats?userId=${currentUser._id}`
        );
        console.log('Отримані чати:', data);

        const partners = await Promise.all(
          data.map(async (chat) => {
            const chatPartnerId = chat.users.find(
              (userId) => userId !== currentUser._id
            );
            const userData = await fetchUserById(chatPartnerId);
            return {
              ...userData,
              chatId: chat._id,
              lastMessage: chat.lastMessage || 'Немає повідомлень'
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
        console.log('Отримані дані співрозмовника:', data);
        return data;
      } catch (error) {
        console.error('Помилка отримання даних користувача:', error);
      }
    };

    fetchChats();
  }, [currentUser]);

  return (
    <div className={scss.chatsPage}>
      <h1>Мої чати</h1>
      {loading ? (
        <p>Завантаження чатів...</p>
      ) : chatPartners.length === 0 ? (
        <p>У вас немає чатів</p>
      ) : (
        <Chats chatPartners={chatPartners} />
      )}
    </div>
  );
};

export default ChatsPage;
