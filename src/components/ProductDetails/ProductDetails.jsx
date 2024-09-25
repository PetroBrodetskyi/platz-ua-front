import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchProductById, fetchExchangeRate, selectProductById, selectExchangeRate, selectLoading, selectError } from '../../redux/features/productsSlice';
import { selectOwner, selectCurrentUser, fetchUserById, fetchCurrentUser } from '../../redux/features/authSlice';
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
  const exchangeRate = useSelector(selectExchangeRate);
  const product = useSelector((state) => selectProductById(state, productId));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const owner = useSelector(selectOwner);
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector((state) => state.cart.items);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    description: '',
    condition: '',
  });

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    }
    if (product && product.owner) {
      dispatch(fetchUserById(product.owner));
    }
  }, [dispatch, product, productId]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];
    if (!viewedProducts.includes(productId)) {
      viewedProducts.push(productId);
      localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
    }
  }, [productId]);

  // Додаємо логіку для налаштування значень updatedProduct
  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        condition: product.condition || '',
      });
    }
  }, [product]);

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
    <div className={scss.product}>
      <UserInfo owner={owner} />
      <div className={scss.infoContainer}>
          <Gallery images={product} />
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
      <div>
        <Comments productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetails;
