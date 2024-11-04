import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Loader from '../../Loader';
import SubmitButton from '../../SubmitButton';
import axios from 'axios';
import scss from './Chat.module.scss';

const Chat = ({ chatId, currentUser, chatPartner }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <div className={scss.header}>
        <button onClick={() => navigate(-1)} className={scss.backButton}>
          <BsArrowLeft size={24} /> Назад
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : messages.length === 0 ? (
        <p>Ця переписка порожня. Напишіть перше повідомлення!</p>
      ) : (
        <ul className={scss.messages}>
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser._id;
            const senderAvatar = isCurrentUser
              ? currentUser.avatarURL
              : chatPartner.avatarURL;
            const senderId = isCurrentUser ? currentUser._id : chatPartner._id;

            return (
              <li
                key={message._id}
                className={`${scss.item} ${isCurrentUser ? scss.currentUser : scss.chatPartner}`}
              >
                <Link to={`/user/${senderId}`}>
                  <img
                    src={senderAvatar}
                    alt={`${message.senderName} avatar`}
                    className={scss.avatar}
                  />
                </Link>
                <div className={scss.messageContent}>
                  <Link to={`/user/${senderId}`} className={scss.senderName}>
                    <strong>{message.senderName}: </strong>
                  </Link>
                  <p>{message.content}</p>
                  <span className={scss.timestamp}>
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className={scss.inputContainer}>
        <textarea
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Напишіть повідомлення..."
          className={scss.textarea}
        />
        <div className={scss.send}>
          <SubmitButton buttonText="Написати" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
