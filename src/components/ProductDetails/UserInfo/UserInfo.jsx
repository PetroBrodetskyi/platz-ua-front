import React, { useState, useEffect } from 'react';
import { BiLike, BiSolidLike, BiUser } from "react-icons/bi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import axios from 'axios';
import scss from './UserInfo.module.scss';

const UserInfo = ({ owner }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (owner) {
      setLikes(owner.likes || 0);
      setLiked(owner.liked || false);
    }
  }, [owner]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/users/${owner._id}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Response from server:', response.data);

      setLikes(response.data.likes || likes);
      setLiked(true);
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
        <h2>Продавець</h2>
        <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
        <div className={scss.details}>
          <div className={scss.iconOwnerContainer}>
            <BiUser className={scss.iconOwner} /> <p className={scss.name}>{owner.name}</p>
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
        <span className={scss.likes}>{likes}</span>
      </div>
    </div>
  );
};

export default UserInfo;
