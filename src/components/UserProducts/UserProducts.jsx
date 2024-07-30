import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import scss from './UserProducts.module.scss';
import ProductItem from './ProductItem/ProductItem';
import Notification from '../Notification/Notification';
import Loader from '../Loader/Loader';
import { fetchExchangeRate } from '../../redux/features/productsSlice';
import { fetchComments, addComment } from '../../redux/features/commentsSlice';

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

  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.products.loading);
  const allComments = useSelector((state) => state.comments.comments);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      products.forEach(product => {
        if (product._id) {
          dispatch(fetchComments(product._id));
        }
      });
    }
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
      <h2 className={scss.title}>Оголошення користувача {currentUser.name}</h2>
      <ul className={scss.productsList}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            isEditing={isEditing}
            updatedProduct={updatedProduct}
            handleChange={handleChange}
            handleConditionChange={handleConditionChange}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            currentUser={currentUser}
            exchangeRate={exchangeRate}
            allComments={allComments}
            setNewComment={setNewComment}
            newComment={newComment}
            handleAddComment={handleAddComment}
          />
        ))}
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
