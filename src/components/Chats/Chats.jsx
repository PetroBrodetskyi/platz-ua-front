import { useNavigate } from 'react-router-dom';
import scss from './Chats.module.scss';

const Chats = ({ chatPartners }) => {
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div>
      <ul className={scss.chatList}>
        {chatPartners.map((partner) => (
          <li
            key={partner._id}
            className={scss.chatPartner}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
