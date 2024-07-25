import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchProductById, fetchExchangeRate } from '../../redux/features/productsSlice';
import { fetchUserById, fetchCurrentUser } from '../../redux/features/authSlice';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';
import Notification from '../Notification/Notification';
import axios from 'axios';
import scss from './ProductDetails.module.scss';
import Gallery from './Gallery/Gallery';
import ProductInfo from './ProductInfo/ProductInfo';
import UserInfo from './UserInfo/UserInfo';
import Loader from '../Loader/Loader';
import Comments from '../Comments/Comments';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState('');
  const products = useSelector((state) => state.products.products);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const cartItems = useSelector((state) => state.cart.items);
  const product = products.find((product) => product._id === productId);
  const owner = useSelector((state) => state.auth.owner);
  const currentUser = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    description: '',
    condition: '',
  });

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        condition: product.condition || '',
      });
      if (product.owner) {
        dispatch(fetchUserById(product.owner));
      }
    }
  }, [dispatch, product]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];
    if (!viewedProducts.includes(productId)) {
      dispatch(fetchProductById(productId));
      viewedProducts.push(productId);
      localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
    }
  }, [dispatch, productId, product]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Помилка завантаження даних: {error}</p>;
  }

  if (!product) {
    return <p>Продукт не знайдено</p>;
  }

  const handleEditClick = () => {
    if (currentUser && currentUser._id === product.owner) {
      setIsEditing(true);
    } else {
      alert('Ви не маєте права редагувати це оголошення.');
    }
  };

  const handleSaveClick = async () => {
    if (!currentUser || !currentUser._id || currentUser._id !== product.owner) {
      alert('Ви не маєте права редагувати це оголошення.');
      return;
    }

    try {
      const response = await axios.patch(
        `https://platz-ua-back.vercel.app/api/products/${product._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Update response:', response.data);
      dispatch(fetchProducts());
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      alert('Виникла помилка при оновленні продукту. Спробуйте ще раз.');
    }
  };

  const handleAddToCart = () => {
    const isInCart = cartItems.some((item) => item._id === product._id);

    const productWithOwner = {
      ...product,
      owner: {
        ...owner,
      }
    };

    if (isInCart) {
      dispatch(removeFromCart(product._id));
      setNotification(`${product.name} видалено з кошика!`);
    } else {
      dispatch(addToCart(productWithOwner));
      setNotification(`${product.name} додано до кошика!`);
    }
  };

  const isInCart = cartItems.some((item) => item._id === product._id);

  return (
    <div className={scss.productDetails}>
      <Gallery images={product} />
      <div className={scss.infoOwner}>
        <div className={scss.infoContainer}>
          <ProductInfo
            product={product}
            exchangeRate={exchangeRate}
            isEditing={isEditing}
            updatedProduct={updatedProduct}
            setUpdatedProduct={setUpdatedProduct}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            currentUser={currentUser}
            handleAddToCart={handleAddToCart}
            isInCart={isInCart}
          />
          {notification && <Notification message={notification} />}
        </div>
        <UserInfo owner={owner} />
      </div>
      <Comments productId={productId} /> {/* Використовуйте 'productId' */}
    </div>
  );
};

export default ProductDetails;
