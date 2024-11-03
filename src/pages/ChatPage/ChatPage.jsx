// ChatPage.jsx
import { useParams } from 'react-router-dom';
import Chat from '../../components/Chats/Chat';
import scss from './ChatPage.module.scss';

const ChatPage = () => {
  const { chatId } = useParams();

  return (
    <div className={scss.chatPage}>
      <Chat chatId={chatId} />
    </div>
  );
};

export default ChatPage;
