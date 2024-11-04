import { useParams } from 'react-router-dom';
import Chat from '../../components/Chats/Chat';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/authSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const { chatId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const [chatPartner, setChatPartner] = useState(null);

  useEffect(() => {
    const fetchChatPartner = async () => {
      try {
        const { data } = await axios.get(
          `https://platz-ua-back.onrender.com/api/chat/chats/${chatId}`
        );

        if (!data) {
          throw new Error('Chat data is not available.');
        }

        const partnerId =
          data.user1 === currentUser._id ? data.user2 : data.user1;

        const partnerData = await axios.get(
          `https://platz-ua-back.vercel.app/api/users/${partnerId}`
        );

        if (!partnerData.data) {
          throw new Error('Chat partner data is not available.');
        }

        setChatPartner(partnerData.data);
      } catch (error) {
        console.error('Error fetching chat partner:', error);
      }
    };

    fetchChatPartner();
  }, [chatId, currentUser]);

  if (!chatPartner) {
    return <p>Завантаження даних співрозмовника...</p>;
  }

  return (
    <div>
      <Chat
        chatId={chatId}
        currentUser={currentUser}
        chatPartner={chatPartner}
      />
    </div>
  );
};

export default ChatPage;
