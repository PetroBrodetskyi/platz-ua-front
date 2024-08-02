import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import scss from './CartItem.module.scss';
import { RiDeleteBin4Line } from "react-icons/ri";

const CartItem = ({ item, onRemove, onProductClick, exchangeRate, onSubmitOrder }) => {
  const [mainImage, setMainImage] = useState(item.image1);
  const [comment, setComment] = useState('');

  const currentUser = useSelector((state) => state.auth.user);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const filterInput = (input) => {
    input = input.replace(/<script.*?>.*?<\/script>/gi, '');
    input = input.replace(/https?:\/\/[^\s]+/gi, '');
    input = input.replace(/\b[A-Za-z0-9.-]+\.[A-Za-z]{2,6}\b/gi, '');
    return input;
  };

  const handleCommentChange = (e) => {
    const filteredComment = filterInput(e.target.value);
    setComment(filteredComment);
  };

  return (
    <li className={scss.cartItem}>
      <div className={scss.container}>
        <div className={scss.titleImage}>
          <img
            src={mainImage}
            alt={item.name}
            className={`${scss.cartImage} ${scss.mainImage}`}
            onClick={() => onProductClick(item._id)}
          />
          <div className={scss.thumbnailContainer}>
            {item.image1 && (
              <img
                src={item.image1}
                alt={`${item.name} thumbnail 1`}
                className={`${scss.thumbnail} ${mainImage === item.image1 ? scss.selectedThumbnail : ''}`}
                onClick={() => handleThumbnailClick(item.image1)}
              />
            )}
            {item.image2 && (
              <img
                src={item.image2}
                alt={`${item.name} thumbnail 2`}
                className={`${scss.thumbnail} ${mainImage === item.image2 ? scss.selectedThumbnail : ''}`}
                onClick={() => handleThumbnailClick(item.image2)}
              />
            )}
            {item.image3 && (
              <img
                src={item.image3}
                alt={`${item.name} thumbnail 3`}
                className={`${scss.thumbnail} ${mainImage === item.image3 ? scss.selectedThumbnail : ''}`}
                onClick={() => handleThumbnailClick(item.image3)}
              />
            )}
            {item.image4 && (
              <img
                src={item.image4}
                alt={`${item.name} thumbnail 4`}
                className={`${scss.thumbnail} ${mainImage === item.image4 ? scss.selectedThumbnail : ''}`}
                onClick={() => handleThumbnailClick(item.image4)}
              />
            )}
          </div>
        </div>
        <div className={scss.cartInfo}>
          <div className={scss.titlePrice}>
            <h3 className={scss.titleProduct} onClick={() => onProductClick(item._id)}>{item.name}</h3>
              <div>
                <p className={scss.price}>€{item.price}</p>
                {exchangeRate !== null && (
                <p>₴{(item.price * exchangeRate).toFixed(2)}</p>
                )}
              </div>
            </div>
          <p>{item.description}</p>
          
          <div className={scss.ownerInfo}>
            <h3>Продавець</h3>
            <div>
              <img src={item.owner.avatarURL} alt={item.owner.name} className={scss.ownerAvatar} />
              <h4>{item.owner.name}</h4>
            </div>
            <p>Телефон: {item.owner.phone}</p>
          </div>
          <button onClick={() => onRemove(item._id)}><RiDeleteBin4Line className={scss.icon}/></button>
        </div>
        {currentUser && currentUser._id !== item.owner._id && (
          <div className={scss.form}>
            <form onSubmit={(e) => onSubmitOrder(e, item._id)} className={scss.orderForm}>
              <h4>Ваші данні:</h4>
              <div className={scss.userInfo}>
                <p><strong>Ім'я:</strong> {currentUser?.name}</p>
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <p><strong>Телефон:</strong> {currentUser?.phone}</p>
              </div>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Ваш коментар"
                className={scss.commentField}
              />
              <button type="submit" className={scss.submitButton}>замовити</button>
            </form>
          </div>
        )}
      </div>
    </li>
  );
};

export default CartItem;
