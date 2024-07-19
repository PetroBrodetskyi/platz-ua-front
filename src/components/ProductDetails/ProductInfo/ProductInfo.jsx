import React from 'react';
import scss from './ProductInfo.module.scss';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';
import ShareMenu from '../../ShareMenu/ShareMenu';
import ActionButton from '../ActionButton/ActionButton';

const ProductInfo = ({ product, exchangeRate, isEditing, updatedProduct, setUpdatedProduct, handleEditClick, handleSaveClick, currentUser }) => {
  const productUrl = window.location.href;
  const formattedDate = new Date(product.createdAt).toLocaleDateString();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={scss.details}>
      <div className={scss.namePrice}>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            className={scss.inputField}
          />
        ) : (
          <h2>{product.name}</h2>
        )}
        {exchangeRate !== null && (
          <div className={scss.priceContainer}>
            {isEditing ? (
              <input
                type="text"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                className={scss.inputField}
              />
            ) : (
              <CartPrice price={product.price} exchangeRate={exchangeRate} />
            )}
          </div>
        )}
      </div>
      <p>
        Опис:{' '}
        {isEditing ? (
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            className={scss.inputField}
          />
        ) : (
          product.description
        )}
      </p>
      
      <div className={scss.editContainer}>
        <p>
          Стан:{' '}
          {isEditing ? (
            <input
              type="text"
              name="condition"
              value={updatedProduct.condition}
              onChange={handleChange}
              className={scss.inputField}
            />
          ) : (
            product.condition
          )}
        </p>
        <p>Оновлено: {formattedDate}</p>
        <p>PLZ: {product.PLZ}</p>
        <p>Місто: {product.city}</p>
      </div>
      <div className={scss.buttonsMenu}>
        <div>
            <ShareMenu productUrl={productUrl} />
        </div>
        <div>
          {currentUser && currentUser._id === product.owner && (
                <ActionButton
                  isEditing={isEditing}
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
