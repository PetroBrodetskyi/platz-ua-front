import { useEffect, useState } from 'react';
import axios from 'axios';
import scss from './Chat.module.scss';

const Chat = ({ chatId, currentUser, chatPartner }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: currentUser._id,
        receiverId: chatPartner._id,
        chatId: chatId,
        content: newMessage,
        senderName: currentUser.name
      };

      try {
        const response = await axios.post(
          'https://platz-ua-back.onrender.com/api/chat/messages',
          messageData
        );

        if (response.status === 201) {
          setMessages((prevMessages) => [...prevMessages, response.data]);
          setNewMessage('');
        } else {
          console.error('Unexpected response:', response);
        }
      } catch (error) {
        console.error(
          'Error sending message:',
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className={scss.chat}>
      <h3>Переписка</h3>
      {loading ? (
        <p>Завантаження повідомлень...</p>
      ) : messages.length === 0 ? (
        <p>Ця переписка порожня. Напишіть перше повідомлення!</p>
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
      <div className={scss.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Напишіть повідомлення..."
        />
        <button onClick={sendMessage}>Відправити</button>
      </div>
    </div>
  );
};

export default Chat;
