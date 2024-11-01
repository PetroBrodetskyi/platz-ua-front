import scss from './ChatList.module.scss';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className={scss.chatList}>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={scss.chatItem}
          onClick={() => onSelectChat(chat.userId)}
        >
          <h4>{chat.name}</h4>
          <p>{chat.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
