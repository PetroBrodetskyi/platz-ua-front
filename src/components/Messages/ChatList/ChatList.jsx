import React from 'react';
import scss from './ChatList.module.scss';

const ChatList = ({ chats, onSelectChat, currentUser }) => {
  return (
    <div className={scss.chatList}>
      {Array.isArray(chats) && chats.length > 0 ? (
        chats.map((chat) => {
          const otherUser = chat.users.find(
            (user) => user._id !== currentUser._id
          );

          return (
            <div
              key={chat._id}
              className={scss.chatItem}
              onClick={() => onSelectChat(chat)}
            >
              <img
                src={otherUser?.avatarURL || '/path/to/default/avatar.png'}
                alt={otherUser?.name || 'Користувач'}
              />
              <span>{otherUser?.name || 'Користувач'}</span>
            </div>
          );
        })
      ) : (
        <p>У вас немає активних чатів.</p>
      )}
    </div>
  );
};

export default ChatList;
