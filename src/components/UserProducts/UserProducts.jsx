import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TbLocation } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegFaceSmile, FaRegFaceMeh } from "react-icons/fa6";
import ActionButton from '../ProductDetails/ActionButton/ActionButton';
import { getCategoryIcon, getSubcategoryIcon } from '../Categories/icons';
import axios from 'axios';
import scss from './UserProducts.module.scss';
import { fetchExchangeRate } from '../../redux/features/productsSlice';
import { fetchComments, addComment } from '../../redux/features/commentsSlice';
import Notification from '../Notification/Notification';
import Loader from '../Loader/Loader';

const UserProducts = ({ products, setProducts }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    description: '',
    condition: '',
  });
  const [notification, setNotification] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.products.loading);
  const allComments = useSelector((state) => state.comments.comments);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRate());
    products.forEach(product => {
      if (product._id) {
        dispatch(fetchComments(product._id));
      }
    });
  }, [dispatch, products]);

  const handleEditClick = (productId) => {
    const product = products.find((prod) => prod._id === productId);
    setIsEditing(productId);
    setUpdatedProduct({
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      condition: product.condition || '',
    });
  };

  const handleSaveClick = async () => {
    const product = products.find((prod) => prod._id === isEditing);
    if (!currentUser || currentUser._id !== product.owner) {
      alert('Ви не маєте права редагувати це оголошення.');
      return;
    }

    try {
      const response = await axios.patch(
        `https://platz-ua-back.vercel.app/api/products/${isEditing}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Update response:', response.data);

      const updatedProducts = products.map((prod) =>
        prod._id === isEditing ? { ...prod, ...updatedProduct } : prod
      );
      setProducts(updatedProducts);

      setNotification('Ваше оголошення успішно оновлено!');
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      setNotification('Виникла помилка при оновленні продукту. Спробуйте ще раз.');
    }
  };

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

  const handleAddComment = (productId) => {
    if (newComment.trim()) {
      dispatch(addComment({ productId, comment: newComment, user: currentUser }));
      setNewComment('');
    }
  };

  if (loading) return <Loader />;
  if (!products.length) return <p>Продукти не знайдено</p>;

  return (
    <div className={scss.userProducts}>
      <h2 className={scss.title}>Активні оголошення користувача</h2>
      <ul className={scss.productsList}>
        {products.map((product) => {
          // Фільтруємо коментарі для конкретного продукту
          const comments = allComments.find(comment => comment.productId === product._id)?.comments || [];

          return (
            <li className={scss.productsItem} key={product._id}>
              <div className={scss.imageContainer}>
                {product.image1 && <img className={scss.image} src={product.image1} alt={`${product.name} image 1`} />}
                {product.image2 && <img className={scss.image} src={product.image2} alt={`${product.name} image 2`} />}
                {product.image3 && <img className={scss.image} src={product.image3} alt={`${product.name} image 3`} />}
                {product.image4 && <img className={scss.image} src={product.image4} alt={`${product.name} image 4`} />}
              </div>
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
              </div>
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
              <div className={scss.buttonsMenu}>
                {/* Кнопка редагування лише для власника */}
                {currentUser && currentUser._id === product.owner && (
                  <ActionButton
                    isEditing={isEditing === product._id}
                    onClick={() => (isEditing === product._id ? handleSaveClick() : handleEditClick(product._id))}
                  />
                )}
              </div>
              <div className={scss.commentsSection}>
                <h3>Питання та коментарі</h3>
                <ul className={scss.commentsList}>
                  {comments.map(comment => (
                    <li key={comment._id} className={scss.commentItem}>
                      <h4>{comment.user.name}</h4>
                      <p>{comment.text}</p>
                      <p className={scss.dateTime}>
                      {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    </li>
                  ))}
                </ul>
                {currentUser && (
                  <div className={scss.addComment}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Додати коментар"
                    />
                    <button onClick={() => handleAddComment(product._id)}>Додати</button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  );
};

export default UserProducts;
