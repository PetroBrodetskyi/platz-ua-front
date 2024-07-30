import React from 'react';
import { TbLocation } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegFaceSmile, FaRegFaceMeh } from "react-icons/fa6";
import { getCategoryIcon, getSubcategoryIcon } from '../../Categories/icons';
import scss from './UserProductsDetails.module.scss';

const ProductDetails = ({ product, isEditing, updatedProduct, handleChange, handleConditionChange, exchangeRate }) => (
  <div className={scss.productDetails}>
    <div className={scss.namePrice}>
      {isEditing === product._id ? (
        <input
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
          className={scss.inputField}
        />
      ) : (
        <h3>{product.name}</h3>
      )}
      {isEditing === product._id ? (
        <input
          type="text"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
          className={scss.inputField}
        />
      ) : (
        <div>
          <p className={scss.price}>€{product.price}</p>
          {exchangeRate && (
            <p className={scss.priceUan}>₴{(product.price * exchangeRate).toFixed(2)}</p>
          )}
        </div>
      )}
    </div>
    <p className={scss.description}>
      {isEditing === product._id ? (
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
    <div className={scss.detailsContainer}>
      <div className={scss.detailsFlex}>PLZ:<TbLocation className={scss.icon}/><p>{product.PLZ}</p></div>
      <div className={scss.detailsFlex}>Місто:<SlLocationPin className={scss.icon}/><p>{product.city}</p></div>
      <div className={scss.radioFlex}>
        Стан:
        {isEditing === product._id ? (
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
      <div className={scss.detailsFlex}>
        Оновлено:<MdOutlineDateRange className={scss.icon}/>
        <p>{new Date(product.updatedAt).toLocaleDateString()}</p>
      </div>
      <div>
        <p className={scss.detailsFlex}>
          Категорія: {getCategoryIcon(product.category)} {product.category}
        </p>
        <p className={scss.detailsFlex}>
          Підкатегорія: {getSubcategoryIcon(product.subcategory1)} {product.subcategory1}
        </p>
        <p className={scss.detailsFlex}>
          Підкатегорія: {getSubcategoryIcon(product.subcategory2)} {product.subcategory2}
        </p>
        <p className={scss.detailsFlex}>
          Підкатегорія: {getSubcategoryIcon(product.subcategory3)} {product.subcategory3}
        </p>
      </div>
    </div>
  </div>
);

export default ProductDetails;
