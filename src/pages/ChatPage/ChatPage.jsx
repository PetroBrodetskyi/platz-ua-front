import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import scss from './ChatPage.module.scss';

const ChatPage = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) {
        console.error('chatId не визначений.');
        return;
      }

      try {
        const { data } = await axios.get(
          `https://platz-ua-back.onrender.com/api/chat/messages?chatId=${chatId}`
        );
        setMessages(data);
      } catch (error) {
        console.error('Помилка завантаження повідомлень:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  return (
    <div className={scss.chatPage}>
      <h3>Переписка</h3>
      {loading ? (
        <p>Завантаження повідомлень...</p>
      ) : messages.length === 0 ? (
        <p>Ця переписка порожня.</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              <strong>{message.senderName}: </strong>
              <span>{message.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatPage;
