import scss from '../Chats/Chat.module.scss';

const Chat = ({ messages, loading }) => {
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

export default Chat;
