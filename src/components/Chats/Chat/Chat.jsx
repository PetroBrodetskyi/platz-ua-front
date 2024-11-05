import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { CiMenuKebab } from 'react-icons/ci';
import Loader from '../../Loader';
import SubmitButton from '../../SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMessages,
  sendMessage,
  editMessage,
  deleteMessage,
  selectMessages,
  selectLoading
} from '../../../redux/features/chatSlice';
import scss from './Chat.module.scss';

const Chat = ({ chatId, currentUser, chatPartner }) => {
  const [newMessage, setNewMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [menuVisible, setMenuVisible] = useState(null);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoading);

  const navigate = useNavigate();

  useEffect(() => {
    if (chatId) {
      dispatch(fetchMessages(chatId));
    }
  }, [chatId, dispatch]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: currentUser._id,
        receiverId: chatPartner._id,
        chatId: chatId,
        content: newMessage,
        senderName: currentUser.name
      };
      dispatch(sendMessage(messageData));
      setNewMessage('');
    }
  };

  const handleEditMessage = (messageId) => {
    if (editingContent.trim()) {
      dispatch(editMessage({ messageId, content: editingContent }));
      setEditingMessageId(null);
      setEditingContent('');
    }
  };

  const handleDeleteMessage = (messageId) => {
    dispatch(deleteMessage(messageId));
  };

  const toggleMenu = (messageId) => {
    setMenuVisible((prev) => (prev === messageId ? null : messageId));
  };

  const handleMenuEdit = (messageId) => {
    setEditingMessageId(messageId);
    setEditingContent(messages.find((msg) => msg._id === messageId).content);
    setMenuVisible(null);
  };

  const handleMenuDelete = (messageId) => {
    handleDeleteMessage(messageId);
    setMenuVisible(null);
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
                <div>
                  <div className={scss.messageContent}>
                    <Link to={`/user/${senderId}`}>
                      <img
                        src={senderAvatar}
                        alt={`${message.senderName} avatar`}
                        className={scss.avatar}
                      />
                    </Link>

                    <div className={scss.message}>
                      <Link
                        to={`/user/${senderId}`}
                        className={scss.senderName}
                      >
                        <strong>{message.senderName}: </strong>
                      </Link>
                      {editingMessageId === message._id ? (
                        <div className={scss.editContainer}>
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            placeholder="Редагуйте повідомлення..."
                            className={scss.editMessage}
                          />
                          <div>
                            <button
                              onClick={() => handleEditMessage(message._id)}
                            >
                              Зберегти
                            </button>
                            <button onClick={() => setEditingMessageId(null)}>
                              Скасувати
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={scss.message}>
                          <p className={scss.text}>{message.content}</p>
                          <span className={scss.timestamp}>
                            {new Date(message.createdAt).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {isCurrentUser && (
                    <div className={scss.menuWrapper}>
                      <CiMenuKebab
                        onClick={() => toggleMenu(message._id)}
                        className={scss.icon}
                      />
                      {menuVisible === message._id && (
                        <div className={scss.menu}>
                          <button onClick={() => handleMenuEdit(message._id)}>
                            Редагувати
                          </button>
                          <button onClick={() => handleMenuDelete(message._id)}>
                            Видалити
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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
          <SubmitButton buttonText="Написати" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
