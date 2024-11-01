import { useLocation } from 'react-router-dom';
import Messages from '../../components/Messages/Messages';
import scss from './MessagesPage.module.scss';

const MessagesPage = () => {
  const location = useLocation();
  const targetUserId = location.state?.targetUserId;

  return (
    <div className={scss.messages}>
      <Messages targetUserId={targetUserId} />
    </div>
  );
};

export default MessagesPage;
