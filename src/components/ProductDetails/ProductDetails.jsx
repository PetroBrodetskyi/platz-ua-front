import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import { fetchUserById, fetchCurrentUser } from '../../redux/features/authSlice';
import axios from 'axios';
import scss from './ProductDetails.module.scss';
import Gallery from './Gallery/Gallery';
import ProductInfo from './ProductInfo/ProductInfo';
import UserInfo from './UserInfo/UserInfo';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
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

  if (loading) {
    return <p>Завантаження...</p>;
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
          />
        </div>
        <div className={scss.ownerContainer}>
          <UserInfo owner={owner} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
