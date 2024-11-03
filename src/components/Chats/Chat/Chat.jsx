import { useEffect, useState } from 'react';
import axios from 'axios';
import scss from './Chat.module.scss';

const Chat = ({ chatId }) => {
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
    <div className={scss.chat}>
      <h3>Переписка</h3>
      {loading ? (
        <p>Завантаження повідомлень...</p>
      ) : messages.length === 0 ? (
        <p>Ця переписка порожня.</p>
      ) : (
        <ul className={scss.messages}>
          {messages.map((message) => (
            <li key={message._id} className={scss.item}>
              <strong>{message.senderName}: </strong>
              <span>{message.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chat;
