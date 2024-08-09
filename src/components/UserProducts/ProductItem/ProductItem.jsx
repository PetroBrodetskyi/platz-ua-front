import React, { useState } from 'react';
import { MdOutlineDeleteSweep } from "react-icons/md";
import ProductDetails from '../UserProductsDetails/UserProductsDetails';
import CommentsSection from '../CommentsSection/CommentsSection';
import ActionButton from '../../ProductDetails/ActionButton/ActionButton';
import scss from './ProductItem.module.scss';

const ProductItem = ({
  product,
  isEditing,
  updatedProduct,
  handleChange,
  handleConditionChange,
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  currentUser,
  exchangeRate,
  allComments,
  setNewComment,
  newComment,
  handleAddComment,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image1);
  const comments = allComments.find(comment => comment.productId === product._id)?.comments || [];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <li className={scss.productsItem}>
      <div className={scss.imageDetails}>
        <div className={scss.imageContainer}>
          <img
            className={scss.mainImage}
            src={selectedImage}
            alt={`${product.name} selected image`}
          />
          <div className={scss.thumbnailContainer}>
            {product.image1 && (
              <img
                className={`${scss.thumbnail} ${selectedImage === product.image1 ? scss.selectedThumbnail : ''}`}
                src={product.image1}
                alt={`${product.name} thumbnail 1`}
                onClick={() => handleImageClick(product.image1)}
              />
            )}
            {product.image2 && (
              <img
                className={`${scss.thumbnail} ${selectedImage === product.image2 ? scss.selectedThumbnail : ''}`}
                src={product.image2}
                alt={`${product.name} thumbnail 2`}
                onClick={() => handleImageClick(product.image2)}
              />
            )}
            {product.image3 && (
              <img
                className={`${scss.thumbnail} ${selectedImage === product.image3 ? scss.selectedThumbnail : ''}`}
                src={product.image3}
                alt={`${product.name} thumbnail 3`}
                onClick={() => handleImageClick(product.image3)}
              />
            )}
            {product.image4 && (
              <img
                className={`${scss.thumbnail} ${selectedImage === product.image4 ? scss.selectedThumbnail : ''}`}
                src={product.image4}
                alt={`${product.name} thumbnail 4`}
                onClick={() => handleImageClick(product.image4)}
              />
            )}
          </div>
        </div>

        <div className={scss.detailsContainer}>
          <div>
            <ProductDetails
              product={product}
              isEditing={isEditing}
              updatedProduct={updatedProduct}
              handleChange={handleChange}
              handleConditionChange={handleConditionChange}
              exchangeRate={exchangeRate}
            />
          </div>

          <div className={scss.buttonsMenu}>
            {currentUser && currentUser._id === product.owner && (
              <>
                <ActionButton
                  isEditing={isEditing === product._id}
                  onClick={() =>
                    isEditing === product._id ? handleSaveClick() : handleEditClick(product._id)
                  }
                />
                <button
                  className={scss.deleteButton}
                  onClick={() => handleDeleteClick(product._id)}
                >
                  <MdOutlineDeleteSweep className={scss.icon}/>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={scss.comments}>
        <CommentsSection
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={() => handleAddComment(product._id)}
          currentUser={currentUser}
        />
      </div>
    </li>
  );
};

export default ProductItem;
