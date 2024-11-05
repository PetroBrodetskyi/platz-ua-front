import { useParams } from 'react-router-dom';
import Chat from '../../components/Chats/Chat';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/authSlice';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import axios from 'axios';

const ChatPage = () => {
  const { chatId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const [chatPartner, setChatPartner] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setError('Будь ласка, увійдіть, щоб переглянути цей чат.');
      return;
    }

    const fetchChatData = async () => {
      try {
        const { data } = await axios.get(
          `https://platz-ua-back.vercel.app/api/chat/chats/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
        );

        if (!data) {
          throw new Error('Дані чату недоступні.');
        }

        if (![data.user1, data.user2].includes(currentUser._id)) {
          setError('У вас немає доступу до цього чату.');
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);

        const partnerId =
          data.user1 === currentUser._id ? data.user2 : data.user1;

        const partnerData = await axios.get(
          `https://platz-ua-back.vercel.app/api/users/${partnerId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
        );

        if (!partnerData.data) {
          throw new Error('Дані про партнера чату недоступні.');
        }

        setChatPartner(partnerData.data);
      } catch (err) {
        console.error('Помилка при завантаженні даних чату:', err);
        setError('Не вдалося завантажити дані чату.');
      }
    };

    fetchChatData();
  }, [chatId, currentUser]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!isAuthorized) {
    return <p>Доступ заборонено</p>;
  }

  if (!chatPartner) {
    return <Loader />;
  }

  return (
    <div>
      <Chat
        chatId={chatId}
        currentUser={currentUser}
        chatPartner={chatPartner}
      />
    </div>
  );
};

export default ChatPage;
