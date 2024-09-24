import React from 'react';
import { TbLocation } from 'react-icons/tb';
import { SlLocationPin } from 'react-icons/sl';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegFaceSmile, FaRegFaceMeh } from 'react-icons/fa6';
import scss from './ProductInfo.module.scss';
import CartPrice from '../../ProductCard/CartPrice/CartPrice';
import ShareMenu from '../../ShareMenu/ShareMenu';
import ActionButton from '../ActionButton/ActionButton';
import Categoryes from '../Categories/Categories';

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
      <div className={scss.info}>
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

        <p className={scss.description} >
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
        <div className={scss.edit}>
          {currentUser && currentUser._id === product.owner && (
            <ActionButton
              isEditing={isEditing}
              onClick={isEditing ? handleSaveClick : handleEditClick}
            />
          )}
      </div>
      </div>
        <div className={scss.editContainer}>
          <div className={scss.infoContainer}>
            <p className={scss.detailsFlex}>
              PLZ: <TbLocation className={scss.icon} /> {product.PLZ}
            </p>
            <p className={scss.detailsFlex}>
              місто: <SlLocationPin className={scss.icon} /> {product.city}
          </p>
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
            додано: <MdOutlineDateRange className={scss.icon} /> {formattedDate}
          </p>
        </div>
      </div>
      <Categoryes product={product} />
      <ShareMenu productUrl={productUrl} />
      
    </div>
  );
};

export default ProductInfo;
