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
          <h3 className={scss.titleProduct} onClick={() => onProductClick(item._id)}>{item.name}</h3>
          <p>{item.description}</p>
          <p>€{item.price}</p>
          {exchangeRate !== null && (
            <p>₴{(item.price * exchangeRate).toFixed(2)}</p>
          )}
          <div className={scss.ownerInfo}>
            <h3>Продавець: {item.owner.name}</h3>
            <p>Телефон: {item.owner.phone}</p>
            <img src={item.owner.avatarURL} alt={item.owner.name} className={scss.ownerAvatar} />
          </div>
          <button onClick={() => onRemove(item._id)}><RiDeleteBin4Line className={scss.icon}/></button>
        </div>
        {currentUser && ( // Перевірка на авторизацію
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
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ваш коментар"
                className={scss.commentField}
              />
              <button type="submit" className={scss.submitButton}>Відправити замовлення</button>
            </form>
          </div>
        )}
      </div>
    </li>
  );
};

export default CartItem;
