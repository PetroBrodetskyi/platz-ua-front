import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import scss from './ChatWindow.module.scss';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io();

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: msg.content, sender: msg.senderId }
      ]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post(
          'https://platz-ua-back.onrender.com/api/chat/messages',
          {
            senderId: 'userSelf',
            receiverId: chatId,
            content: newMessage
          }
        );

        socket.emit('chat message', {
          senderId: 'userSelf',
          receiverId: chatId,
          content: newMessage
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: newMessage, sender: 'self' }
        ]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className={scss.chatWindow}>
      <div className={scss.messages}>
        {messages.length === 0 ? (
          <p>Це ваша перша розмова. Напишіть повідомлення!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={scss[msg.sender]}>
              {msg.text}
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
