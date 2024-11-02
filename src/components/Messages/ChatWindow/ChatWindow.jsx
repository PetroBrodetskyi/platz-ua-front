import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import scss from './ChatWindow.module.scss';

const ChatWindow = ({ chatId, currentUser, selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newSocket = io('https://platz-ua-back.onrender.com');
    setSocket(newSocket);

    newSocket.on('chat message', (msg) => {
      if (msg.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://platz-ua-back.onrender.com/api/chat/messages?chatId=${chatId}`
        );
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    if (chatId) fetchMessages();
  }, [chatId]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      const receiverId = selectedChat.users.find(
        (user) => user !== currentUser._id
      );

      if (!receiverId) {
        console.error('Receiver ID is undefined');
        return;
      }

      const messageData = {
        senderId: currentUser._id,
        receiverId: receiverId,
        chatId: selectedChat._id,
        content: newMessage,
        senderName: currentUser.name
      };

      try {
        const response = await axios.post(
          'https://platz-ua-back.onrender.com/api/chat/messages',
          messageData
        );

        setMessages((prevMessages) => [...prevMessages, response.data]);

        socket.emit('chat message', {
          ...messageData,
          chatId: selectedChat._id
        });

        setNewMessage('');
      } catch (error) {
        console.error(
          'Error sending message:',
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className={scss.chatWindow}>
      <div className={scss.messages}>
        {loading ? (
          <p>Завантаження повідомлень...</p>
        ) : messages.length === 0 ? (
          <p>Це ваша перша розмова. Напишіть повідомлення!</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={
                scss[msg.senderId === currentUser._id ? 'self' : 'other']
              }
            >
              <strong>
                {msg.senderId === currentUser._id
                  ? 'Ви'
                  : msg.senderName || 'Користувач'}
                :
              </strong>
              <span>{msg.content}</span>
            </div>
          ))
        )}
      </div>
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

export default ChatWindow;
