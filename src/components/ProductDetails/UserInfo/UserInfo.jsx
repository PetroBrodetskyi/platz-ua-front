import React, { useState, useEffect } from 'react';
import { BiLike, BiSolidLike, BiUser } from "react-icons/bi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import axios from 'axios';
import scss from './UserInfo.module.scss';

const UserInfo = ({ owner }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likedUserAvatars, setLikedUserAvatars] = useState([]);

  useEffect(() => {
    if (owner) {
      setLikes(owner.likes || 0);
      setLiked(owner.likedUsers?.some(user => user._id === localStorage.getItem('userId')) || false);
      setLikedUserAvatars(owner.likedUsers || []);
    }
  }, [owner]);

  const fetchOwnerData = async () => {
    if (!owner) return;

    try {
      const response = await axios.get(`https://platz-ua-back.vercel.app/api/users/${owner._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setLikes(response.data.likes || 0);
      setLiked(response.data.likedUsers?.some(user => user._id === localStorage.getItem('userId')) || false);
      setLikedUserAvatars(response.data.likedUsers || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Виникла помилка при отриманні даних про користувача. Спробуйте ще раз.");
    }
  };

  useEffect(() => {
    fetchOwnerData();
  }, [owner?._id]);

  const handleLikeClick = async () => {
    if (liked) return;

    try {
      const currentUserId = localStorage.getItem('userId');
      const currentUserAvatarURL = JSON.parse(localStorage.getItem('userAvatarURL'));

      const newLikes = likes + 1;
      const newLikedUserAvatars = [
        ...likedUserAvatars,
        { _id: currentUserId, avatarURL: currentUserAvatarURL }
      ];

      setLikes(newLikes);
      setLikedUserAvatars(newLikedUserAvatars);
      setLiked(true);

      await axios.patch(`https://platz-ua-back.vercel.app/api/users/${owner._id}/likes`, {
        userId: currentUserId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error("Error liking the user:", error);
      alert("Виникла помилка при додаванні лайку. Спробуйте ще раз.");
    }
  };

  if (!owner) {
    return <p>Користувач не знайдений</p>;
  }

  return (
    <div className={scss.userInfo}>
      <div className={scss.topSection}>
        <h3>Продавець</h3>
        <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
        <div className={scss.details}>
          <div className={scss.iconOwnerContainer}>
            <BiUser className={scss.iconOwner} /> 
            <p className={scss.name}>{owner.name}</p>
          </div>
          <div className={scss.iconPhoneContainer}>
            <HiDevicePhoneMobile className={scss.iconPhone} />
            <p className={scss.phone}>
              <a href={`tel:${owner.phone}`}>{owner.phone}</a>
            </p>
          </div>
        </div>
      </div>
      <div className={scss.likesContainer}>
        <button onClick={handleLikeClick} className={scss.likeButton} disabled={liked}>
          {liked ? <BiSolidLike /> : <BiLike />}
        </button>
        <div className={scss.likedUsersAvatars}>
          {likedUserAvatars.map((user, index) => (
            <img key={index} src={user.avatarURL} alt={`User ${index}`} className={scss.likedUserAvatar} />
          ))}
        </div>
        <span className={scss.likes}>{likes}</span>
      </div>
    </div>
  );
};

export default UserInfo;
