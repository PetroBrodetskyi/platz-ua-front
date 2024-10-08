import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchProductById,
  selectProductById,
  selectLoading,
  selectError
} from '../../redux/features/productsSlice';
import {
  selectOwner,
  selectCurrentUser,
  fetchUserById
} from '../../redux/features/authSlice';
import {
  addToCartBack,
  removeFromCartBack
} from '../../redux/features/cartSlice';

import Notification from '../Notification/Notification';
import Tags from './Tags/Tags';
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
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    description: '',
    condition: ''
  });

  const product = useSelector((state) => selectProductById(state, productId));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const owner = useSelector(selectOwner);
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (!product) dispatch(fetchProductById(productId));
    if (product?.owner) dispatch(fetchUserById(product.owner));
  }, [dispatch, product, productId]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        condition: product.condition || ''
      });
    }
  }, [product]);

  const handleEditClick = useCallback(() => {
    if (currentUser?._id === product?.owner) {
      setIsEditing(true);
    } else {
      alert('Ви не маєте права редагувати це оголошення.');
    }
  }, [currentUser, product]);

  const handleSaveClick = useCallback(async () => {
    if (currentUser?._id !== product?.owner) {
      alert('Ви не маєте права редагувати це оголошення.');
      return;
    }

    try {
      const { data } = await axios.patch(
        `https://platz-ua-back.vercel.app/api/products/${product._id}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      setUpdatedProduct({
        name: data.name || '',
        price: data.price || '',
        description: data.description || '',
        condition: data.condition || ''
      });

      setIsEditing(false);
      dispatch(fetchProductById(product._id));
      setNotification('Продукт успішно оновлено!');
    } catch (error) {
      console.error(
        'Error updating product:',
        error?.response?.data || error.message
      );
      alert('Виникла помилка при оновленні продукту. Спробуйте ще раз.');
    }
  }, [currentUser, product, updatedProduct, dispatch]);

  const handleAddToCart = useCallback(() => {
    const isInCart = cartItems.some((item) => item._id === product._id);
    const productWithOwner = { ...product, owner };

    if (isInCart) {
      dispatch(removeFromCartBack(product._id)); // Видалити з бекенду
      setNotification(`${product.name} видалено з кошика!`);
    } else {
      dispatch(addToCartBack(productWithOwner)); // Додати до бекенду
      setNotification(`${product.name} додано до кошика!`);
    }
  }, [cartItems, dispatch, product, owner]);

  if (loading) return <Loader />;
  if (error) return <p>Помилка завантаження даних: {error}</p>;
  if (!product) return <p>Продукт не знайдено</p>;

  const isInCart = cartItems.some((item) => item._id === product._id);

  return (
    <div className={scss.product}>
      <UserInfo owner={owner} />
      <div className={scss.infoContainer}>
        <div className={scss.gallery}>
          <Gallery images={product} />
        </div>
        <div className={scss.productInfo}>
          <ProductInfo
            product={product}
            isEditing={isEditing}
            updatedProduct={updatedProduct}
            setUpdatedProduct={setUpdatedProduct}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            currentUser={currentUser}
            handleAddToCart={handleAddToCart}
            isInCart={isInCart}
          />
          <Tags product={product} />
        </div>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification('')}
          />
        )}
      </div>
      <div>
        <Comments productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetails;
