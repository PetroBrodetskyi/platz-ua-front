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
  const formattedDate = new Date(product.createdAt).toLocaleDateString();

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
        {' '}
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
        <div className={scss.infoContainer}>
          <h4>Інформація</h4>
          <div className={scss.radio}>
            стан:{' '}
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
            PLZ: <TbLocation className={scss.icon} /> {product.PLZ}
          </p>
          <p className={scss.detailsFlex}>
            місто: <SlLocationPin className={scss.icon} /> {product.city}
          </p>
          <div className={scss.viewsContainer}>
            <p>переглядів: </p>
            <HiOutlineEye className={scss.icon} />
            <div>{product.views !== undefined ? product.views : 'N/A'}</div>
          </div>
          {/* <p className={scss.detailsFlex}>
            Додано: <MdOutlineDateRange className={scss.icon} /> {formattedDate}
          </p> */}
        </div>

        <div className={scss.categoryesContainer}>
          <h4>Категорії</h4>
          <p className={scss.detailsFlex}>
            {getCategoryIcon(product.category)} {product.category}
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
        </div>
      </div>

      <div className={scss.buttonsMenu}>
        <ShareMenu productUrl={productUrl} />
        {currentUser && currentUser._id === product.owner && (
          <ActionButton
            isEditing={isEditing}
            onClick={isEditing ? handleSaveClick : handleEditClick}
          />
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
