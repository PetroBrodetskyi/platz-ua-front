import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  fetchProductById,
  selectProductById,
  selectLoading,
  selectError
} from '../../redux/features/productsSlice';
import { selectOwner, fetchUserById } from '../../redux/features/authSlice';
import {
  fetchProductsInCart,
  addToCartBack,
  removeFromCartBack
} from '../../redux/features/cartSlice';
import Notification from '../Notification';
import Tooltip from '@mui/material/Tooltip';
import Gallery from './Gallery';
import SubmitButton from '../SubmitButton';
import ProductInfo from './ProductInfo';
import UserInfo from './UserInfo';
import Loader from '../Loader';
import Comments from '../Comments';
import LocationMap from './LocationMap';
import { TbLocation } from 'react-icons/tb';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineEye } from 'react-icons/hi';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegFaceSmile, FaRegFaceMeh } from 'react-icons/fa6';
import { useTheme } from '../../context/ThemeContext.jsx';
import scss from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const [notification, setNotification] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [loadingCoordinates, setLoadingCoordinates] = useState(true);
  const product = useSelector((state) => selectProductById(state, productId));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const owner = useSelector(selectOwner);
  const cartItems = useSelector((state) => state.cart.items);

  const fetchCoordinates = async (plz, city) => {
    try {
      setLoadingCoordinates(true);
      const response = await axios.get(
        'https://platz-ua-back.vercel.app/api/locations'
      );
      const location = response.data.find(
        (loc) =>
          loc.plz === Number(plz) &&
          loc.city.trim().toLowerCase() === city.trim().toLowerCase()
      );
      if (location) {
        setCoordinates({
          latitude: location.latitude,
          longitude: location.longitude
        });
      } else {
        console.warn('Location not found for the given PLZ and city');
      }
    } catch (err) {
      console.error('Error fetching coordinates:', err);
    } finally {
      setLoadingCoordinates(false);
    }
  };

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(productId));
    } else {
      if (product.owner) {
        dispatch(fetchUserById(product.owner));
      }
      if (product.PLZ && product.city) {
        fetchCoordinates(product.PLZ, product.city);
      }
    }
    dispatch(fetchProductsInCart());
  }, [dispatch, product, productId]);

  const handleAddToCart = async () => {
    const isInCart = cartItems.some((item) => item._id === product._id);
    const productWithOwner = { ...product, owner };

    if (isInCart) {
      await dispatch(removeFromCartBack(product._id));
      setNotification(`${product.name} видалено з кошика!`);
    } else {
      await dispatch(addToCartBack(productWithOwner));
      setNotification(`${product.name} додано до кошика!`);
    }

    dispatch(fetchProductsInCart());
  };

  if (loading) return <Loader />;
  if (error) return <p>Помилка завантаження даних: {error}</p>;
  if (!product) return <p>Продукт не знайдено</p>;

  const isInCart = cartItems.some((item) => item._id === product._id);

  return (
    <div className={scss.product}>
      <UserInfo owner={owner} />
      <div className={scss.container}>
        <div className={scss.infoContainer}>
          <Tooltip title="PLZ / індекс" placement="left">
            <p className={`${scss.detail} ${isDarkMode ? scss.darkMode : ''}`}>
              <TbLocation className={scss.icon} /> {product.PLZ}
            </p>
          </Tooltip>
          <Tooltip title="Місто" placement="left">
            <p className={`${scss.detail} ${isDarkMode ? scss.darkMode : ''}`}>
              <GrLocation className={scss.icon} /> {product.city}
            </p>
          </Tooltip>
          <Tooltip title="Стан" placement="left">
            <p className={`${scss.detail} ${isDarkMode ? scss.darkMode : ''}`}>
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
          </Tooltip>
          <Tooltip title="Переглядів" placement="left">
            <p className={`${scss.detail} ${isDarkMode ? scss.darkMode : ''}`}>
              <HiOutlineEye className={scss.icon} /> {product.views || 'N/A'}
            </p>
          </Tooltip>
          <Tooltip title="Дата розміщення" placement="left">
            <p className={`${scss.detail} ${isDarkMode ? scss.darkMode : ''}`}>
              <MdOutlineDateRange className={scss.icon} />{' '}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </Tooltip>
        </div>
        <div className={scss.gallery}>
          <Gallery images={product} />
        </div>
        <div className={scss.infoFlex}>
          <div className={scss.productInfo}>
            <ProductInfo
              product={product}
              handleAddToCart={handleAddToCart}
              isInCart={isInCart}
            />
          </div>
          <div className={scss.buttonWrapper}>
            <SubmitButton
              buttonText={isInCart ? 'У кошику' : 'У кошик'}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className={scss.title}>Коментарі</h3>
        <div
          className={`${scss.comments} ${isDarkMode ? scss.darkMode : ''}`}
          id="comments-section"
        >
          <Comments productId={productId} />
        </div>
      </div>
      <div className={scss.mapContainer} id="location-section">
        <LocationMap
          loadingCoordinates={loadingCoordinates}
          coordinates={coordinates}
          plz={product.PLZ}
          city={product.city}
        />
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  );
};

export default ProductDetails;
