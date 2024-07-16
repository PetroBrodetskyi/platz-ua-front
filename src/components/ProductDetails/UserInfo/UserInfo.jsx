import React, { useState } from 'react';
import { BiLike, BiSolidLike, BiUser } from "react-icons/bi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import scss from './UserInfo.module.scss';

const UserInfo = ({ owner }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  if (!owner) {
    return <p>Користувач не знайдений</p>;
  }

  return (
    <div className={scss.userInfo}>
      <h2>Продавець</h2>
      <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
      <div className={scss.details}>
        <div className={scss.iconOwnerContainer}>
          <BiUser className={scss.iconOwner} /> <p className={scss.name}>{owner.name}</p>
        </div>
        <div className={scss.iconPhoneContainer}>
        <HiDevicePhoneMobile className={scss.iconPhone}/><p className={scss.phone}><a href={`tel:${owner.phone}`}>{owner.phone}</a>
          </p>
          </div>
        <div className={scss.likesContainer}>
          <button onClick={handleLikeClick} className={scss.likeButton}>
            {liked ? <BiSolidLike /> : <BiLike />}
          </button>
          <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
