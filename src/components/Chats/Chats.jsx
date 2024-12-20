import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
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
            <div className={scss.chatInfoContainer}>
              <img
                src={partner.avatarURL || avatarPublicId}
                alt={`${partner.name}'s avatar`}
                className={scss.avatar}
              />
              <div className={scss.chatInfo}>
                <p className={scss.partnerName}>{partner.name}</p>
                <p className={scss.lastMessage}>{partner.lastMessage}</p>
                <p className={scss.timestamp}>
                  {formatDistanceToNow(new Date(partner.lastMessageUpdatedAt), {
                    addSuffix: true,
                    locale: uk
                  })}
                </p>
              </div>
            </div>
            <MdOutlineArrowForwardIos className={scss.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
