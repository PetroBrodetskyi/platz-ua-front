import React, { useState } from 'react';
import { BiLike, BiSolidLike } from "react-icons/bi";
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
      <img src={owner.avatarURL} alt={owner.name} className={scss.avatar} />
      <div className={scss.details}>
        <p className={scss.name}>Ім'я: {owner.name}</p>
        <p className={scss.phone}>
          Телефон: <a href={`tel:${owner.phone}`}>{owner.phone}</a>
        </p>
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
