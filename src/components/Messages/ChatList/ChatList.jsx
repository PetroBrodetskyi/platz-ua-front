import React from 'react';
import scss from './ChatList.module.scss';

const ChatList = ({ chats, onSelectChat, currentUser }) => {
  return (
    <div className={scss.chatList}>
      {Array.isArray(chats) && chats.length > 0 ? (
        chats.map((chat) => {
          const otherUser = chat.users.find((user) => user !== currentUser._id);
          return (
            <div
              key={chat._id}
              className={scss.chatItem}
              onClick={() => onSelectChat(chat)}
            >
              <h4>{otherUser?.name || 'Користувач'}</h4>
              <p>{chat.lastMessage || 'Немає повідомлень'}</p>
            </div>
          );
        })
      ) : (
        <p>Немає доступних чатів</p>
      )}
    </div>
  );
};

export default ChatList;
