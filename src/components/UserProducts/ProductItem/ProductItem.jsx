import React from 'react';
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
  currentUser,
  exchangeRate,
  allComments,
  setNewComment,
  newComment,
  handleAddComment,
}) => {
  const comments = allComments.find(comment => comment.productId === product._id)?.comments || [];

  return (
    <li className={scss.productsItem}>
      <div className={scss.imageDetails}>
        <div className={scss.imageContainer}>
          {product.image1 && (
            <img
              className={scss.image}
              src={product.image1}
              alt={`${product.name} image 1`}
            />
          )}
          {product.image2 && (
            <img
              className={scss.image}
              src={product.image2}
              alt={`${product.name} image 2`}
            />
          )}
          {product.image3 && (
            <img
              className={scss.image}
              src={product.image3}
              alt={`${product.name} image 3`}
            />
          )}
          {product.image4 && (
            <img
              className={scss.image}
              src={product.image4}
              alt={`${product.name} image 4`}
            />
          )}
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
              <ActionButton
                isEditing={isEditing === product._id}
                onClick={() =>
                  isEditing === product._id ? handleSaveClick() : handleEditClick(product._id)
                }
              />
            )}
          </div>
        </div>
      </div>

      <div>
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
