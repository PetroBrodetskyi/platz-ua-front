import React from 'react';
import { TbLocation } from 'react-icons/tb';
import { SlLocationPin } from 'react-icons/sl';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegFaceSmile, FaRegFaceMeh } from 'react-icons/fa6';
import { HiOutlineEye } from "react-icons/hi";
import scss from './ProductInfo.module.scss';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';
import ShareMenu from '../../ShareMenu/ShareMenu';
import ActionButton from '../ActionButton/ActionButton';
import { getCategoryIcon, getSubcategoryIcon } from '../../Categories/icons';

const ProductInfo = ({
  product,
  exchangeRate,
  isEditing,
  updatedProduct,
  setUpdatedProduct,
  handleEditClick,
  handleSaveClick,
  currentUser,
  handleAddToCart,
  isInCart
}) => {
  const productUrl = window.location.href;
  const formattedDate = new Date(product.updatedAt).toLocaleDateString();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConditionChange = (e) => {
    setUpdatedProduct((prevState) => ({
      ...prevState,
      condition: e.target.value,
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
          <h2 className={scss.title}>{product.name}</h2>
        )}
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
            <CartPrice
              price={product.price}
              exchangeRate={exchangeRate}
              onAddToCart={handleAddToCart}
              isInCart={isInCart}
            />
          )}
        </div>
      </div>
      <p>
        Опис:{' '}
        {isEditing ? (
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            className={scss.descriptionField}
          />
        ) : (
          product.description
        )}
      </p>
      
      <div className={scss.editContainer}>
        <div className={scss.radio}>
          Стан:{' '}
          {isEditing ? (
            <div className={scss.conditionOptions}>
              <label>
                <input
                  type="radio"
                  name="condition"
                  value="новий"
                  checked={updatedProduct.condition === 'новий'}
                  onChange={handleConditionChange}
                />
                новий
              </label>
              <label>
                <input
                  type="radio"
                  name="condition"
                  value="вживаний"
                  checked={updatedProduct.condition === 'вживаний'}
                  onChange={handleConditionChange}
                />
                вживаний
              </label>
            </div>
          ) : (
            <p className={scss.icons}>
              {product.condition === 'новий' ? (
                <>
                  <FaRegFaceSmile className={scss.icon} /> новий
                </>
              ) : (
                <>
                  <FaRegFaceMeh className={scss.icon} /> вживаний
                </>
              )}
            </p>
          )}
        </div>
        <p className={scss.detailsFlex}>
          Оновлено: <MdOutlineDateRange className={scss.icon} /> {formattedDate}
        </p>
        <p className={scss.detailsFlex}>
          PLZ: <TbLocation className={scss.icon} /> {product.PLZ}
        </p>
        <p className={scss.detailsFlex}>
          Місто: <SlLocationPin className={scss.icon} /> {product.city}
        </p>
        <p className={scss.detailsFlex}>
          Категорії: {getCategoryIcon(product.category)} {product.category}
        </p>
        <p className={scss.detailsFlex}>
          {getSubcategoryIcon(product.subcategory1)} {product.subcategory1}
        </p>
        <p className={scss.detailsFlex}>
          {getSubcategoryIcon(product.subcategory2)} {product.subcategory2}
        </p>
        <p className={scss.detailsFlex}>
          {getSubcategoryIcon(product.subcategory3)} {product.subcategory3}
        </p>
        <div className={scss.viewsContainer}>
          <p>Переглядів: </p>
          <div><HiOutlineEye className={scss.icon} /></div>
          <div>{product.views !== undefined ? product.views : 'N/A'}</div>
        </div>
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
