import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import scss from './Chats.module.scss';

const Chats = ({ chatPartners }) => {
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className={scss.chats}>
      <h3 className={scss.title}>Мої чати</h3>
      <ul className={scss.chatList}>
        {chatPartners.map((partner) => (
          <li
            key={partner._id}
            className={scss.item}
            onClick={() => handleChatClick(partner.chatId)}
          >
            <img
              src={partner.avatarURL || avatarPublicId}
              alt={`${partner.name}'s avatar`}
              className={scss.avatar}
            />
            <div className={scss.chatInfo}>
              <p className={scss.partnerName}>{partner.name}</p>
              <p className={scss.lastMessage}>{partner.lastMessage}</p>
              <p className={scss.timestamp}>
                {formatDistanceToNow(new Date(partner.lastMessageCreatedAt), {
                  addSuffix: true,
                  locale: uk
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
