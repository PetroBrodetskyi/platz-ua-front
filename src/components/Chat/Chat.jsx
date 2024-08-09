import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const newSocket = io('https://platz-ua-back.vercel.app');
    setSocket(newSocket);

    newSocket.on('initialMessages', (initialMessages) => {
      setMessages(initialMessages);
    });

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = useCallback(() => {
    if (socket && currentUser) {
      socket.emit('message', { sender: currentUser.name, content: input });
      setInput('');
    }
  }, [socket, currentUser, input]);

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Напишіть повідомлення..."
      />
      <button onClick={sendMessage}>Відправити</button>
    </div>
  );
};

export default Chat;
